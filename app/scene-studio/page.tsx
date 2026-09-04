'use client';
import { useState } from 'react';
import DeferredProcessScene from '../components/process-scenes/deferred-scene';
import FormulaLab, { dosageFormats } from '../components/process-scenes/formula-lab';
import type { Station } from '../components/process-scenes/factory-modules';
import styles from './studio.module.css';

const stations: { id: Station; number: string; title: string; note: string; record: string }[] = [
  {id:'blend',number:'01',title:'Blend preparation',note:'A prepared blend enters the illustrative production route through the hopper and feed circuit.',record:'Input record / concept formula'},
  {id:'fill',number:'02',title:'Precision filling',note:'Carriers advance, pause at the filling station and continue as a coordinated batch.',record:'Process record / filling sequence'},
  {id:'inspect',number:'03',title:'Optical inspection',note:'A restrained scan band marks the conceptual inspection gate. No live quality measurement is shown.',record:'Review record / illustrative check'},
  {id:'pack',number:'04',title:'Pack & identify',note:'An articulated handling module and OEM / ODM cartons connect the unit to its packaging brief.',record:'Packaging record / concept artwork'},
];
export default function SceneStudio() {
  const [view,setView]=useState<'hero'|'formula'|'factory'>('hero');
  const [station,setStation]=useState<Station>('fill');
  const [paused,setPaused]=useState(false),[expanded,setExpanded]=useState(true),[interactive,setInteractive]=useState(false);
  const selected=stations.find(item=>item.id===station)!;
  return <main className={styles.studio}>
    <header className={styles.header}><a href="/">jentoor<span>®</span></a><span>PROCESS OBJECTS / DESIGN STUDIES</span><b>OEM / ODM</b></header>
    <nav className={styles.viewNav} aria-label="Design study">{([{id:'hero',name:'01 / DNA Hero'},{id:'formula',name:'02 / Formula Lab'},{id:'factory',name:'03 / Smart Manufacturing'}] as const).map(item=><button key={item.id} aria-pressed={view===item.id} onClick={()=>{setView(item.id);setPaused(false);setExpanded(true);}}>{item.name}<span>↗</span></button>)}</nav>
    {view==='formula' ? <FormulaLab diagnostics/> : <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <p className={styles.eyebrow}>{view==='hero'?'01 / HERO DIRECTION':'03 / CONCEPT DIGITAL TWIN'}</p>
        <h1>{view==='hero'?'Intelligence,':'Machines move.'}<br/><em>{view==='hero'?'in every form.':'Insight follows.'}</em></h1>
        <p className={styles.description}>{view==='hero'?'Evidence-led nutrition. Engineered to scale. A continuous double helix expresses the connection between research, formulation and manufacturing.':'Explore an illustrative production cell, from blend preparation through filling, inspection and packaging.'}</p>
        {view==='hero'?<div className={styles.notes}><span>DOUBLE HELIX / RESEARCH METAPHOR</span><h2>Two strands. One connected system.</h2><p>Continuous backbones and paired bridges rotate slowly in sculptural light. Drag to explore the structure.</p><p>The original capsule remains available in the Formula Lab.</p></div>:<>
          <div className={styles.selection} role="group" aria-label="Manufacturing station"><span>SELECT A WORKSTATION</span>{stations.map(item=><button key={item.id} aria-pressed={station===item.id} onClick={()=>setStation(item.id)}>{item.number}<b>{item.title}</b><span>↗</span></button>)}</div>
          <div className={styles.batch}><span>ILLUSTRATIVE BATCH / JT–DEMO–001</span><h2>{selected.title}</h2><p>{selected.note}</p><dl><dt>Selected record</dt><dd>{selected.record}</dd><dt>Product route</dt><dd>Bottle / OEM + ODM concept</dd></dl></div>
        </>}
        <p className={styles.disclaimer}>{view==='hero'?'DNA is a visual metaphor for research, not an ingredient or a claim about genetic effects.':'Concept simulation only. These are illustrative process states, not live factory data, verified output or quality metrics.'}</p>
      </aside>
      <section className={styles.stage} aria-label={view==='hero'?'DNA Hero concept':'Smart manufacturing concept'}>
        <div className={styles.stageTop}><span>JENTOOR / {view==='hero'?'RESEARCH IN MOTION':'PROCESS ATELIER'}</span><span className={styles.live}>{view==='hero'?'HERO CONCEPT':'CONCEPT SIMULATION'}</span></div>
        <div className={styles.canvas}><DeferredProcessScene key={view} kind={view==='hero'?'dna':'factory'} presentation={view==='hero'?'hero':'object'} expanded={expanded} accent="#d9ff6b" paused={paused} station={station} onStationSelect={setStation} onModeChange={setInteractive} diagnostics/></div>
        <div className={styles.annotation} aria-live="polite"><span>{view==='hero'?'CONNECTED BACKBONES / PAIRED STRUCTURE':selected.number+' / '+selected.title.toUpperCase()}</span><b>{view==='hero'?'From first principles to finished form.':'A visible path through the process.'}</b></div>
        <fieldset className={styles.controls} disabled={!interactive} aria-label="Scene controls">{view==='factory'&&<button onClick={()=>setExpanded(!expanded)}>{expanded?'Lower filling head':'Lift filling head'} ↗</button>}<button onClick={()=>setPaused(!paused)}>{paused?'Resume motion':'Pause motion'}</button></fieldset>
        <p className={styles.drag}>{interactive?'DRAG TO ROTATE · SCROLL TO CONTINUE':'STATIC DEVICE VIEW · LIGHTWEIGHT ILLUSTRATION'}</p>
      </section>
    </div>}
    <section className={styles.formats} aria-label="Supported dosage formats"><div><p>09 / DELIVERY FORMATS</p><h2>One brief.<br/><em>More possibilities.</em></h2><span>Development and manufacturing routes are tailored to each format.</span></div><ol>{dosageFormats.map((format,index)=><li key={format.id}><span>{String(index+1).padStart(2,'0')}</span>{format.name}</li>)}</ol></section>
    <footer className={styles.footer}><span>FROM FORMULA INTENT TO FINISHED FORM</span><span>JENTOOR / RESEARCH & DEVELOPMENT</span><span>DESIGN CONCEPTS</span></footer>
  </main>;
}
