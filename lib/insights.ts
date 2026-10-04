export const insightCategories = [
  { slug: 'thought-leadership', title: 'Thought Leadership', description: 'Perspectives on the ideas and developments shaping business and the law.' },
  { slug: 'legal-alerts', title: 'Legal Alerts', description: 'Updates on legal and regulatory developments affecting your business.' },
  { slug: 'events-media', title: 'Events & Media', description: 'Conversations, appearances and events from Ducrest Partners.' },
] as const;

export type InsightCategory = typeof insightCategories[number]['slug'];
export type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  publishedAt: string;
  status: 'published';
  author: string;
  image?: { url: string; alt: string };
  body: { type: 'paragraph' | 'heading'; text: string }[];
  seo?: { title?: string; description?: string };
};

const fields = `{
  "slug": slug.current,
  title,
  excerpt,
  category,
  publishedAt,
  "status": "published",
  "author": coalesce(author->name, authorName, "Ducrest Partners"),
  "image": select(defined(mainImage.asset) => {"url": mainImage.asset->url, "alt": coalesce(mainImage.alt, title)}),
  "body": body[_type == "block"]{"type": select(style in ["h2", "h3"] => "heading", "paragraph"), "text": pt::text(@)},
  seo
}`;

async function sanityQuery<T>(query: string): Promise<T | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  if (!projectId) return null;
  const url = new URL(`https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}`);
  url.searchParams.set('query', query);
  const response = await fetch(url, { next: { revalidate: 60, tags: ['insights'] } });
  if (!response.ok) throw new Error(`Sanity query failed with ${response.status}`);
  const payload = await response.json() as { result: T };
  return payload.result;
}

export async function getPublishedInsights(category?: InsightCategory) {
  const categoryFilter = category ? ` && category == ${JSON.stringify(category)}` : '';
  return (await sanityQuery<InsightPost[]>(`*[_type == "insight" && status == "published" && publishedAt <= now()${categoryFilter}] | order(publishedAt desc) ${fields}`)) ?? [];
}

export async function getPublishedInsight(slug: string) {
  return sanityQuery<InsightPost>(`*[_type == "insight" && status == "published" && slug.current == ${JSON.stringify(slug)} && publishedAt <= now()][0] ${fields}`);
}
