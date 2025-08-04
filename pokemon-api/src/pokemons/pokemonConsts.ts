export const DEFAULT_PAGE = 1;
export const DEFAULT_ROWS_PER_PAGE = 10;
export const POKEMON_MODEL_NAME = 'Pokemon';
export const USER_MODEL_NAME = 'User';
export const DEFAULT_SEARCH_TEXT = '';

// Field names
export const USER_POKEMONS_COLLECTION_FIELD = 'userPokemonsCollection';
export const NAME_ENGLISH_FIELD = 'name.english';

// Regex options
export const REGEX_OPTIONS = 'i';

export const SORT_BY_OPTIONS = [
  'name.english-asc',
  'name.english-desc',
  'base.Attack-asc',
  'base.Attack-desc',
  'base.HP-asc',
  'base.HP-desc',
  'id-asc', 
] as const;

export const SORT_BY_VALIDATION_MESSAGE =
  'sortBy must be one of: name.english-asc, name.english-desc, base.Attack-asc, base.Attack-desc, base.HP-asc, base.HP-desc, id-asc, id-desc';

// Error messages
export const ERROR_USER_ID_REQUIRED = 'User ID must be provided when "fromMy" is true.';
export const ERROR_FAILED_TO_FETCH_POKEMONS = 'Failed to fetch pokemons. Please check your request.';
export const ERROR_FAILED_TO_FETCH_RANDOM_POKEMON = 'Failed to fetch a random pokemon.';
export const ERROR_POKEMON_NOT_FOUND = (id: number) => `Pokemon with ID ${id} not found`;
export const NO_USER_FOUND_ERROR = 'User not found';
export const EMPTY_COLLECTION_ERROR = 'User has no Pokémon in their collection';
export const ERROR_USERID_MOST_BE_STRING = 'userId is required and must be a string';



export enum SortKey {
  HP = 'base.HP',
  Attack = 'base.Attack',
  Defense = 'base.Defense',
  Speed = 'base.Speed',
  Name = 'name.english',
  Id = 'id', 
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export const SORT_BY_MAPPING: Record<string, { key: SortKey; order: SortOrder }> = {
  'name.english-asc': { key: SortKey.Name, order: SortOrder.Asc },
  'name.english-desc': { key: SortKey.Name, order: SortOrder.Desc },
  'base.Attack-asc': { key: SortKey.Attack, order: SortOrder.Asc },
  'base.Attack-desc': { key: SortKey.Attack, order: SortOrder.Desc },
  'base.HP-asc': { key: SortKey.HP, order: SortOrder.Asc },
  'base.HP-desc': { key: SortKey.HP, order: SortOrder.Desc },
  'id-asc': { key: SortKey.Id, order: SortOrder.Asc }, 
};
