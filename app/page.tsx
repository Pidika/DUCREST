import {asset} from '@/lib/asset';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import data from '@/lib/content.json';
import { ContactBand, PeoplePreview, Eyebrow } from '@/components/site/content';
import { Entrance } from '@/components/site/entrance';

export default function Home() {
 return <>
  <section className="home-hero"><div className="wrap hero-grid">
   <Entrance className="hero-copy"><Eyebrow light>Ducrest Partners · Lagos & Abuja</Eyebrow><h1>We Protect.<br/><em>We Build.</em><br/>We Defend.</h1><p>Legal counsel for creators, innovators and technology-driven businesses.</p><Link className="button button-light" href="/expertise/">Explore our expertise <ArrowUpRight aria-hidden="true" size={18}/></Link></Entrance>
   <div className="hero-image"><img src={asset('/images/hero.jpg')} alt="A lawyer working at a desk in a law library" width="1400" height="933" fetchPriority="high"/><div className="image-caption">Intellectual property. Technology. Creativity.</div></div>
  </div><div className="wrap hero-bottom"><span>Nigeria · Working across Africa</span><a href="#introduction">Discover the firm <ArrowDown size={16} aria-hidden="true"/></a></div></section>
  <section className="wrap section intro" id="introduction"><div><Eyebrow>The firm</Eyebrow><h2>Ideas have value.<br/><em>We help protect it.</em></h2></div><div className="intro-copy"><p className="lead">{data.about[0]}</p><p>We work with clients to protect their intellectual property, brands and creative assets, with advice shaped by their commercial interests.</p><Link className="text-link" href="/the-firm/">About Ducrest <ArrowUpRight size={18} aria-hidden="true"/></Link></div></section>
  <section className="expertise-preview section" aria-labelledby="expertise-heading"><div className="wrap"><div className="section-heading"><div><Eyebrow>Our expertise</Eyebrow><h2 id="expertise-heading">Focused legal advice.<br/><em>Built around your work.</em></h2></div><p>Four connected practice areas.<br/>One commercially focused approach.</p></div><div className="service-list">{data.services.map((s,i)=><Link className="service-row" href={'/expertise/#'+s.id} key={s.id}><span className="service-number">0{i+1}</span><h3>{s.title}</h3><p>{s.summary}</p><ArrowUpRight className="service-arrow" size={26} aria-hidden="true"/></Link>)}</div></div></section>
  <section className="wrap approach section"><Eyebrow>How we work</Eyebrow><div className="approach-grid"><h2>Your instruction.<br/><em>Our attention.</em></h2><div><p className="lead">Partners, consultants and associates bring cross-disciplinary experience to each mandate.</p><div className="policy"><span>48-hour</span><p>standing action policy on every instruction received.</p></div><Link href="/the-firm/#values" className="text-link">The standards behind our work <ArrowUpRight size={18} aria-hidden="true"/></Link></div></div></section>
  <PeoplePreview/><ContactBand/>
 </>;
}
