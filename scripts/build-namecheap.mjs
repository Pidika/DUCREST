import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const nextCli = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const result = spawnSync(process.execPath, [nextCli, 'build', '--webpack'], {
  stdio: 'inherit',
  env: { ...process.env, DEPLOY_TARGET: 'namecheap' },
});

if (result.error) throw result.error;
if ((result.status ?? 1) !== 0) process.exit(result.status ?? 1);

const standalone = fileURLToPath(new URL('../.next/standalone/', import.meta.url));
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const staticDir = fileURLToPath(new URL('../.next/static/', import.meta.url));
if (!existsSync(standalone)) throw new Error('Next.js did not produce the standalone server.');
cpSync(publicDir, `${standalone}/public`, { recursive: true });
mkdirSync(`${standalone}/.next`, { recursive: true });
cpSync(staticDir, `${standalone}/.next/static`, { recursive: true });
rmSync(`${standalone}/.env`, { force: true });
console.log('Namecheap bundle prepared in .next/standalone');
