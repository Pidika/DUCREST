# Ducrest Partners SEO handoff

## Implemented technical foundation

- Canonical HTTPS URLs on every indexable page.
- Unique page titles and descriptions, with CMS overrides for articles.
- One `h1` per indexable page and sequential heading levels.
- XML sitemap at `https://ducrestpartners.com/sitemap.xml`, including published CMS articles.
- Robots file at `https://ducrestpartners.com/robots.txt`.
- Organization/LegalService structured data site-wide and Article structured data on insight articles.
- Open Graph and Twitter sharing metadata with a generated 1200 × 630 brand image.
- Descriptive image alternative text and explicit image dimensions.
- Internal links between practices, sectors, people, insights and contact pages.
- Permanent `/expertise/` redirect to `/practice-areas/`.
- HTTP-to-HTTPS redirect at the host and HSTS/security headers in the application.
- Oversized team portraits converted to WebP.

## Google Search Console activation

This requires the domain owner’s Google account and cannot be completed anonymously.

1. Open Google Search Console and add a **Domain property** for `ducrestpartners.com`.
2. Copy the TXT verification record Google provides.
3. Add it to the domain’s Namecheap DNS as a TXT record for `@` without changing existing email records.
4. Return to Search Console and select **Verify**.
5. Submit `https://ducrestpartners.com/sitemap.xml` under **Sitemaps**.
6. Inspect the homepage and one article URL, then request indexing.
7. Give the client’s marketing lead Owner access and the site maintainer Full access.

If DNS access is unavailable, use Google’s HTML-tag method: add only the token value to `GOOGLE_SITE_VERIFICATION` in cPanel, deploy a new build, and verify. DNS domain verification is preferable because it covers all protocols and subdomains.

## Backlink and authority strategy

Quality and relevance matter more than volume. Do not purchase bulk links, use automated directory submissions or exchange links at scale.

### Foundation: first 30 days

1. Complete and verify the firm’s Google Business Profile with consistent firm name, Lagos and Abuja details, telephone numbers, website and practice categories.
2. Make the firm’s name, address and telephone details consistent across the Nigerian Bar Association profile, recognised legal directories, professional memberships and existing social profiles.
3. Ask current partners to link their verified professional biographies to their Ducrest profiles.
4. Correct old links that still point to obsolete site URLs.

### Editorial authority: months 1–3

1. Publish two useful Insights items each month around questions clients actually search for in Nigerian IP, entertainment, technology, fintech and data protection law.
2. Create original reference assets—regulatory timelines, founder checklists and deal-term explainers—that journalists, accelerators and industry bodies can cite.
3. Offer attributed commentary to credible Nigerian business, technology and creative-industry publications when regulations or major cases change.
4. Turn conference panels, webinars and media appearances into Events & Media pages, then ask organisers to link to the relevant page.

### Partnerships: months 2–6

1. Contribute legal education to reputable incubators, universities, creator associations, technology communities and professional bodies.
2. Seek editorial links from partner or event pages only where Ducrest made a real contribution.
3. Build practice-specific resource pages before conducting outreach so every requested link has a useful destination.

### Measurement

Review Search Console monthly for indexed pages, queries, impressions, clicks and linking domains. Track enquiries separately. Review new referring domains for relevance and remove or disavow links only when there is evidence of a deliberate spam-link problem.
