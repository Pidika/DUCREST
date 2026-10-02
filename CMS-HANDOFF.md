# News & Insights: publishing handoff

The v2 interface is ready for the separately commissioned CMS integration. No CMS account, admin interface or publishing service has been created.

- `lib/insights.ts` defines category slugs, post fields and the async published-content adapter.
- Public categories: Thought Leadership, Legal Alerts, Events & Media.
- `components/site/insights-index.tsx` renders the overview and category listings from that adapter. It displays an honest empty state until approved posts exist.
- Future article URLs: `/insights/posts/[slug]/`. Add this route and the article template as part of CMS integration before returning posts from the adapter.
- Required content: title, unique slug, excerpt, category, author, publish date, status, structured body. Optional image requires alt text; SEO overrides are optional.
- Public queries must exclude drafts and future publication dates. Preview access must be authenticated, with CMS tokens on the server only.
- Connect publishing to Vercel revalidation or deployment, including unpublish/delete behaviour. Add pagination, media handling and the selected editor's workflow during integration.

## Contact form

The user explicitly deferred delivery integration. The form currently validates input and prepares a user-controlled email draft; it never claims delivery or stores enquiry data. Replace this handoff with a server endpoint after choosing a delivery service. Add server validation, spam protection, request limits and success/failure feedback. Keep credentials server-side and test delivery to the confirmed inbox.

## Privacy notice

The current notice records an essential-only acknowledgement locally for 90 days. No analytics, advertising or embedded third-party media is installed. If the CMS adds optional trackers or embeds, introduce consent categories and block those integrations until consent; don't treat this acknowledgement as future tracking consent.
