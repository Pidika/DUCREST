'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import data from '@/lib/content.json';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>('idle');
  const [message, setMessage] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const dismissResult = () => {
    setState('idle');
    setMessage('');
  };

  useEffect(() => {
    if (state !== 'success' && state !== 'error') return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismissResult();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [state]);

  async function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const turnstileToken = String(formData.get('cf-turnstile-response') ?? '');
    if (siteKey && !turnstileToken) {
      setState('error');
      setMessage('Please complete the security verification before sending your enquiry.');
      return;
    }

    setState('submitting');
    setMessage('');
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          company: formData.get('company'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          website: formData.get('website'),
          turnstileToken,
        }),
      });
      const result = await response.json() as { error?: string; reference?: string; notificationPending?: boolean };
      if (!response.ok) throw new Error(result.error || 'Your enquiry could not be sent.');
      setState('success');
      setMessage(result.notificationPending
        ? `Your enquiry was recorded${result.reference ? ` with reference ${result.reference}` : ''}. The firm's email notification is pending.`
        : `Thank you. Your enquiry has been sent${result.reference ? ` with reference ${result.reference}` : ''}.`);
      form.reset();
      const turnstile = (window as Window & { turnstile?: { reset: () => void } }).turnstile;
      turnstile?.reset();
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Your enquiry could not be sent.');
    }
  }

  return (
    <form className="enquiry-form" onSubmit={sendEnquiry} onChange={() => state !== 'submitting' && setState('idle')}>
      <p className="eyebrow">Send an enquiry</p>
      <h2>Let&apos;s start<br/><em>a conversation.</em></h2>
      <p className="form-intro">Tell us how we can help. Fields marked * are required.</p>
      <div className="form-grid">
        <label>Name *<input name="name" autoComplete="name" required maxLength={120} /></label>
        <label>Company / Organisation<input name="company" autoComplete="organization" maxLength={160} /></label>
        <label>Email address *<input name="email" type="email" autoComplete="email" required maxLength={200} /></label>
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
        <label className="full">Subject *<select name="subject" defaultValue="" required><option value="" disabled>Select a practice area or enquiry</option>{data.services.map((service) => <option key={service.id}>{service.title}</option>)}<option>General enquiry</option><option>Events &amp; Media</option></select></label>
        <label className="full">Message *<textarea name="message" rows={6} required minLength={10} maxLength={4000} aria-describedby="enquiry-guidance" /></label>
        <label className="enquiry-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p className="form-note" id="enquiry-guidance">Please do not include confidential information. Sending an enquiry does not establish an attorney-client relationship. Read our <Link href="/privacy/">Privacy Policy</Link> and <Link href="/disclaimer/">Disclaimer</Link>.</p>
      {siteKey ? <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /><div className="cf-turnstile turnstile-field" data-sitekey={siteKey} data-size="flexible" data-action="turnstile-spin-v2" /></> : <p className="form-configuration">Online submission will be enabled when the firm&apos;s security keys are connected. You can still email <a href="mailto:info@ducrestpartners.com">info@ducrestpartners.com</a>.</p>}
      <button className="button" type="submit" disabled={state === 'submitting' || !siteKey}>{state === 'submitting' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={17} aria-hidden="true" /></button>
      {state === 'success' || state === 'error' ? <div className="enquiry-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) dismissResult(); }}><div className={`enquiry-result enquiry-modal ${state}`} ref={resultRef} role="dialog" aria-modal="true" aria-labelledby="enquiry-result-title" aria-describedby="enquiry-result-message"><button ref={closeRef} className="enquiry-modal-close" type="button" onClick={dismissResult} aria-label="Close confirmation"><X size={22} aria-hidden="true" /></button><p className="eyebrow">{state === 'success' ? 'Message delivered' : 'Submission issue'}</p><h3 id="enquiry-result-title">{state === 'success' ? 'Enquiry received.' : 'We could not send your enquiry.'}</h3><p id="enquiry-result-message">{message}</p>{state === 'error' ? <a className="text-link" href="mailto:info@ducrestpartners.com">Email the firm directly <ArrowUpRight size={16} aria-hidden="true" /></a> : <button className="button" type="button" onClick={dismissResult}>Close</button>}</div></div> : null}
    </form>
  );
}
