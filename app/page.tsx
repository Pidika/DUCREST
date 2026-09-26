import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import data from '@/lib/content.json';
import {ContactBand,PeoplePreview,Eyebrow} from '@/components/site/content';
import {CinematicHero,ScrollStatement} from '@/components/site/experience';
import {Entrance} from '@/components/site/entrance';
export default function Home(){return <>
<CinematicHero/>
<section className="wrap section editorial-intro" id="introduction"><div className="intro-label"><Eyebrow>The Ducrest perspective</Eyebrow><span className="editorial-index" aria-hidden="true">01 / THE FIRM</span></div><div><h2>Your ideas deserve<br/><em>more than protection.</em><br/>They deserve a future.</h2><div className="intro-body"><p>Ducrest Partners advises the creators, founders and businesses shaping the technology and creative economy. We protect intellectual property, structure commercial relationships and act when rights are challenged.</p><div><p>Based in Lagos and Abuja.<br/>Working across Nigeria and Africa.</p><Link className="text-link" href="/the-firm/">Discover the firm <ArrowUpRight size={18}/></Link></div></div></div></section>
<ScrollStatement/>
<section className="expertise-stage section"><div className="wrap expertise-layout"><div className="expertise-sticky"><Eyebrow light>Our expertise</Eyebrow><h2>Where ideas<br/>meet <em>the law.</em></h2><p>Four connected practices. Advice shaped around the way you work.</p><Link href="/expertise/" className="text-link">Explore all practices <ArrowUpRight size={18}/></Link><div className="practice-seal" aria-hidden="true">D<span>PROTECT · BUILD · DEFEND</span></div></div><div className="expertise-chapters">{data.services.map((s,i)=><Entrance key={s.id} className="expertise-chapter"><Link href={'/expertise/#'+s.id}><span className="chapter-top"><span>0{i+1} / PRACTICE AREA</span><ArrowUpRight size={28}/></span><h3>{s.title}</h3><p>{s.summary}</p><span className="chapter-link">Explore this practice <ArrowUpRight size={17}/></span></Link></Entrance>)}</div></div></section>
<section className="wrap section approach-editorial"><div><Eyebrow>How we work</Eyebrow><h2>Every instruction.<br/><em>Our full attention.</em></h2></div><div className="approach-note"><span className="large-policy">48<span>hours</span></span><p>Our standing action policy on every instruction received.</p><div className="approach-rule"/><p>Partners, consultants and associates bring cross-disciplinary experience to each mandate.</p><Link href="/the-firm/#values" className="text-link">Our principles <ArrowUpRight size={18}/></Link></div></section>
<PeoplePreview/><ContactBand/>
</>}
