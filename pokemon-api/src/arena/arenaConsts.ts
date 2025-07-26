// Error Messages
export const USER_ID_REQUIRED = 'userId is required';
export const USER_ID_MUST_BE_STRING = 'userId must be a string';
export const POKEMON_ID_REQUIRED = 'pokemonId is required';
export const POKEMON_ID_MUST_BE_STRING = 'pokemonId must be a string';
export const USER_NOT_FOUND = 'User not found';
export const USER_POKEMON_NOT_FOUND = 'User Pokémon not found';
export const OPPONENT_POKEMON_NOT_FOUND = 'Opponent Pokémon not found';
export const FAILED_TO_START_GAME = 'Failed to start game';
export const GAME_NOT_FOUND = 'Game not found';

export const GAME_ID_REQUIRED = 'gameId is required';
export const GAME_ID_MUST_BE_STRING = 'gameId must be a string';


// Catch Logic Constants
export const BASE_CATCH_CHANCE = 0.1; 
export const LOW_LIFE_THRESHOLD_PERCENTAGE = 0.25; 
export const MAX_CATCH_ATTEMPTS = 3; 
export const LOW_LIFE_CATCH_CHANCE = 0.25; 

export enum Turn {
  USER = 'user',
  OPPONENT = 'opponent',
}

//atack Logic.ts
export const BASE_DAMAGE_MULTIPLIER = 0.25;
export const RANDOM_DAMAGE_MULTIPLIER = 0.05;
export const MIN_DAMAGE = 1;
export const DAMAGE_CHANCE_THRESHOLD = 0.2;
export const DAMAGE_CALCULATION_DELAY = 200; 


export enum Winner {
  User = 'User',
  Opponent = 'Opponent',
  None = 'None',

}

