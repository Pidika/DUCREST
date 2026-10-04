import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import data from '@/lib/content.json';
import {PageHero,ContactBand} from '@/components/site/content';
export const metadata:Metadata={title:'Practice Areas',description:data.servicesIntro,alternates:{canonical:'/practice-areas/'}};
export default function Practices(){return <><PageHero label="Practice areas" title={<>Legal thinking.<br/><em>Commercial clarity.</em></>} description={data.servicesIntro}/><section className="wrap section practice-directory">{data.services.map((s,i)=><Link className="practice-card" href={`/practice-areas/${s.id}/`} key={s.id}><span className="eyebrow">0{i+1} / Practice area</span><h2>{s.title}</h2><p>{s.summary}</p><span className="text-link">Explore practice <ArrowUpRight size={20}/></span></Link>)}</section><ContactBand/></>}
