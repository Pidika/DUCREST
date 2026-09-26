import Link from 'next/link';
import {PageHero} from '@/components/site/content';
export default function NotFound(){return <><PageHero label="Page not found" title={<>Let’s get you<br/><em>back on course.</em></>}/><section className="wrap section"><p>The page you’re looking for could not be found.</p><Link href="/" className="button" style={{marginTop:28}}>Return to the homepage</Link></section></>}
