'use client';
import {useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';
import {animate,inView,motion,useReducedMotion,useScroll,useSpring,useTransform} from 'motion/react';
import Link from 'next/link';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
import {asset} from '@/lib/asset';
import Image from 'next/image';

export function SiteMotion(){
 const pathname=usePathname();const reduced=useReducedMotion();
 const previousPath=useRef(pathname);
 useEffect(()=>{
  if(previousPath.current===pathname)return;
  previousPath.current=pathname;
  if(!window.location.hash)window.scrollTo({top:0,behavior:'instant'});
 },[pathname]);
 const {scrollYProgress}=useScroll();const progress=useSpring(scrollYProgress,{stiffness:100,damping:30,restDelta:.001});
 useEffect(()=>{
  if(reduced)return;
  const elements=document.querySelectorAll<HTMLElement>('main .section h2, main .section .eyebrow, main .prose, main .value-row, main .profile-portrait, main .person-preview, main .contact-details, main .office-address, .contact-band h2');
  const stops:Array<()=>void>=[];
  elements.forEach(el=>{
   if(el.getBoundingClientRect().top<window.innerHeight*.95)return;
   el.style.opacity='0';el.style.transform='translateY(36px)';
   const stop=inView(el,()=>{animate(el,{opacity:1,transform:'translateY(0px)'},{duration:.85,ease:[.22,1,.36,1]});},{margin:'0px 0px -45px 0px'});
   stops.push(()=>{stop();el.style.opacity='';el.style.transform='';});
  });
  return()=>stops.forEach(stop=>stop());
 },[pathname,reduced]);
 return <motion.div aria-hidden="true" className="reading-progress" style={{scaleX:reduced?scrollYProgress:progress}}/>;
}
export function CinematicHero(){
 const ref=useRef<HTMLElement>(null);const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
 const y=useTransform(scrollYProgress,[0,1],['0%','22%']);const scale=useTransform(scrollYProgress,[0,1],[1.04,1.14]);const copyY=useTransform(scrollYProgress,[0,1],[0,100]);
 return <section className="cinematic-hero" ref={ref}>
  <motion.div className="cinematic-photo" style={reduced?undefined:{y,scale}}><Image src={asset('/images/ducrest-team.webp')} alt="Three Ducrest Partners team members in the firm's office" width={1280} height={1024} priority sizes="100vw"/></motion.div>
  <div className="hero-shade"/><div className="hero-fine-lines" aria-hidden="true"/>
  <motion.div className="wrap cinematic-copy" style={reduced?undefined:{y:copyY}}>
   <p className="eyebrow light hero-kicker">Ducrest Partners · Lagos &amp; Abuja</p>
   <h1 className="client-headline" aria-label="Proven Expertise with Global Perspective">{['Proven Expertise','with Global Perspective'].map((line,i)=><span className="headline-mask" key={line}><span className={'hero-line hero-line-'+i}>{i===1?<em>{line}</em>:line}</span></span>)}</h1>
   <div className="hero-summary"><p>A commercial law firm with specialised depth in the industries shaping the next generation of business.</p><Link className="button button-light" href="/practice-areas/">Explore practice areas <ArrowUpRight size={20} aria-hidden="true"/></Link></div>
  </motion.div>
  <div className="wrap cinematic-bottom"><span>Intellectual property · Technology · Entertainment</span><a href="#introduction" className="scroll-cue"><span>Scroll to discover</span><span className="scroll-circle"><ArrowDown size={18} aria-hidden="true"/></span></a></div>
  <span className="hero-side-label" aria-hidden="true">Lagos / Abuja — Nigeria</span>
 </section>;
}
export function ScrollStatement(){
 const ref=useRef<HTMLElement>(null);const reduced=useReducedMotion();const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});const x=useTransform(scrollYProgress,[0,1],['8%','-12%']);
 return <section className="scroll-statement" ref={ref} aria-label="Protecting ideas. Building value."><motion.div aria-hidden="true" style={reduced?undefined:{x}}>Protecting ideas. <em>Building value.</em></motion.div></section>;
}
