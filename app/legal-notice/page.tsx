import type {Metadata} from 'next';
import {PageHero} from '@/components/site/content';
export const metadata:Metadata={title:'Legal Notice'};
export default function Legal(){return <><PageHero label="Legal information" title="Legal Notice"/><section className="wrap section legal-copy prose"><h2>Ducrest Partners</h2><address>Suite 1G, 1st Floor, Lapal House<br/>235 Igbosere Road, Lagos Island<br/>Lagos State, Nigeria<br/>Lagos 101001</address><p>Phone: <a href="tel:+2348101632500">+234 810 163 2500</a><br/>Email: <a href="mailto:info@ducrestpartners.com">info@ducrestpartners.com</a></p></section></>}
