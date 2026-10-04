import type {Metadata} from 'next';
import {LegalDocument} from '@/components/site/legal-document';
export const metadata:Metadata={title:"Privacy Policy",description:'How Ducrest Partners collects, uses, protects and retains personal information.',alternates:{canonical:'/privacy/'}};
export default function Page(){return <LegalDocument documentKey="privacy"/>}
