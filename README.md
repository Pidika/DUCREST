# Ducrest Partners website

A responsive website for Ducrest Partners, with the firm's burgundy identity, EB Garamond / Inter typography, real portraits, and Motion for React animations. Includes Home, The Firm, Practice Areas, Our People, Sectors, News & Insights, Contact, Privacy Policy, Terms of Use and Disclaimer.

## v2 review branch

Client corrections are on `v2`. Keep `main` as the fallback. Vercel can generate a Preview deployment from `v2`; do not change the production branch until the client approves. The GitHub Pages workflow publishes only `main`. The v2 workflow checks the build without deploying to Pages.

## Run locally

Use Node.js 22.

```sh
npm ci
npm run dev
```

Open the local URL printed by the server (normally http://localhost:5173).

```sh
npm run typecheck
npm run build:github
```

The GitHub build generates the static website in `out/`. Serve that directory with a local HTTP server to review the production version. Opening generated files directly with `file://` is not supported.

## Preview on Vercel

Vercel is used only for development and client review. It is not the production host.

1. In Vercel, choose **Add New → Project** and import `Pidika/DUCREST`, branch `v2`.
2. Keep **Root Directory** as `./` (the GitHub repository already contains the website at its root).
3. Use the **Next.js** framework preset and **Node.js 22.x**. The checked-in `vercel.json` configures `npm ci` and `npm run build:vercel` automatically.
4. Leave **Output Directory** at the framework default. Add preview credentials from `.env.example` when the integrations are enabled.
5. Deploy, then share the preview `.vercel.app` URL. Check it in a signed-out browser before sending to the client; deployment protection settings may require access or a sharing link.

On Vercel, Next.js uses root-relative navigation and image paths. The `/DUCREST` prefix is only used by the GitHub Pages build. Existing GitHub Pages publishing remains supported.

## Production on Namecheap

The production target is the client's Namecheap hosting account and the public origin is `https://ducrestpartners.com`. The enquiry endpoint requires a server-side Node.js runtime because the Supabase service-role key, Resend API key and Turnstile secret must never be shipped in static browser files.

Before deployment, confirm that the Namecheap plan exposes **Setup Node.js App** in cPanel and supports Node.js 22. Configure the application at the domain root, run the production build on the server, and add every value from `.env.example` through the application's environment-variable controls. Keep `.env` outside `public_html` if the host requires a physical file.

If the plan is static/PHP-only, upgrade to a Node.js-capable Namecheap plan or place the server endpoint on a separate supported runtime. Do not embed server credentials into a static export. Vercel remains a preview environment only.

## Publish with GitHub Pages

Upload the **contents of this website folder** to the root of its own GitHub repository, including `.github/workflows/pages.yml`. Do not upload `node_modules`, `.next`, `.vinext`, `.wrangler`, or `.sites-runtime`.

1. Put the source on the `main` branch.
2. In repository Settings → Pages, select **GitHub Actions** as the build source.
3. Push to `main` or run **Publish Ducrest website** from the Actions tab.
4. The completed deployment supplies the public Pages URL.

The workflow sets the repository base path automatically for both navigation and local assets. If using a custom domain, configure it in Pages settings before the build. Client preview: https://pidika.github.io/DUCREST/ — published from the main branch.

The parent folder's `index.html` and GitHub workflow are the separate client **design presentation**. Keep the presentation and this working site in separate repositories, or deliberately choose one deployment workflow.

## Content and assets

- Legal document copy: `lib/legal.json`, transcribed from the firm-supplied documents.
- Page copy: `lib/content.json` and `app/`.
- Shared navigation/footer: `components/site/`.
- Visual system: `app/globals.css`, `app/v2.css` and `design-system/MASTER.md`.
- Photography: `public/images/`. Supplied vector brand assets and trimmed web variants: `public/brand/`.
- Phone/email links are functional. There is no enquiry form backend or analytics.
- Fonts are bundled locally; no Google Fonts network request is required.
- Motion respects reduced-motion preferences. The mobile menu supports keyboard focus and Escape.

Read `CONTENT-APPROVAL.md` before launch. The supplied Privacy Policy, Terms of Use and Disclaimer are published in full. The confirmed Abuja address and all four team portraits are included. The supplied vector wordmark uses berry on light backgrounds and white on dark backgrounds; the favicon uses the supplied icon mark.

The client-supplied website document is the source for eight practice descriptions, four biographies, six values, four pillars and seven sectors. News & Insights has overview and category pages backed by a typed content adapter. No posts are fabricated. See `CMS-HANDOFF.md` for the future publishing integration, contact delivery and privacy controls.


