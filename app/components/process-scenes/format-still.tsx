'use client';
export default function FormatStill({ kind, accent = '#d9ff6b' }: { kind: string; accent?: string }) {
  return <svg viewBox="0 0 500 360" style={{width:'100%',height:'100%',maxWidth:580}} role="img" aria-label={kind + ' static format study'}>
    <ellipse cx="250" cy="282" rx="168" ry="43" fill="#09281f" stroke="#94afa2" />
    {kind === 'capsule' || kind === 'softgel' ? <g transform="rotate(-28 250 180)"><rect x="198" y="75" width="104" height="210" rx="52" fill="#dce5c5"/><path d="M198 180V127a52 52 0 0 1 104 0v53Z" fill={accent}/><path d="M198 180h104" stroke="#758f70" strokeWidth="2" />{kind==='softgel' && <rect x="206" y="83" width="88" height="194" rx="44" fill={accent} opacity=".55"/>}</g>
    : kind==='film' ? <g><path d="M125 225l193-26 56 70-193 26Z" fill="#f4f1df"/><path d="M146 142q85 24 175-15l34 81q-74 42-178 9Z" fill={accent} opacity=".9"/><path d="M158 250l173-22" stroke="#94afa2" /></g>
    : kind==='gummy' ? <g><rect x="175" y="105" width="146" height="149" rx="42" fill="#7d9639"/><rect x="175" y="93" width="146" height="144" rx="42" fill={accent}/><path d="M197 128q0-14 20-16" stroke="#f4f1df" strokeWidth="7" fill="none" strokeLinecap="round"/></g>
    : kind==='powder' ? <g><path d="M185 91h131l19 187H166Z" fill="#f4f1df"/><path d="M180 144h140l5 61H175Z" fill={accent}/><path d="M191 102h119" stroke="#94afa2" strokeWidth="5"/><path d="M341 274l20-24 28 24Z" fill="#e9edcf"/></g>
    : kind==='liquid' ? <g><path d="M224 82h52v47q37 20 37 46v101H187V175q0-26 37-46Z" fill="#f4f1df"/><path d="M216 77h68v28h-68Z" fill={accent}/><path d="M188 192h124v59H188Z" fill="#153d30"/><text x="250" y="229" textAnchor="middle" fill={accent} fontSize="22">JT</text></g>
    : <g><ellipse cx="250" cy="209" rx={kind==='lozenge'?104:87} ry="52" fill="#a5b78d"/><path d={kind==='lozenge'?'M146 192v18a104 52 0 0 0 208 0v-18':'M163 192v18a87 52 0 0 0 174 0v-18'} fill="#a5b78d"/><ellipse cx="250" cy="189" rx={kind==='lozenge'?104:87} ry="52" fill={accent}/><path d="M206 180l82 18" stroke="#718754" strokeWidth="3"/></g>}
    <text x="250" y="326" fill="#d9ff6b" fontSize="11" fontFamily="monospace" textAnchor="middle">JENTOOR / FORMAT DEVELOPMENT</text>
  </svg>;
}
