import type {Metadata} from 'next';
import {LegalDocument} from '@/components/site/legal-document';
export const metadata:Metadata={title:"Disclaimer Notice"};
export default function Page(){return <LegalDocument documentKey="disclaimer"/>}
