// src/load-env.ts
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log('DATABASE_URL loaded:', process.env.DATABASE_URL?.substring(0, 50) + '...');