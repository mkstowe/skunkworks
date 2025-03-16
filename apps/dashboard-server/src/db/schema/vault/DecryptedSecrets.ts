// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { ColumnType, Selectable } from 'kysely';

/** Represents the view vault.decrypted_secrets */
export default interface DecryptedSecretsTable {
  id: ColumnType<string, never, never>;

  name: ColumnType<string, never, never>;

  description: ColumnType<string, never, never>;

  secret: ColumnType<string, never, never>;

  decrypted_secret: ColumnType<string, never, never>;

  key_id: ColumnType<string, never, never>;

  nonce: ColumnType<unknown, never, never>;

  created_at: ColumnType<Date, never, never>;

  updated_at: ColumnType<Date, never, never>;
}

export type DecryptedSecrets = Selectable<DecryptedSecretsTable>;
