import type {Metadata} from 'next';
import {LegalDocument} from '@/components/site/legal-document';
export const metadata:Metadata={title:"Terms of Use",description:'Terms governing access to and use of the Ducrest Partners website.',alternates:{canonical:'/terms-of-use/'}};
export default function Page(){return <LegalDocument documentKey="terms-of-use"/>}
