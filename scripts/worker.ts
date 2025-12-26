#!/usr/bin/env node
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { convertRepoToMVP } from '../services/geminiService.js';
import type { FileData } from '../types.js';

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

async function collectFiles(dir: string, exts = ['.ts','.tsx','.js','.jsx','.json','.md','.html','.css','.txt']): Promise<FileData[]> {
  const out: FileData[] = [];
  async function walk(p: string) {
    const entries = await fs.readdir(p, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(p, e.name);
      if (e.isDirectory()) {
        if (e.name === 'node_modules' || e.name === '.git') continue;
        await walk(full);
      } else {
        if (exts.includes(path.extname(e.name))) {
          try {
            const content = await fs.readFile(full, 'utf8');
            out.push({ name: path.relative(process.cwd(), full), content, type: path.extname(e.name) || 'file' });
          } catch (err) {
            // skip unreadable files
          }
        }
      }
    }
  }
  await walk(dir);
  return out;
}

(async () => {
  try {
    const files = await collectFiles(root);
    if (files.length === 0) {
      console.error('No files found to analyze. Pass a path like `npm run worker -- ./path/to/repo`');
      process.exit(1);
    }

    console.log(`Collected ${files.length} files from ${root}. Sending to Gemini...`);
    const result = await convertRepoToMVP(files);
    console.log('\n=== Gemini result ===\n');
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Worker failed:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
})();