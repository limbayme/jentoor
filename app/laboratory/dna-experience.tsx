'use client';
import { useState } from 'react';
import DeferredProcessScene from '../components/process-scenes/deferred-scene';
import s from '../_experiences/page.module.css';
export default function DnaExperience(){const [paused,setPaused]=useState(false);const [interactive,setInteractive]=useState(false);return <div><div className={s.dna}><DeferredProcessScene kind="dna" presentation="hero" expanded accent="#d9ff6b" paused={paused} onModeChange={setInteractive}/></div><div className={s.controls}><span>{interactive?'Drag to explore · research concept':'Research concept · static device view'}</span>{interactive&&<button onClick={()=>setPaused(!paused)}>{paused?'Resume motion':'Pause motion'}</button>}</div></div>;}
