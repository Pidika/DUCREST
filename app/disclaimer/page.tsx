import type {Metadata} from 'next';
import {LegalDocument} from '@/components/site/legal-document';
export const metadata:Metadata={title:"Disclaimer Notice",description:'Important information about the legal content published by Ducrest Partners.',alternates:{canonical:'/disclaimer/'}};
export default function Page(){return <LegalDocument documentKey="disclaimer"/>}
