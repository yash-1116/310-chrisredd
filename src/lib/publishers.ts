/**
 * Provides typed data-access helpers for querying game publishers.
 * The helpers accept an injectable Drizzle database client for use in pages
 * and tests.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';

/** Represents the publisher fields exposed by the data-access layer. */
export type Publisher = Pick<typeof publishers.$inferSelect, 'id' | 'name'>;

/**
 * Retrieves all publishers in alphabetical order by name.
 *
 * @param db - The injectable Drizzle database client.
 * @returns A promise resolving to the ordered list of publishers.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    return db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));
}