import { type Kysely } from 'kysely';
import Database from '../schema/Database';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('hass_card')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('type', 'text', (col) => col.notNull())
    .addColumn('entityId', 'text', (col) => col.notNull())
    .addColumn('icon', 'text')
    .addColumn('iconActive', 'text')
    .addColumn('lock', 'boolean', (col) => col.defaultTo(false))
    .addColumn('name', 'text')
    .addColumn('state', 'text')
    .addColumn('service', 'jsonb')
    .addColumn('stateOptions', 'jsonb')
    .addColumn('trackInSidebar', 'boolean', (col) => col.defaultTo(false))
    .ifNotExists()
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  db.schema.dropTable('hass_card').cascade().ifExists().execute();
}
