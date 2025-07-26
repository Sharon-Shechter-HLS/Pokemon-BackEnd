// Error Messages
export const USER_ID_REQUIRED = 'userId is required';
export const USER_ID_MUST_BE_STRING = 'userId must be a string';
export const POKEMON_ID_REQUIRED = 'pokemonId is required';
export const POKEMON_ID_MUST_BE_STRING = 'pokemonId must be a string';
export const USER_NOT_FOUND = 'User not found';
export const USER_POKEMON_NOT_FOUND = 'User Pokémon not found';
export const OPPONENT_POKEMON_NOT_FOUND = 'Opponent Pokémon not found';
export const FAILED_TO_START_GAME = 'Failed to start game';
export enum Turn {
  USER = 'user',
  OPPONENT = 'opponent',
}

export enum Winner {
  User = 'User',
  Opponent = 'Opponent',
  None = 'None',

}

