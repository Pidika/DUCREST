import {asset} from '@/lib/asset';
export function BrandLogo({light=false,icon=false}:{light?:boolean;icon?:boolean}){return <img className={'ducrest-logo'+(icon?' logo-icon':'')} src={asset('/brand/'+(icon?'icon.svg':light?'logo-light.svg':'logo-colour.svg'))} alt="Ducrest Partners" width={icon?80:240} height={icon?80:65}/>}
