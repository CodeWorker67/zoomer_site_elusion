import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const publicDir = resolve(root, 'public');

/** Публичные страницы для индексации (без ЛК, checkout и редиректов). */
const SITEMAP_PATHS = [
  '/',
  '/happ',
  '/happ/free',
  '/happ/telegram',
  '/happ/vpn',
  '/happ/download',
  '/incy-vpn',
  '/privacy',
  '/terms',
];

function loadDomen() {
  const fromProcess = process.env.DOMEN?.trim();
  if (fromProcess) return normalizeOrigin(fromProcess);

  try {
    const envText = readFileSync(resolve(root, '.env'), 'utf8');
    for (const line of envText.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      if (key !== 'DOMEN') continue;
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"'))
        || (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      return normalizeOrigin(value);
    }
  } catch {
    // .env may be missing in CI — set DOMEN in the environment
  }

  throw new Error('DOMEN не задан: добавьте DOMEN=... в .env или переменные окружения');
}

function normalizeOrigin(raw) {
  const value = String(raw).trim().replace(/\/+$/, '');
  if (!value) throw new Error('DOMEN пустой');
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function pathToLoc(origin, pathname) {
  if (pathname === '/') return `${origin}/`;
  return `${origin}${pathname}`;
}

function buildSitemap(origin) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = SITEMAP_PATHS.map((path) => {
    const loc = pathToLoc(origin, path);
    const priority = path === '/' ? '1.0' : '0.8';
    const changefreq = path === '/' ? 'weekly' : 'monthly';
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots(origin) {
  const sitemapUrl = `${origin}/sitemap.xml`;
  return `User-agent: *
Allow: /

Disallow: /auth/
Disallow: /onboarding
Disallow: /profile
Disallow: /dashboard/
Disallow: /checkout
Disallow: /success

Sitemap: ${sitemapUrl}
`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const origin = loadDomen();
mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, 'sitemap.xml'), buildSitemap(origin), 'utf8');
writeFileSync(resolve(publicDir, 'robots.txt'), buildRobots(origin), 'utf8');
console.log(`SEO: sitemap.xml и robots.txt → ${origin}`);
