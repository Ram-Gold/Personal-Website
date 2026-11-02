"use client";

import React, { useState } from 'react';
import {
  IconSend,
  IconCheck,
  IconAlertCircle,
  IconLoader2,
  IconMail
} from '@tabler/icons-react';
import { hapticLight, hapticSuccess } from '../utils/haptics';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      setStatus('loading');
      setErrorMessage('');
      hapticLight();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      hapticSuccess();
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setStatus('error');
      setErrorMessage(msg);
    }
  };

  return (
    <section className="mt-12 mb-8 animate-fade-in" id="contact">
      <div className="rounded-2xl border border-card-border bg-theme-card-bg/60 p-6 md:p-8 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-card-border-hover">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-theme-hover text-theme-text">
            <IconMail size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-theme-text tracking-tight">Get in Touch</h2>
            <p className="text-xs md:text-sm text-theme-text-subtle">
              Have an idea, project, or opportunity? Drop me a message and it will reach me directly.
            </p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="mt-6 p-6 rounded-xl border border-green-500/30 bg-green-500/10 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-3">
              <IconCheck size={28} />
            </div>
            <h3 className="text-base font-medium text-theme-text mb-1">Message Sent!</h3>
            <p className="text-xs md:text-sm text-theme-text-subtle max-w-sm mb-4">
              Thank you for reaching out! Your message was received and saved. I will get back to you as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                hapticLight();
              }}
              className="text-xs font-medium text-theme-text px-4 py-2 rounded-lg bg-theme-hover hover:bg-theme-hover/80 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-theme-text-subtle mb-1">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-card-border bg-theme-bg/50 text-theme-text text-sm placeholder:text-theme-text-faint focus:outline-none focus:ring-1 focus:ring-theme-border-accent transition-all"
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-theme-text-subtle mb-1">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-card-border bg-theme-bg/50 text-theme-text text-sm placeholder:text-theme-text-faint focus:outline-none focus:ring-1 focus:ring-theme-border-accent transition-all"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-theme-text-subtle mb-1">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to discuss?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-card-border bg-theme-bg/50 text-theme-text text-sm placeholder:text-theme-text-faint focus:outline-none focus:ring-1 focus:ring-theme-border-accent resize-none transition-all"
                disabled={status === 'loading'}
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-xs">
                <IconAlertCircle size={18} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-theme-text text-theme-bg hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                {status === 'loading' ? (
                  <>
                    <IconLoader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <IconSend size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
