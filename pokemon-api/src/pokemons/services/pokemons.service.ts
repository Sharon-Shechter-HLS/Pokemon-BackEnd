import { Injectable } from '@nestjs/common';
import { PokemonsRepository } from '../repositories/pokemons.repository';
import { SortKey, SortOrder } from '../pokemonConsts';

@Injectable()
export class PokemonsService {
  constructor(private readonly pokemonsRepository: PokemonsRepository) {}

  async getPokemons(
    page: number,
    rowsPerPage: number,
    sortBy?: string,
    search?: string,
    fromMy?: boolean,
    userId?: string, 
  ) {
    let sort: { key: SortKey; order: SortOrder } | undefined;

    if (sortBy) {
      const [key, order] = sortBy.split('-') as [SortKey, SortOrder]; 
      sort = { key, order };
    }

    return this.pokemonsRepository.findPokemons({
      page,
      rowsPerPage,
      sort,
      search,
      fromMy,
      userId, 
    });
  }

  async getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; 
    return this.pokemonsRepository.findPokemonById(randomId); 
  }
}