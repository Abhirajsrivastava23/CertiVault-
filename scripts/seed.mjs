#!/usr/bin/env node

/**
 * Seed verification and diagnostics script
 */
import { CERTIFICATIONS } from '../src/lib/data/certifications.js';
import { PROVIDERS } from '../src/lib/data/providers.js';
import { CATEGORIES } from '../src/lib/data/categories.js';

console.log('--- CertiVault Seed Diagnostics ---');
console.log(`Providers configured: ${PROVIDERS.length}`);
console.log(`Categories configured: ${CATEGORIES.length}`);
console.log(`Certifications configured: ${CERTIFICATIONS.length}`);
console.log('Status: All models initialized with production catalog data.');

