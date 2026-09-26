# Ducrest Partners website

A responsive ten-page website for Ducrest Partners, with the firm's burgundy identity, EB Garamond / Inter typography, real portraits, and Motion for React animations. Includes Home, The Firm, Expertise, Our People, Sectors, Contact, Legal Notice, Privacy Policy, Terms of Use and Disclaimer.

## Run locally

Use Node.js 22 or later.

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
- Visual system: `app/globals.css` and `design-system/MASTER.md`.
- Photography and logo: `public/images/`.
- Phone/email links are functional. There is no enquiry form backend or analytics.
- Fonts are bundled locally; no Google Fonts network request is required.
- Motion respects reduced-motion preferences. The mobile menu supports keyboard focus and Escape.

Read `CONTENT-APPROVAL.md` before launch. Client-approved final privacy wording remains outstanding; the privacy page currently links to the existing published policy. The logo and imagery are recovered originals pending higher-resolution assets and confirmation of use.

The client-supplied website document is the source for eight practice descriptions, four biographies, six values, four pillars and seven sectors. Insights is removed from the public site until the future CMS publishing phase. The original categories remain in the content data for that phase.


