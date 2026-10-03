# News & Insights: publishing handoff

The v2 interface is being prepared for Sanity publishing. Production will run on the client's Namecheap hosting; Vercel is used only for previews.

- `studio/` contains the separate Sanity Studio project and the author and publication schemas.
- Install the Studio with `cd studio && npm install`, copy `studio/.env.example` to `studio/.env`, and run `npm run dev`.
- Deploy the Studio with `npm run deploy` after the Sanity project ID is available.

- `lib/insights.ts` defines category slugs, post fields and the async published-content adapter.
- Public categories: Thought Leadership, Legal Alerts, Events & Media.
- `components/site/insights-index.tsx` renders the overview and category listings from that adapter. It displays an honest empty state until approved posts exist.
- Future article URLs: `/insights/posts/[slug]/`. Add this route and the article template as part of CMS integration before returning posts from the adapter.
- Required content: title, unique slug, excerpt, category, author, publish date, status, structured body. Optional image requires alt text; SEO overrides are optional.
- Public queries must exclude drafts and future publication dates. Preview access must be authenticated, with CMS tokens on the server only.
- Connect publishing to on-demand revalidation on the production Node.js application, including unpublish/delete behaviour. Add pagination, media handling and the selected editor's workflow during integration.

## Contact form

The selected production flow is Turnstile verification, Supabase persistence and Resend notification. The server endpoint and form workflow are implemented and remain disabled until the environment keys are connected. Keep every secret server-side, validate all fields again on the server, store the enquiry before attempting email delivery, and report distinct storage and delivery outcomes.

- Run `db/enquiries.sql` in the Supabase SQL editor once.
- The browser submits to `POST /api/enquiries`; the server verifies Turnstile before any storage or delivery.
- Enquiries are written before Resend is called, so an email-provider failure does not lose the submission.
- The Supabase anonymous role cannot read or insert enquiries. Only the server-side secret key inserts; authenticated staff can read and update records.

## Privacy notice

The current notice records an essential-only acknowledgement locally for 90 days. No analytics, advertising or embedded third-party media is installed. If the CMS adds optional trackers or embeds, introduce consent categories and block those integrations until consent; don't treat this acknowledgement as future tracking consent.
