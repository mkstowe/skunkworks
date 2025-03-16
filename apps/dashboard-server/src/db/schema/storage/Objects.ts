// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { BucketsId } from './Buckets';
import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

/** Identifier type for storage.objects */
export type ObjectsId = string & { __brand: 'ObjectsId' };

/** Represents the table storage.objects */
export default interface ObjectsTable {
  id: ColumnType<ObjectsId, ObjectsId | undefined, ObjectsId>;

  bucket_id: ColumnType<BucketsId | null, BucketsId | null, BucketsId | null>;

  name: ColumnType<string | null, string | null, string | null>;

  /** Field is deprecated, use owner_id instead */
  owner: ColumnType<string | null, string | null, string | null>;

  created_at: ColumnType<Date | null, Date | string | null, Date | string | null>;

  updated_at: ColumnType<Date | null, Date | string | null, Date | string | null>;

  last_accessed_at: ColumnType<Date | null, Date | string | null, Date | string | null>;

  metadata: ColumnType<unknown | null, unknown | null, unknown | null>;

  path_tokens: ColumnType<string[] | null, never, never>;

  version: ColumnType<string | null, string | null, string | null>;

  owner_id: ColumnType<string | null, string | null, string | null>;

  user_metadata: ColumnType<unknown | null, unknown | null, unknown | null>;
}

export type Objects = Selectable<ObjectsTable>;

export type NewObjects = Insertable<ObjectsTable>;

export type ObjectsUpdate = Updateable<ObjectsTable>;
