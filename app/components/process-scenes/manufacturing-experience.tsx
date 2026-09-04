
'use client';
import { useState } from 'react';
import DeferredProcessScene from './deferred-scene';
import type { Station } from './factory-modules';
import styles from './manufacturing-experience.module.css';
const stations: { id: Station; number: string; title: string; note: string; record: string }[] = [
  {id:'blend',number:'01',title:'Blend preparation',note:'A prepared blend enters the illustrative production route through the hopper and feed circuit.',record:'Input record / concept formula'},
  {id:'fill',number:'02',title:'Precision filling',note:'Carriers advance, pause at the filling station and continue as a coordinated batch.',record:'Process record / filling sequence'},
  {id:'inspect',number:'03',title:'Optical inspection',note:'A restrained scan band marks the conceptual inspection gate. No live quality measurement is shown.',record:'Review record / illustrative check'},
  {id:'pack',number:'04',title:'Pack & identify',note:'An articulated handling module and OEM / ODM cartons connect the unit to its packaging brief.',record:'Packaging record / concept artwork'},
];
export default function ManufacturingExperience() {
  const [station,setStation]=useState<Station>('fill');
  const [paused,setPaused]=useState(false),[expanded,setExpanded]=useState(true),[interactive,setInteractive]=useState(false);
  const selected=stations.find(item=>item.id===station)!;
  return <section className={styles.experience} aria-label="Interactive manufacturing process">
    <div className={styles.copy}>
      <p className={styles.eyebrow}>SMART MANUFACTURING / PROCESS STUDY</p>
      <h3>Follow the process.<br/><em>See the connection.</em></h3>
      <p>Explore the steps that connect formulation, filling, inspection and packaging.</p>
      <div className={styles.stations} role="group" aria-label="Manufacturing station">{stations.map(item=><button key={item.id} aria-pressed={station===item.id} onClick={()=>setStation(item.id)}><span>{item.number}</span>{item.title}<span>↗</span></button>)}</div>
      <div className={styles.record} aria-live="polite"><small>ILLUSTRATIVE BATCH / JT–DEMO–001</small><h4>{selected.title}</h4><p>{selected.note}</p><span>{selected.record}</span></div>
      <p className={styles.disclaimer}>Concept simulation. Illustrative process states, not live factory data or quality measurements.</p>
    </div>
    <div className={styles.stage}>
      <div className={styles.stageHead}><span>JENTOOR / PROCESS ATELIER</span><span>CONCEPT SIMULATION</span></div>
      <div className={styles.canvas}><DeferredProcessScene kind="factory" expanded={expanded} accent="#d9ff6b" paused={paused} station={station} onStationSelect={setStation} onModeChange={setInteractive}/></div>
      <div className={styles.caption}><span>{selected.number} / {selected.title.toUpperCase()}</span><p>A visible path through the process.</p><fieldset disabled={!interactive}><button onClick={()=>setExpanded(!expanded)}>{expanded?'Lower filling head':'Lift filling head'} ↗</button><button onClick={()=>setPaused(!paused)}>{paused?'Resume motion':'Pause motion'}</button></fieldset><small>{interactive?'DRAG TO ROTATE · SELECT A WORKSTATION':'STATIC DEVICE VIEW · SELECT A WORKSTATION'}</small></div>
    </div>
  </section>;
}
