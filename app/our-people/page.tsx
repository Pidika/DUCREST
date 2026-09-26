import {asset} from '@/lib/asset';
import type {Metadata} from 'next';
import data from '@/lib/content.json';
import {PageHero,Eyebrow,ContactBand} from '@/components/site/content';
export const metadata:Metadata={title:'Our People',description:'Meet Ducrest Partners’ partners: Chukwudi Chimezie and Chiemeka Ohajionu.'};
export default function People(){return <><PageHero label="Our people" title={<>The people<br/><em>behind the practice.</em></>} description="Experience in intellectual property, disputes and emerging technology, brought together around your instruction."/><div className="wrap profiles">{data.people.map(p=><section className="profile section" id={p.name.toLowerCase().replaceAll(' ','-')} key={p.name}><div className="profile-portrait"><img src={asset('/images/'+p.image)} width="608" height="800" alt={p.name} loading="lazy"/></div><div className="profile-copy"><Eyebrow>Partner</Eyebrow><h2>{p.name}</h2><p className="profile-focus">{p.focus}</p><p className="lead">{p.bio}</p><a className="text-link" href="mailto:info@ducrestpartners.com">Contact the firm</a></div></section>)}</div><ContactBand/></>}
