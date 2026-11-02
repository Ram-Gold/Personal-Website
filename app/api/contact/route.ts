import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const trimmedName = name.trim().slice(0, 200);
    const trimmedEmail = email.trim().slice(0, 255);
    const trimmedMessage = message.trim().slice(0, 5000);

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      console.error('DATABASE_URL is not configured');
      return NextResponse.json({ error: 'Database connection is not configured' }, { status: 500 });
    }

    const sql = neon(databaseUrl);

    // Ensure table exists and insert submission
    const result = await sql`
      INSERT INTO contact_submissions (name, email, message)
      VALUES (${trimmedName}, ${trimmedEmail}, ${trimmedMessage})
      RETURNING id, name, email, created_at;
    `;

    return NextResponse.json({
      success: true,
      message: 'Message received successfully!',
      submission: result[0],
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error saving contact form submission:', errorMsg);
    return NextResponse.json(
      { error: 'Failed to process submission. Please try again later.' },
      { status: 500 }
    );
  }
}
