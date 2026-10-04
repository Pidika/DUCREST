import {asset} from '@/lib/asset';
import Image from 'next/image';
export function BrandLogo({light=false,icon=false}:{light?:boolean;icon?:boolean}){return <Image className={'ducrest-logo'+(icon?' logo-icon':'')} src={asset('/brand/'+(icon?'icon.svg':light?'logo-light.svg':'logo-colour.svg'))} alt="Ducrest Partners" width={icon?80:240} height={icon?80:65} sizes={icon?'155px':'240px'}/>}
