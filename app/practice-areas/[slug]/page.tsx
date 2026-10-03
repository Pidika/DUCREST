import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {notFound} from 'next/navigation';
import data from '@/lib/content.json';
import {PageHero,ContactBand} from '@/components/site/content';
export function generateStaticParams(){return data.services.map(s=>({slug:s.id}))}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const s=data.services.find(s=>s.id===slug);return {title:s?.title,description:s?.summary}}
export default async function Practice({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const service=data.services.find(s=>s.id===slug);if(!service)notFound();return <><PageHero label="Practice areas" title={service.title} description={service.summary}/><section className="wrap section practice-article"><aside><Link className="text-link" href="/practice-areas/">← All practice areas</Link><nav aria-label="Other practice areas">{data.services.map(s=><Link href={`/practice-areas/${s.id}/`} key={s.id} aria-current={s.id===slug?'page':undefined}>{s.title}</Link>)}</nav></aside><div className="prose">{service.paragraphs.map((p,i)=><p className={i===0?'lead':undefined} key={p}>{p}</p>)}<Link className="button practice-contact-button" href="/contact/">Discuss your matter <ArrowUpRight size={18} aria-hidden="true"/></Link></div></section><ContactBand/></>}
