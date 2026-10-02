'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
const KEY='ducrest-privacy-v1';const MAX_AGE=90*24*60*60*1000;
export function PrivacyNotice(){const [open,setOpen]=useState(false);useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(!saved||typeof saved.at!=='number'||Date.now()-saved.at>MAX_AGE)setOpen(true)}catch{setOpen(true)}const reopen=()=>setOpen(true);window.addEventListener('ducrest:privacy',reopen);return()=>window.removeEventListener('ducrest:privacy',reopen)},[]);
 const close=()=>{try{localStorage.setItem(KEY,JSON.stringify({at:Date.now(),mode:'essential-only'}))}catch{}setOpen(false)};
 return <Dialog open={open} onOpenChange={value=>{if(!value)close();else setOpen(true)}}><DialogContent className="privacy-dialog" showCloseButton={false}><p className="eyebrow">Your privacy</p><DialogTitle>Privacy, with clarity.</DialogTitle><DialogDescription>This website does not currently use analytics or advertising trackers. We store your acknowledgement on this device so this notice does not appear on every visit.</DialogDescription><p>You can reopen this notice using “Privacy preferences” in the footer. Read our <Link href="/privacy/" onClick={close}>Privacy Policy</Link> for information about how the firm handles personal data.</p><button className="button" onClick={close}>Continue with essential only</button></DialogContent></Dialog>
}
export function PrivacyPreferences(){return <button type="button" className="privacy-preferences" onClick={()=>window.dispatchEvent(new Event('ducrest:privacy'))}>Privacy preferences</button>}
