import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type EnquiryInput = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character] ?? character);
}

async function verifyTurnstile(token: string, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return { ok: false, configurationError: true };
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: remoteIp }),
    cache: 'no-store',
  });
  const result = await response.json() as { success?: boolean };
  return { ok: result.success === true, configurationError: false };
}

async function storeEnquiry(record: Record<string, string | null>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('database_not_configured');
  const response = await fetch(`${url}/rest/v1/enquiries`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(record),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('database_write_failed');
  const rows = await response.json() as { id: string }[];
  return rows[0]?.id;
}

async function sendNotification(record: Record<string, string | null>, enquiryId?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) throw new Error('email_not_configured');
  const safe = Object.fromEntries(Object.entries(record).map(([key, value]) => [key, escapeHtml(value ?? 'Not provided')]));
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Ducrest Partners Website <${from}>`,
      to: [to],
      reply_to: record.email,
      subject: `New website enquiry: ${record.subject}`,
      html: `<h2>New website enquiry</h2><p><strong>Reference:</strong> ${escapeHtml(enquiryId ?? 'Pending')}</p><p><strong>Name:</strong> ${safe.name}</p><p><strong>Company:</strong> ${safe.company}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Subject:</strong> ${safe.subject}</p><p><strong>Message:</strong></p><p>${safe.message.replaceAll('\n', '<br>')}</p>`,
    }),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('email_delivery_failed');
}

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported request.' }, { status: 415 });
  }

  const input = await request.json().catch(() => null) as EnquiryInput | null;
  if (!input) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  if (text(input.website, 200)) return NextResponse.json({ ok: true });

  const record = {
    name: text(input.name, 120),
    company: text(input.company, 160) || null,
    email: text(input.email, 200).toLowerCase(),
    phone: text(input.phone, 40) || null,
    subject: text(input.subject, 160),
    message: text(input.message, 4000),
    status: 'new',
  };
  if (!record.name || !emailPattern.test(record.email) || !record.subject || record.message.length < 10) {
    return NextResponse.json({ error: 'Please complete all required fields with valid information.' }, { status: 400 });
  }

  const remoteIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  const verification = await verifyTurnstile(text(input.turnstileToken, 2048), remoteIp);
  if (verification.configurationError) {
    return NextResponse.json({ error: 'Online enquiries are not configured yet.' }, { status: 503 });
  }
  if (!verification.ok) {
    return NextResponse.json({ error: 'Security verification failed. Please try again.' }, { status: 403 });
  }

  try {
    const enquiryId = await storeEnquiry(record);
    try {
      await sendNotification(record, enquiryId);
      return NextResponse.json({ ok: true, reference: enquiryId });
    } catch {
      return NextResponse.json({ ok: true, reference: enquiryId, notificationPending: true });
    }
  } catch {
    return NextResponse.json({ error: 'We could not record your enquiry. Please contact the firm directly.' }, { status: 503 });
  }
}
