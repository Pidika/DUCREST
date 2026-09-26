import type {Metadata} from 'next';
import data from '@/lib/content.json';
import {PageHero,ContactBand} from '@/components/site/content';
export const metadata:Metadata={title:'News & Insights',description:'Thought leadership, legal alerts and events from Ducrest Partners.'};
export default function Insights(){return <><PageHero label="News & insights" title={<>Ideas. Developments.<br/><em>Perspectives.</em></>}/><section className="wrap section insights-categories">{data.insightCategories.map((category,i)=><article key={category}><span className="service-number">0{i+1}</span><h2>{category}</h2><p>{category==='Events'?'No events published yet.':'No publications available yet.'}</p></article>)}</section><ContactBand/></>}
