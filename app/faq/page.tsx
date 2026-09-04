import type { Metadata } from 'next';
import { faqCategories } from '../_knowledge/content';
import { KnowledgeShell, ProjectCta, SourceLink } from '../_knowledge/chrome';
import s from '../_knowledge/knowledge.module.css';
export const metadata: Metadata = {
  title: 'Supplement Manufacturing FAQ | Jentoor',
  description: 'Answers on OEM and ODM, custom formulation, sampling, quality documentation, packaging and delivery for supplement brands.',
  alternates: { canonical: '/faq' },
  openGraph: { title: 'Supplement Manufacturing FAQ | Jentoor', description: 'Practical answers for your next supplement project.', url: '/faq', type: 'website' },
};
export default function FaqPage() {
  return <KnowledgeShell current="FAQ" title="Good questions." emphasis="Clear next steps." intro="Practical answers for building a supplement product—from choosing a development model to approving the batch and delivery.">
    <div className={`${s.container} ${s.faqLayout}`}>
      <aside className={s.sidebar}><p className={s.kicker}>FIND YOUR ANSWER</p><nav aria-label="FAQ categories">{faqCategories.map((category, i) => <a key={category.id} href={`#${category.id}`}><span>0{i + 1}</span>{category.title}</a>)}</nav><div className={s.sideNote}><strong>Looking for the full sequence?</strong><p>See who supplies, reviews and approves each stage.</p><a href="/formulation">Explore the process <span aria-hidden="true">→</span></a></div></aside>
      <div>{faqCategories.map((category, i) => <section className={s.faqSection} id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}><div className={s.sectionHeading}><span className={s.number}>0{i + 1}</span><div><h2 id={`${category.id}-title`}>{category.title}</h2><p>{category.intro}</p></div></div>{category.items.map(item => <details className={s.question} id={item.id} key={item.id}><summary>{item.question}<span className={s.toggle} aria-hidden="true" /></summary><div className={s.answer}><p>{item.answer}</p>{item.step && <a className={s.inlineLink} href={`/formulation#${item.step}`}>View this process stage <span aria-hidden="true">→</span></a>}{item.source && <SourceLink source={item.source} />}</div></details>)}</section>)}
        <p className={s.scopeNote}>Project scope, commercial terms and applicable facility documents are confirmed for each SKU. US regulatory references support general planning; the final formula, label and claims need product-specific review.</p>
      </div>
    </div><ProjectCta />
  </KnowledgeShell>;
}
