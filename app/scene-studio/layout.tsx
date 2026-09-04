import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Process Objects | Jentoor Design Studio', description: 'Local design studies for tablet engineering, formula intelligence and connected manufacturing.', robots: { index: false, follow: false } };
export default function StudioLayout({ children }: { children: React.ReactNode }) { return children; }
