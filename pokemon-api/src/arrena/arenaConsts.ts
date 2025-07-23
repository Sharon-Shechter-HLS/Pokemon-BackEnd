export const USER_ID_REQUIRED = 'userId is required';
export const USER_ID_MUST_BE_INTEGER = 'userId must be an integer';

export const POKEMON_ID_REQUIRED = 'pokemonId is required';
export const POKEMON_ID_MUST_BE_INTEGER = 'pokemonId must be an integer';

export enum Turn {
  USER = 'user',
  OPPONENT = 'opponent',
}

//catchLogic.ts
export const BASE_CATCH_CHANCE = 0.1; 
export const LOW_LIFE_THRESHOLD_PERCENTAGE = 0.25; 
export const MAX_CATCH_ATTEMPTS = 3; 
export const LOW_LIFE_CATCH_CHANCE = 0.25; 

//atack Logic.ts
export const BASE_DAMAGE_MULTIPLIER = 0.25;
export const RANDOM_DAMAGE_MULTIPLIER = 0.05;
export const MIN_DAMAGE = 1;
export const DAMAGE_CHANCE_THRESHOLD = 0.2;
export const DAMAGE_CALCULATION_DELAY = 200; 