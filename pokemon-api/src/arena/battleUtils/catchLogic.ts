import { BASE_CATCH_CHANCE, LOW_LIFE_THRESHOLD_PERCENTAGE, MAX_CATCH_ATTEMPTS, LOW_LIFE_CATCH_CHANCE } from '../arenaConsts';

export function canCatch(catchAttempts: number): boolean {
  return catchAttempts < MAX_CATCH_ATTEMPTS;
}

export function calculateCatchChance(opponentCurrentLife: number, maxLife: number): number {
  const lowLifeThreshold = maxLife * LOW_LIFE_THRESHOLD_PERCENTAGE; 

 
  if (opponentCurrentLife <= lowLifeThreshold) {
    return LOW_LIFE_CATCH_CHANCE; 
  }

  return BASE_CATCH_CHANCE; 
}

export function attemptCatch(
  catchAttempts: number,
  opponentCurrentLife: number,
  maxLife: number,
): { success: boolean; updatedAttempts: number } {

  const chance = calculateCatchChance(opponentCurrentLife, maxLife); 
  const success = Math.random() < chance; 
  const updatedAttempts = catchAttempts + 1; 

  return { success, updatedAttempts };
}