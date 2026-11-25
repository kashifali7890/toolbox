   // src/app/robots.ts
   import { MetadataRoute } from 'next';

   export default function robots(): MetadataRoute.Robots {
     return {
       rules: {
         userAgent: '*',
         allow: '/',
         disallow: '/api/', // Blocks bots from crawling any backend API routes
       },
       sitemap: 'https://toolbox-utils.com/sitemap.xml',
     };
   }