import type { MetadataRoute } from 'next';
import { articles } from './insights/article-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://jentoor.com';
  const core = ['', '/oem-odm', '/technology', '/quality', '/case-studies/bterlif', '/insights'];
  return [
    ...core.map((route, index) => ({ url: `${base}${route}`, lastModified: new Date('2026-09-04'), changeFrequency: index === 0 ? 'weekly' as const : 'monthly' as const, priority: index === 0 ? 1 : .8 })),
    ...articles.map(article => ({ url: `${base}/insights/${article.slug}`, lastModified: new Date('2026-09-04'), changeFrequency: 'monthly' as const, priority: .7 })),
  ];
}
