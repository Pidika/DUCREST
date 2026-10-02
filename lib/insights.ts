export const insightCategories=[
 {slug:'thought-leadership',title:'Thought Leadership',description:'Perspectives on the ideas and developments shaping business and the law.'},
 {slug:'legal-alerts',title:'Legal Alerts',description:'Updates on legal and regulatory developments affecting your business.'},
 {slug:'events-media',title:'Events & Media',description:'Conversations, appearances and events from Ducrest Partners.'},
] as const;
export type InsightCategory=typeof insightCategories[number]['slug'];
export type InsightPost={slug:string;title:string;excerpt:string;category:InsightCategory;publishedAt:string;status:'draft'|'published';author:string;image?:{url:string;alt:string};body:{type:'paragraph'|'heading';text:string}[];seo?:{title:string;description:string}};
// Replace this repository with the future CMS adapter. Drafts never reach public pages.
const posts:InsightPost[]=[];
export async function getPublishedInsights(category?:InsightCategory){return posts.filter(p=>p.status==='published'&&Date.parse(p.publishedAt)<=Date.now()&&(!category||p.category===category)).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt))}
