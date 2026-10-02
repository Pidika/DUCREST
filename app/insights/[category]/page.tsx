import {notFound} from 'next/navigation';
import {insightCategories} from '@/lib/insights';
import {InsightsIndex} from '@/components/site/insights-index';
export const dynamicParams=false;
export function generateStaticParams(){return insightCategories.map(c=>({category:c.slug}))}
export async function generateMetadata({params}:{params:Promise<{category:string}>}){const {category}=await params;const c=insightCategories.find(c=>c.slug===category);return {title:c?.title,description:c?.description}}
export default async function Page({params}:{params:Promise<{category:string}>}){const {category}=await params;const c=insightCategories.find(c=>c.slug===category);if(!c)notFound();return <InsightsIndex category={c.slug}/>}
