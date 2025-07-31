import {
  BASE_DAMAGE_MULTIPLIER,
  RANDOM_DAMAGE_MULTIPLIER,
  MIN_DAMAGE,
} from '../arenaConsts';

export function calculateNewLife(
  power: number,
  currentLife: number,
  maxLife: number
): number {
  const baseDamage = (power / 100) * (maxLife * BASE_DAMAGE_MULTIPLIER);
  const randomFactor = Math.random() * (maxLife * RANDOM_DAMAGE_MULTIPLIER);
  const damage = Math.max(MIN_DAMAGE, Math.round(baseDamage + randomFactor));
  const newLife = Math.max(0, currentLife - damage); 

  return newLife;
}