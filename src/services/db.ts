import { Pool } from 'pg';
import { dbConfig } from '../config';

/**
 * @description Create a new connection pool to the database
 */
const pool = new Pool(dbConfig);

/**
 * @description Query the database
 * @param text The query text
 * @param params The query parameters
 * @returns The query result
 */
export const query = (text: string, params?: any[]) => pool.query(text, params);