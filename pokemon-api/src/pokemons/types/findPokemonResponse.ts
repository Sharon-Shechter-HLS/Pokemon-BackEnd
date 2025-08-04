import { Pokemon } from "../schemas/pokemonSchema";

export type FindPokemonsResult = {
  data: Pokemon[]; 
  meta: {
    start: number;
    end: number;
    total: { total: number }[]; 
  };
}