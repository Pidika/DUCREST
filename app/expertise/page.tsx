import {PageHero} from '@/components/site/content';
import {LegacyPracticeRedirect} from '@/components/site/legacy-practice-redirect';
import Link from 'next/link';
export const metadata={title:'Practice Areas',robots:{index:false,follow:true}};
export default function Legacy(){return <><LegacyPracticeRedirect/><PageHero label="Practice areas" title="Our practice areas"/><section className="wrap section"><Link className="text-link" href="/practice-areas/">Explore our practice areas →</Link></section></>}
