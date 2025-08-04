export type PokemonName = {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
};

export type PokemonBaseStats = {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp. Attack': number;
  'Sp. Defense': number;
  Speed: number;
};

export type PokemonImage = {
  sprite: string;
  thumbnail: string;
  hires: string;
};
export type SortOrder = "asc" | "desc";

export type Sort = {
  key: string;
  order: SortOrder;
};