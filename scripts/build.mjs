import { build } from 'esbuild';
import { mkdir, copyFile, writeFile, readFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
const common = { bundle: true, target: 'es2020', legalComments: 'inline', sourcemap: true };
for (const [format, extension] of [['esm', 'mjs'], ['cjs', 'cjs']]) {
  await build({ ...common, entryPoints: ['src/core.js'], outfile: `dist/justFlipIt.${extension}`, format,
    footer: format === 'cjs' ? { js: 'module.exports = Object.assign(module.exports.default, module.exports);' } : undefined });
  for (const name of ['react', 'vue', 'svelte', 'agent']) await build({ ...common, entryPoints: [`src/adapters/${name}.js`], outfile: `dist/${name}.${extension}`, format, external: ['react', '@simhub2/justflipit'] });
}
for (const minify of [false, true]) {
  const suffix = minify ? '.min.js' : '.js';
  await build({ ...common, entryPoints: ['src/core.js'], outfile: `dist/justFlipIt${suffix}`, format: 'iife', globalName: 'JustFlipItModule', minify, footer: { js: 'globalThis.justFlipIt = JustFlipItModule.default;' } });
  for (const name of ['modern', 'vanilla', 'combined']) await copyFile(`dist/justFlipIt${suffix}`, `dist/justFlipIt-${name}${suffix}`);
}
await copyFile('src/justFlipIt.d.ts', 'dist/justFlipIt.d.ts');
for (const name of ['react', 'vue', 'svelte', 'agent']) await copyFile(`src/adapters/${name}.d.ts`, `dist/${name}.d.ts`);
// Historical type location for consumers using explicit paths.
await mkdir('dist/types', { recursive: true });
await copyFile('src/justFlipIt.d.ts', 'dist/types/justFlipIt.d.ts');
console.log('Built ESM, CommonJS, browser bundles and framework adapters.');

for (const name of ['justFlipIt', 'react', 'vue', 'svelte', 'agent']) {
  const declaration = await readFile(`dist/${name}.d.ts`, 'utf8');
  await writeFile(`dist/${name}.d.mts`, declaration.replaceAll("'./justFlipIt'", "'./justFlipIt.mjs'"));
  await writeFile(`dist/${name}.d.cts`, name === 'justFlipIt'
    ? "import type Core from './justFlipIt.mjs';\nimport type { FlipController } from './justFlipIt.mjs';\ndeclare const justFlipIt: typeof Core & { FlipController: typeof FlipController; default: typeof Core };\nexport = justFlipIt;\n"
    : declaration.replaceAll("'./justFlipIt'", "'./justFlipIt.mjs'"));
}
