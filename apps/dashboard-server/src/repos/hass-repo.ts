import { db } from '../db';
import { HassCardId } from '../db/schema/public/HassCard';

export async function getCards() {
  return await db.selectFrom('hass_card').selectAll().execute();
}

export async function getCardById(id: number | HassCardId) {
    return id;
}
