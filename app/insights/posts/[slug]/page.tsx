import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactBand, Eyebrow, PageHero } from '@/components/site/content';
import { getPublishedInsight, getPublishedInsights, insightCategories } from '@/lib/insights';

export async function generateStaticParams() {
  const posts = await getPublishedInsights().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedInsight(slug).catch(() => null);
  return post ? { title: post.seo?.title || post.title, description: post.seo?.description || post.excerpt } : {};
}

export default async function InsightArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedInsight(slug).catch(() => null);
  if (!post) notFound();
  const category = insightCategories.find((item) => item.slug === post.category)?.title ?? 'News & Insights';
  return <><PageHero label={category} title={post.title} description={post.excerpt}/><article className="wrap section insight-article"><header><Eyebrow>{new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.publishedAt))}</Eyebrow><p>By {post.author}</p></header>{post.image ? <img className="insight-hero-image" src={post.image.url} alt={post.image.alt} width="1200" height="750"/> : null}<div className="prose">{post.body.map((block, index) => block.type === 'heading' ? <h2 key={index}>{block.text}</h2> : <p key={index}>{block.text}</p>)}</div></article><ContactBand/></>;
}
