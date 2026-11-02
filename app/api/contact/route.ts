import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// In-memory rate limiting by client IP
// Max 5 submissions per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; expiresAt: number }>();

function cleanExpiredRateLimits() {
  const now = Date.now();
  for (const [ip, entry] of ipRequestCounts.entries()) {
    if (entry.expiresAt <= now) {
      ipRequestCounts.delete(ip);
    }
  }
}

function checkRateLimit(ip: string): boolean {
  cleanExpiredRateLimits();
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  if (!entry || entry.expiresAt <= now) {
    ipRequestCounts.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

/**
 * HTML entity escaping to neutralize any XSS payloads.
 * Strips null bytes and escapes characters: &, <, >, ", ', /
 */
function sanitizeString(str: string): string {
  return str
    .replace(/\0/g, '') // remove null bytes
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function POST(request: Request) {
  try {
    // 1. IP extraction & Rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || 'anonymous');

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    // 2. Parse request body
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { name, email, message, company_website_honeypot } = body;

    // 3. Honeypot check for spam bots
    if (company_website_honeypot) {
      // Quietly return success to confuse automated bots
      return NextResponse.json({ success: true, message: 'Message received successfully!' });
    }

    // 4. Strict type & presence checks
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 5. Length limits (prevent payload bloat & buffer overflow attempts)
    if (name.length > 100) {
      return NextResponse.json({ error: 'Name cannot exceed 100 characters' }, { status: 400 });
    }
    if (email.length > 254) {
      return NextResponse.json({ error: 'Email cannot exceed 254 characters' }, { status: 400 });
    }
    if (message.length > 3000) {
      return NextResponse.json({ error: 'Message cannot exceed 3000 characters' }, { status: 400 });
    }

    // 6. Strict RFC-compliant email regex validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }

    // 7. Sanitize inputs against XSS and control characters
    const cleanName = sanitizeString(name.trim());
    const cleanEmail = sanitizeString(email.trim().toLowerCase());
    const cleanMessage = sanitizeString(message.trim());

    // 8. Secure Database Query
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      console.error('DATABASE_URL is not configured');
      return NextResponse.json({ error: 'Database connection is not configured' }, { status: 500 });
    }

    // Parameterized SQL tagged template via @neondatabase/serverless strictly prevents SQL injection
    const sql = neon(databaseUrl);

    const result = await sql`
      INSERT INTO contact_submissions (name, email, message)
      VALUES (${cleanName}, ${cleanEmail}, ${cleanMessage})
      RETURNING id, created_at;
    `;

    return NextResponse.json({
      success: true,
      message: 'Message received successfully!',
      id: result[0]?.id,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error saving contact form submission:', errorMsg);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
