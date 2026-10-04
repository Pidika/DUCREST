import type {MetadataRoute} from 'next';
import data from '@/lib/content.json';
import {getPublishedInsights,insightCategories} from '@/lib/insights';

const origin='https://ducrestpartners.com';

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const posts=await getPublishedInsights().catch(()=>[]);
  const staticPaths=['','the-firm','practice-areas','our-people','sectors','insights','contact','privacy','terms-of-use','disclaimer'];
  return [
    ...staticPaths.map((path,index)=>({url:`${origin}/${path}${path?'/':''}`,changeFrequency:(index===0?'weekly':'monthly') as 'weekly'|'monthly',priority:index===0?1:path==='contact'?0.8:0.7})),
    ...data.services.map(service=>({url:`${origin}/practice-areas/${service.id}/`,changeFrequency:'monthly' as const,priority:0.75})),
    ...insightCategories.map(category=>({url:`${origin}/insights/${category.slug}/`,changeFrequency:'weekly' as const,priority:0.7})),
    ...posts.map(post=>({url:`${origin}/insights/posts/${post.slug}/`,lastModified:new Date(post.publishedAt),changeFrequency:'monthly' as const,priority:0.8})),
  ];
}
