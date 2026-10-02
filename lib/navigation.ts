import data from './content.json';
export type NavigationItem={label:string;href:string;children?:{label:string;href:string}[]};
export const navigation:NavigationItem[]=[
 {label:'The Firm',href:'/the-firm/',children:[{label:'About Ducrest',href:'/the-firm/#about'},{label:'Mission & Vision',href:'/the-firm/#purpose'},{label:'Our Values',href:'/the-firm/#values'},{label:'Our Story',href:'/the-firm/#our-story'},{label:'Our Reach',href:'/the-firm/#reach'}]},
 {label:'Practice Areas',href:'/practice-areas/',children:data.services.map(s=>({label:s.title,href:`/practice-areas/${s.id}/`}))},
 {label:'Our People',href:'/our-people/'},
 {label:'Sectors',href:'/sectors/',children:data.sectors.map((s,i)=>({label:s,href:`/sectors/#sector-${i+1}`}))},
 {label:'News & Insights',href:'/insights/',children:[{label:'Thought Leadership',href:'/insights/thought-leadership/'},{label:'Legal Alerts',href:'/insights/legal-alerts/'},{label:'Events & Media',href:'/insights/events-media/'}]},
];
