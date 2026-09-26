import documents from '@/lib/legal.json';
import {PageHero} from './content';

export function LegalDocument({documentKey}:{documentKey:keyof typeof documents}) {
  const document=documents[documentKey];
  return <>
    <PageHero label="Legal information" title={document.title} description={document.updated}/>
    <div className="wrap section legal-layout">
      <aside className="legal-contents">
        <nav aria-label={`${document.title} contents`}>
          <p className="eyebrow">In this document</p>
          <ol>{document.sections.map((section,index)=><li key={section.title}><a href={`#section-${index+1}`}>{section.title}</a></li>)}</ol>
        </nav>
      </aside>
      <article className="legal-document" aria-label={document.title}>
        <p className="legal-firm">Ducrest Partners</p>
        {document.sections.map((section,index)=><section className="legal-section" id={`section-${index+1}`} key={section.title}>
          <h2><span>{String(index+1).padStart(2,'0')}</span>{section.title}</h2>
          {section.body.map((block,blockIndex)=>block.type==='list'
            ? <ul key={blockIndex}>{block.items.map((item,itemIndex)=><li key={itemIndex}>{item}</li>)}</ul>
            : <p key={blockIndex}>{block.items[0].startsWith('Email: ')?<>Email: <a href={`mailto:${block.items[0].slice(7)}`}>{block.items[0].slice(7)}</a></>:block.items[0]}</p>)}
        </section>)}
      </article>
    </div>
  </>;
}
