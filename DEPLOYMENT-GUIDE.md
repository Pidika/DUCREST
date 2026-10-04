# Ducrest Partners production deployment

The production website runs as a Node.js application on Namecheap cPanel. Vercel remains a review environment. The Sanity content studio is hosted separately at <https://ducrest-partners.sanity.studio/>.

## Before deployment

1. Use Node.js **22.23.3** in cPanel.
2. Replace and validate the Supabase secret key. A request made on 4 October 2026 returned `401 Unauthorized`.
3. Confirm the Resend API key by sending one controlled test enquiry. The current key has the correct format but does not have permission to read account resources, which can mean either a sending-only key or an invalid key.
4. Confirm the Turnstile widget allows both `ducrestpartners.com` and `www.ducrestpartners.com`.
5. Keep every secret in cPanel environment variables. Never upload `.env` or place it in `public_html`.

## Create the cPanel application

1. Open **Setup Node.js App** and choose **Create Application**.
2. Select Node.js **22.23.3** and **Production** mode.
3. Set the application root to a private directory such as `ducrest-app`.
4. Select `ducrestpartners.com` as the application URL and leave the URI empty so the app serves the domain root.
5. Set the startup file to `.next/standalone/server.js` when building from source in the application root.
6. Create the application.

## Upload and build

1. Upload the release source archive into `ducrest-app` and extract it there.
2. Do not upload local `node_modules`, `.next`, `dist`, `.env`, `.sanity`, or `.git` directories.
3. Open the cPanel terminal and enter the Node.js virtual environment command displayed by cPanel for this application.
4. From the application root, run:

   ```sh
   npm ci
   npm run build:namecheap
   ```

5. In **Setup Node.js App**, restart the application.

## Environment variables

Add these values through the cPanel application’s **Environment variables** section:

```text
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://ducrestpartners.com
DEPLOY_TARGET=namecheap
NEXT_PUBLIC_SANITY_PROJECT_ID=<project id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SUPABASE_URL=<project URL>
SUPABASE_SECRET_KEY=<current server secret key>
RESEND_API_KEY=<production Resend key>
ENQUIRY_NOTIFICATION_EMAIL=info@ducrestpartners.com
RESEND_FROM_EMAIL=enquiries@ducrestpartners.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<production site key>
TURNSTILE_SECRET=<production secret>
```

`SANITY_API_TOKEN` is unnecessary while the published dataset remains publicly readable. Restart the application after changing any variable. Public `NEXT_PUBLIC_*` values also require a rebuild.

## DNS, HTTPS and final checks

1. Point the root and `www` records to the Namecheap hosting account as instructed by cPanel.
2. Enable AutoSSL for both hostnames and redirect one hostname to the canonical one.
3. Check every navigation route, mobile menu, legal page and partner profile.
4. Publish and unpublish a Sanity test article and verify the website updates within one minute.
5. Submit a test enquiry and confirm all three stages: Turnstile succeeds, a Supabase row is created, and the Resend email reaches the firm.
6. Check the application error log after the first production request and first form submission.

