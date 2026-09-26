'use client';
import Link from 'next/link';
import {BrandLogo} from './logo';
import {usePathname} from 'next/navigation';
import {useState,useEffect} from 'react';
import {Menu, ArrowUpRight, X} from 'lucide-react';
import {Sheet,SheetTrigger,SheetContent,SheetTitle,SheetDescription,SheetClose} from '@/components/ui/sheet';
const navigation=[['The Firm','/the-firm/'],['Expertise','/expertise/'],['Our People','/our-people/'],['Sectors','/sectors/']];
export function Header(){
 const path=usePathname();const [open,setOpen]=useState(false);const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const update=()=>setScrolled(window.scrollY>40);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);},[]);
 return <header className={'site-header'+(path==='/'?' header-home':'')+(scrolled?' is-scrolled':'')}><div className="wrap header-inner"><Link href="/" className="brand" aria-label="Ducrest Partners — Home"><BrandLogo/></Link><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([n,url])=><Link href={url} key={url} aria-current={path.replace(/\/$/,'')===url.replace(/\/$/,'')?'page':undefined}>{n}</Link>)}<Link className="button" href="/contact/">Contact us <ArrowUpRight size={16} aria-hidden="true"/></Link></nav><div className="mobile-nav"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button className="menu-trigger" aria-label="Open navigation"><Menu size={26}/></button></SheetTrigger><SheetContent className="ducrest-menu" showCloseButton={false}><div className="menu-heading"><SheetTitle><BrandLogo/></SheetTitle><SheetClose asChild><button className="menu-trigger" aria-label="Close navigation"><X size={28}/></button></SheetClose></div><SheetDescription className="sr-only">Website navigation</SheetDescription><nav aria-label="Mobile navigation">{[['Home','/'],...navigation,['Contact','/contact/']].map(([n,url],i)=><Link href={url} key={url} onClick={()=>setOpen(false)}><span>0{i+1}</span>{n}<ArrowUpRight size={20} aria-hidden="true"/></Link>)}</nav><div className="menu-contact"><a href="mailto:info@ducrestpartners.com">info@ducrestpartners.com</a><a href="tel:+2348101632500">+234 810 163 2500</a></div></SheetContent></Sheet></div></div></header>;
}
