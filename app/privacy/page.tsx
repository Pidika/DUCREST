import type {Metadata} from 'next';
import {ArrowUpRight} from 'lucide-react';
import {PageHero} from '@/components/site/content';
export const metadata:Metadata={title:'Privacy Policy'};
export default function Privacy(){return <><PageHero label="Legal information" title="Privacy Policy"/><section className="wrap section legal-copy prose"><h2>Your personal information</h2><p className="lead">For information about how Ducrest Partners handles personal data, read the firm’s published privacy policy.</p><p><a className="text-link" href="https://ducrestpartners.com/privacy/" target="_blank" rel="noopener noreferrer">Read the published policy <ArrowUpRight size={18} aria-hidden="true"/></a></p><h3>Privacy enquiries</h3><p>For questions about privacy or your personal information, contact <a href="mailto:info@ducrestpartners.com">info@ducrestpartners.com</a>.</p></section></>}
