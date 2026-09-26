import type {Metadata} from 'next';
import {LegalDocument} from '@/components/site/legal-document';
export const metadata:Metadata={title:"Privacy Policy"};
export default function Page(){return <LegalDocument documentKey="privacy"/>}
