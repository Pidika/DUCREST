import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ContactBand, Eyebrow } from '@/components/site/content';
import { getPublishedInsight, getPublishedInsights, insightCategories } from '@/lib/insights';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = await getPublishedInsights().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedInsight(slug).catch(() => null);
  return post ? { title: post.seo?.title || post.title, description: post.seo?.description || post.excerpt, alternates: {canonical: `/insights/posts/${slug}/`}, openGraph: {type:'article', title:post.seo?.title || post.title, description:post.seo?.description || post.excerpt, url:`/insights/posts/${slug}/`, publishedTime:post.publishedAt, authors:[post.author], images:post.image?[{url:post.image.url,alt:post.image.alt}]:undefined} } : {};
}

export default async function InsightArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedInsight(slug).catch(() => null);
  if (!post) notFound();
  const category = insightCategories.find((item) => item.slug === post.category)?.title ?? 'News & Insights';
  const readingMinutes = Math.max(1, Math.ceil(post.body.reduce((count, block) => count + block.text.split(/\s+/).length, 0) / 220));
  const published = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.publishedAt));
  const articleSchema = {'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.excerpt,datePublished:post.publishedAt,author:{'@type':'Person',name:post.author},publisher:{'@type':'Organization',name:'Ducrest Partners',logo:{'@type':'ImageObject',url:'https://ducrestpartners.com/brand/logo-colour.svg'}},mainEntityOfPage:`https://ducrestpartners.com/insights/posts/${slug}/`,image:post.image?.url};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema).replace(/</g,'\\u003c')}}/>
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
      {post.image ? <figure className="insight-hero-image"><Image src={post.image.url} alt={post.image.alt} width={1200} height={750} priority sizes="(max-width: 760px) 100vw, 88vw"/></figure> : null}
      <div className="article-layout"><aside><Eyebrow>{category}</Eyebrow><p>{published}</p><p>By {post.author}</p></aside><div className="prose">{post.body.map((block, index) => block.type === 'heading' ? <h2 key={index}>{block.text}</h2> : <p key={index}>{block.text}</p>)}</div></div>
    </article>
    <ContactBand/>
  </>;
}
