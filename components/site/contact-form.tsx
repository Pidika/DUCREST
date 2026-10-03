'use client';

import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import data from '@/lib/content.json';

export function ContactForm() {
  const [emailDraft, setEmailDraft] = useState('');
  const [ready, setReady] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '');
    const company = String(data.get('company') ?? '');
    const email = String(data.get('email') ?? '');
    const phone = String(data.get('phone') ?? '');
    const subject = String(data.get('subject') ?? 'General enquiry');
    const message = String(data.get('message') ?? '');
    const body = `Name: ${name}\nCompany: ${company || 'Not provided'}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\n${message}`;

    setEmailDraft(
      `mailto:info@ducrestpartners.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    setReady(true);
    window.setTimeout(() => resultRef.current?.focus(), 0);
  }

  return (
    <form className="enquiry-form" onSubmit={sendEnquiry} onChange={() => setReady(false)}>
      <p className="eyebrow">Send an enquiry</p>
      <h2>Let&apos;s start<br/><em>a conversation.</em></h2>
      <p className="form-intro">Tell us how we can help. Fields marked * are required.</p>
      <div className="form-grid">
        <label>
          <span>Name *</span>
          <input name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label>
          <span>Company / Organisation</span>
          <input name="company" autoComplete="organization" maxLength={160} />
        </label>
        <label>
          <span>Email address *</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
        <label>
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
        <label className="full">
          <span>Subject *</span>
          <select name="subject" defaultValue="" required>
            <option value="" disabled>
              Select a practice area or enquiry
            </option>
            {data.services.map((service) => (
              <option key={service.id}>{service.title}</option>
            ))}
            <option>General enquiry</option>
            <option>Events &amp; Media</option>
          </select>
        </label>
        <label className="full">
          <span>Message *</span>
          <textarea name="message" rows={6} required maxLength={4000} aria-describedby="enquiry-guidance" />
        </label>
      </div>
      <p className="form-note" id="enquiry-guidance">
        Please do not include confidential information. Sending an enquiry does not establish an
        attorney-client relationship. Read our <Link href="/privacy/">Privacy Policy</Link> and{' '}
        <Link href="/disclaimer/">Disclaimer</Link>.
      </p>
      <button className="button" type="submit">
        Send enquiry <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <p className="form-note">
        This opens an email draft addressed to the firm. Review the draft and use your email
        application&apos;s send button to deliver it.
      </p>
      {ready ? (
        <div className="enquiry-result" ref={resultRef} tabIndex={-1} role="status">
          <h3>Your enquiry draft is ready.</h3>
          <a className="text-link" href={emailDraft}>
            Open email draft <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </form>
  );
}
