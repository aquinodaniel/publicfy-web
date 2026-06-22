/** @type {import('next').NextConfig} */

// Build estático para hospedagem Apache em lp.auroraengenharia.com/imersao.
// Ativado por `BUILD_TARGET=static` (ver script `build:static`); o `next dev`
// continua normal na raiz (localhost:3000) quando a env não está setada.
const isStaticExport = process.env.BUILD_TARGET === 'static';

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport && {
    output: 'export',
    basePath: '/imersao',
    assetPrefix: '/imersao/',
    images: { unoptimized: true },
    trailingSlash: true,
    // Exposto ao client p/ prefixar <img src> absolutos (ver lib/asset.ts).
    env: { NEXT_PUBLIC_ASSET_PREFIX: '/imersao' }
  })
};

export default nextConfig;
