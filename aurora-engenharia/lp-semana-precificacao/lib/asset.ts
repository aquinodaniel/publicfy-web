// ============================================================
// Prefixo de assets públicos para deploy em subpasta (/imersao).
// O Next prefixa sozinho _next/, next/image e next/link com o basePath,
// mas NÃO reescreve caminhos absolutos literais em <img src="/...">.
// Em dev e na Vercel (raiz) NEXT_PUBLIC_ASSET_PREFIX é vazio → caminho intacto.
// No build estático (BUILD_TARGET=static) vale "/imersao" (ver next.config.mjs).
// ============================================================
export const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';

export function asset(path: string): string {
  return `${ASSET_PREFIX}${path}`;
}
