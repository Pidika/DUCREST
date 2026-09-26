import type {Metadata} from 'next';
import data from '@/lib/content.json';
import {PageHero,Eyebrow,ContactBand,PeoplePreview} from '@/components/site/content';
import {Entrance} from '@/components/site/entrance';
export const metadata:Metadata={title:'The Firm',description:'Meet Ducrest Partners, a Nigerian law firm focused on intellectual property, technology and the creative economy.'};
export default function Firm(){return <>
 <PageHero label="The firm" title={<>Legal insight.<br/><em>Commercial understanding.</em></>} description="Working at the intersection of technology, creativity and intellectual property."/>
 <section className="wrap section story-grid"><div><Eyebrow>About Ducrest</Eyebrow><h2>Protecting the value<br/><em>of your work.</em></h2></div><div className="prose">{data.about.map((p,i)=><p className={i===0?'lead':undefined} key={p}>{p}</p>)}</div></section>
 <section className="purpose section"><div className="wrap purpose-grid"><Entrance><Eyebrow>Our mission</Eyebrow><h2>Legal architecture<br/><em>for enterprise.</em></h2><p>{data.mission}</p></Entrance><Entrance><Eyebrow>Our vision</Eyebrow><h2>Lasting value.<br/><em>Across generations.</em></h2><p>{data.vision}</p></Entrance></div></section>
 <section className="wrap section" id="values"><div className="section-heading"><div><Eyebrow>Our values</Eyebrow><h2>The standards<br/><em>behind our work.</em></h2></div></div><div className="value-list">{data.values.map((v,i)=><div className="value-row" key={v.title}><span className="service-number">0{i+1}</span><h3>{v.title}</h3><p>{v.body}</p></div>)}</div></section><PeoplePreview/><ContactBand/>
 </>}
