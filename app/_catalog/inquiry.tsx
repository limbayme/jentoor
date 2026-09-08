'use client';
import { useSyncExternalStore } from 'react';
import { Check, Plus, ArrowUpRight } from 'lucide-react';
import { products } from './data';
const key = 'jentoor-inquiry-v1';
const event = 'jentoor-inquiry-change';
function subscribe(callback:()=>void) { window.addEventListener('storage',callback);window.addEventListener(event,callback);return ()=>{window.removeEventListener('storage',callback);window.removeEventListener(event,callback);}; }
function snapshot(){try{return localStorage.getItem(key)||'[]';}catch{return '[]';}}
export function useInquiry(){const raw=useSyncExternalStore(subscribe,snapshot,()=> '[]');let ids:string[]=[];try{const parsed:unknown=JSON.parse(raw);if(Array.isArray(parsed))ids=[...new Set(parsed.filter((id):id is string=>typeof id==='string'&&products.some(p=>p.id===id)))];}catch{}return ids;}
export function setInquiry(ids:string[]){try{localStorage.setItem(key,JSON.stringify(ids));window.dispatchEvent(new Event(event));return true;}catch{return false;}}
export function AddToInquiry({id,compact=false}:{id:string;compact?:boolean}){const ids=useInquiry();const added=ids.includes(id);const name=products.find(p=>p.id===id)?.name||'product';return <button className={`jt-add${added?' is-added':''}${compact?' is-compact':''}`} type="button" aria-label={added?`Remove ${name} from inquiry`:`Add ${name} to inquiry`} aria-pressed={added} onClick={()=>{if(!setInquiry(added?ids.filter(x=>x!==id):[...ids,id]))window.location.href=`/contact?product=${encodeURIComponent(id)}`;}}>{added?<Check size={16}/>:<Plus size={16}/>}<span>{added?'Selected':compact?'Inquire':'Add to inquiry'}</span></button>;}
export function InquiryLink(){const ids=useInquiry();return <a href="/contact">Inquiry{ids.length>0 && <span className="jt-inquiry-count">{ids.length}</span>}<ArrowUpRight size={15}/></a>;}
