import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import data from '@/lib/content.json';
import {PageHero,ContactBand} from '@/components/site/content';
export const metadata:Metadata={title:'Sectors & Industries',description:'Ducrest Partners advises clients across entertainment, digital assets, technology, financial services, retail, fashion, real estate and construction.'};
const practices=[['entertainment','commercial-ip','litigation'],['web3','technology','corporate-advisory'],['technology','startups','commercial-ip'],['technology','corporate-advisory','dispute-resolution'],['commercial-ip','litigation','corporate-advisory'],['commercial-ip','entertainment','litigation'],['corporate-advisory','dispute-resolution']];
export default function Sectors(){return <><PageHero label="Sectors & industries" title={<>Sector knowledge.<br/><em>Commercial perspective.</em></>} description={data.positioning}/><section className="wrap section sector-details">{data.sectors.map((sector,i)=><article id={'sector-'+(i+1)} key={sector}><span className="service-number">0{i+1}</span><div><h2>{sector}</h2><p className="eyebrow">Related expertise</p><div className="sector-practices">{practices[i].map(id=>{const service=data.services.find(s=>s.id===id)!;return <Link href={'/expertise/#'+id} key={id}>{service.title}<ArrowUpRight size={17}/></Link>})}</div></div></article>)}</section><ContactBand/></>}
