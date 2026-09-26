import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
import data from '@/lib/content.json';
import {PageHero,Eyebrow,ContactBand} from '@/components/site/content';
export const metadata:Metadata={title:'Expertise',description:'Commercial intellectual property, IP disputes, technology, fintech, data protection, media and entertainment legal services.'};
export default function Expertise(){return <><PageHero label="Our expertise" title={<>Protect. Build.<br/><em>Defend.</em></>} description={data.servicesIntro}/><nav className="practice-index wrap" aria-label="Practice areas">{data.services.map((s,i)=><a href={'#'+s.id} key={s.id}><span>0{i+1}</span>{s.title}<ArrowDown size={18} aria-hidden="true"/></a>)}</nav><div className="practice-sections">{data.services.map((s,i)=><section className="section practice-detail" id={s.id} key={s.id}><div className="wrap practice-grid"><div><Eyebrow>Practice 0{i+1}</Eyebrow><h2>{s.title}</h2><p className="practice-summary">{s.summary}</p><Link className="text-link" href="/contact/">Discuss your matter <ArrowUpRight size={18} aria-hidden="true"/></Link></div><div className="prose">{s.paragraphs.map((paragraph,index)=><p className={index===0?"lead":undefined} key={paragraph}>{paragraph}</p>)}</div></div></section>)}</div><ContactBand/></>}
