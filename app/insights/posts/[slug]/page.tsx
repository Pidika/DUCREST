import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ContactBand, Eyebrow } from '@/components/site/content';
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
  const readingMinutes = Math.max(1, Math.ceil(post.body.reduce((count, block) => count + block.text.split(/\s+/).length, 0) / 220));
  const published = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.publishedAt));
  return <>
    <section className="page-hero insight-article-hero">
      <div className="wrap">
        <Eyebrow light>{category}</Eyebrow>
        <h1>{post.title}</h1>
        <p className="hero-description">{post.excerpt}</p>
        <div className="article-hero-meta"><span>{published}</span><span>By {post.author}</span><span>{readingMinutes} min read</span></div>
      </div>
    </section>
    <article className="wrap section insight-article">
      <Link className="article-back" href="/insights/"><ArrowLeft size={17}/> Back to News &amp; Insights</Link>
      {post.image ? <figure className="insight-hero-image"><img src={post.image.url} alt={post.image.alt} width="1200" height="750"/></figure> : null}
      <div className="article-layout"><aside><Eyebrow>{category}</Eyebrow><p>{published}</p><p>By {post.author}</p></aside><div className="prose">{post.body.map((block, index) => block.type === 'heading' ? <h2 key={index}>{block.text}</h2> : <p key={index}>{block.text}</p>)}</div></div>
    </article>
    <ContactBand/>
  </>;
}
