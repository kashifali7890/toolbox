// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolbox-utils.com';

  // List your main pages
  const pages = [
    '', // Homepage
    '/about',
    '/contact',
    '/tools', // Directory page
    '/privacy',
    '/terms',
    '/disclaimer',
  ];

  // List your specific tool pages
  const tools = [
    '/tools/word-unscrambler',
    '/tools/merge-pdf',
    '/tools/compress-pdf',
    '/tools/password-generator',
    '/tools/qr-code-generator',
    '/tools/word-counter',
    '/tools/case-converter',
    '/tools/image-compressor',
    '/tools/url-shortener',
    '/tools/lorem-ipsum',
    '/tools/json-formatter',
    '/tools/age-calculator',
  ];

  const routes = [...pages, ...tools].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}