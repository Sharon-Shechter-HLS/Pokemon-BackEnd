export const DEFAULT_PAGE = 1;
export const DEFAULT_ROWS_PER_PAGE = 10;
export const POKEMON_MODEL_NAME = 'Pokemon';
export const DEFAULT_SEARCH_TEXT = '';

export const SORT_BY_OPTIONS = [
  'name.english-asc',
  'name.english-desc',
  'base.Attack-asc',
  'base.Attack-desc',
  'base.HP-asc',
  'base.HP-desc',
] as const;

export const SORT_BY_VALIDATION_MESSAGE =
  'sortBy must be one of: name.english-asc, name.english-desc, base.Attack-asc, base.Attack-desc, base.HP-asc, base.HP-desc';

export enum SortKey {
  HP = 'base.HP',
  Attack = 'base.Attack',
  Defense = 'base.Defense',
  Speed = 'base.Speed',
  Name = 'name.english',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}
