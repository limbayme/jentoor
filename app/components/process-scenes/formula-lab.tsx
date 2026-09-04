'use client';
import { useEffect, useState } from 'react';
import DeferredProcessScene from './deferred-scene';
import FormatStill from './format-still';
import type { SceneKind } from './scene-runtime';
import styles from './formula-lab.module.css';

export const dosageFormats = [
  { id:'capsule', name:'Capsules', model:'capsule', note:'Shell, fill blend and delivery requirements shape the capsule brief.' },
  { id:'tablet', name:'Tablets', model:'tablet', note:'Compression, coating and the active core are considered together.' },
  { id:'powder', name:'Powders', model:null, note:'Solubility, texture, flavor and packaging guide powder development.' },
  { id:'liquid', name:'Liquids', model:null, note:'Liquid compatibility, filling and packaging guide the product route.' },
  { id:'gummy', name:'Gummies', model:'gummy', note:'Shape, texture and serving format shape the gummy concept.' },
  { id:'chewable', name:'Chewable Tablets', model:null, note:'Mouthfeel, taste and compression guide chewable tablet development.' },
  { id:'softgel', name:'Softgels', model:'softgel', note:'Fill compatibility, shell and seal requirements guide development.' },
  { id:'lozenge', name:'Lozenges', model:null, note:'Sensory experience, form and serving requirements shape the brief.' },
  { id:'film', name:'Oral Dissolving Films', model:'film', note:'Film handling, oral experience and individual packaging shape the concept.' },
] as const;
const outcomes = [
  { id:'daily', name:'Daily Wellness', color:'#d9ff6b' },
  { id:'energy', name:'Energy + Focus', color:'#7bffc5' },
  { id:'beauty', name:'Beauty from Within', color:'#e5b5bf' },
  { id:'sleep', name:'Sleep + Recovery', color:'#94bed7' },
];
export type FormulaBrief = { format: string; outcome: string; partnership: 'OEM / ODM'; visualization: '3D concept' | 'Static format study' };
export default function FormulaLab({ onBriefChange, diagnostics = false }: { onBriefChange?: (brief: FormulaBrief) => void; diagnostics?: boolean }) {
  const [formatId,setFormatId]=useState('capsule'),[outcomeId,setOutcomeId]=useState('daily');
  const [expanded,setExpanded]=useState(true),[paused,setPaused]=useState(false),[interactive,setInteractive]=useState(false),[copied,setCopied]=useState('');
  const format=dosageFormats.find(item=>item.id===formatId)!;
  const outcome=outcomes.find(item=>item.id===outcomeId)!;
  useEffect(()=>{onBriefChange?.({format:format.name,outcome:outcome.name,partnership:'OEM / ODM',visualization:format.model?'3D concept':'Static format study'});},[format,outcome,onBriefChange]);
  const brief='Jentoor concept brief\nFormat: '+format.name+'\nDirection: '+outcome.name+'\nPartnership: OEM / ODM';
  const chooseFormat=(id:string)=>{setFormatId(id);setInteractive(false);setExpanded(true);setPaused(false);setCopied('');};
  const copy=async()=>{try{await navigator.clipboard.writeText(brief);setCopied('Brief copied.');}catch{setCopied('Copy the text in the brief below.');}};
  return <section className={styles.lab} aria-label="Formula delivery lab">
    <div className={styles.controls}>
      <p className={styles.eyebrow}>02 / FORMULA DELIVERY LAB</p><h2>Your intent.<br/><em>Your format.</em></h2>
      <p className={styles.intro}>Choose the delivery system and product direction independently.</p>
      <div className={styles.formats} role="tablist" aria-label="Dosage format">{dosageFormats.map(item=><button role="tab" aria-selected={formatId===item.id} aria-controls="formula-view" id={'format-'+item.id} key={item.id} tabIndex={formatId===item.id?0:-1} onClick={()=>chooseFormat(item.id)} onKeyDown={event=>{
        const index=dosageFormats.findIndex(format=>format.id===item.id);
        const steps:Record<string,number>={ArrowRight:1,ArrowLeft:-1,ArrowDown:2,ArrowUp:-2};
        if (!(event.key in steps) && event.key!=='Home' && event.key!=='End') return;
        event.preventDefault(); const next=event.key==='Home'?0:event.key==='End'?dosageFormats.length-1:(index+steps[event.key]+dosageFormats.length)%dosageFormats.length;
        chooseFormat(dosageFormats[next].id); document.getElementById('format-'+dosageFormats[next].id)?.focus();
      }}>{item.name}<small>{item.model?'3D':'2D'}</small></button>)}</div>
      <label className={styles.goal}>PRODUCT DIRECTION<select value={outcomeId} onChange={event=>{setOutcomeId(event.target.value);setCopied('');}}>{outcomes.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <p className={styles.note}>Directions describe the development brief, not verified product claims.</p>
      <div className={styles.brief}><pre>{brief}</pre><button type="button" onClick={copy}>Copy concept brief ↗</button><span role="status">{copied}</span></div>
    </div>
    <div className={styles.stage} id="formula-view" role="tabpanel" aria-labelledby={'format-'+format.id}>
      <div className={styles.stageHead}><span>OEM / ODM · DELIVERY STUDY</span><span>{format.model?interactive?'3D CONCEPT':'STATIC DEVICE VIEW':'2D FORMAT STUDY'}</span></div>
      <div className={styles.canvas}>{format.model ? <DeferredProcessScene key={format.id} kind={format.model as SceneKind} expanded={expanded} paused={format.id==='capsule'?false:paused} accent={outcome.color} onModeChange={setInteractive} diagnostics={diagnostics}/> : <div className={styles.static}><FormatStill kind={format.id} accent={outcome.color}/></div>}</div>
      <div className={styles.caption}><span>{outcome.name} / {format.name}</span><h2>{format.name}</h2><p>{format.note}</p>
        {format.model && format.id!=='capsule' ? <fieldset disabled={!interactive}><button onClick={()=>setExpanded(!expanded)}>{expanded?'Bring elements together':'Explore the structure'}</button><button onClick={()=>setPaused(!paused)}>{paused?'Resume motion':'Pause motion'}</button></fieldset> : <p className={styles.mode}>{format.id==='capsule' ? 'Original capsule visual · drag to rotate on desktop' : 'Static format illustration · explore the delivery concept'}</p>}
      </div>
    </div>
  </section>;
}
