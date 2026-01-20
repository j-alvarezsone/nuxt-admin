#!/usr/bin/env node

// Helper to run `pnpm exec prisma migrate dev --name <unique-name>`
// Usage:
//   pnpm migrate product-name
//   pnpm run migrate -- product-name
//   pnpm run migrate -- --name product-name
// Options:
//   --verbose    Show informational messages (default: silent)
// Examples:
//   pnpm migrate product-name
//   pnpm migrate --verbose product-name

import { spawnSync } from 'child_process';

function sanitizeName(name) {
  if (!name) return '';
  // Replace non-alphanumeric characters with dashes and collapse multiple dashes
  return name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getNameFromNpmConfigArgv() {
  try {
    const raw = process.env.npm_config_argv;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const args = parsed && parsed.original ? parsed.original : [];
    for (const a of args) {
      if (typeof a === 'string' && !a.startsWith('--') && a !== 'run' && a !== 'run-script') {
        return a;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function parseArgs() {
  const argv = process.argv.slice(2);
  let name = null;
  let verbose = false;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--') {
      if (i + 1 < argv.length) { name = argv[i + 1]; break; }
    }
    if (a === '--verbose' || a === '-v') { verbose = true; continue; }
    if (a === '--silent') { verbose = false; continue; }
    if (a.startsWith('--name=')) { name = a.split('=')[1]; break; }
    if (a === '--name') { if (i + 1 < argv.length) { name = argv[i + 1]; break; } }
  }

  if (!name) {
    // fallback to first positional arg (ignoring flags)
    for (const a of argv) {
      if (!a.startsWith('-')) { name = a; break; }
    }
  }

  if (!name) {
    name = getNameFromNpmConfigArgv();
  }

  return { name, verbose };
}

const { name: rawName, verbose } = parseArgs();
let base = sanitizeName(rawName || 'migration');
if (!base) base = 'migration';

// Append timestamp to guarantee uniqueness
const now = new Date();
const ts = now.toISOString().replace(/[-:TZ.]/g, '').slice(0,14); // YYYYMMDDhhmmss
const migrationName = `${base}-${ts}`;

if (verbose) process.stdout.write(`Creating migration with name: ${migrationName}\n`);

const args = ['exec', 'prisma', 'migrate', 'dev', '--name', migrationName];

const r = spawnSync('pnpm', args, { stdio: 'inherit' });
if (r.error) {
  process.stderr.write(`Failed to run pnpm: ${r.error}\n`);
  process.exit(1);
}
if (r.status !== 0) process.exit(r.status);

if (verbose) process.stdout.write('Migration complete.\n');
