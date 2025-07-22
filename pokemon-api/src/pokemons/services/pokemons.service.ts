import { Injectable } from '@nestjs/common';
import { PokemonsRepository } from '../repositories/pokemons.repository';

@Injectable()
export class PokemonsService {
  constructor(private readonly pokemonsRepository: PokemonsRepository) {}

  async getPokemons(
    page: number,
    rowsPerPage: number,
    sortBy?: string,
    search?: string,
    fromMy?: boolean,
    userId?: number, 
  ) {
    let sort: { key: string; order: 'asc' | 'desc' } | undefined;

    if (sortBy) {
      const [key, order] = sortBy.split('-') as [string, 'asc' | 'desc'];
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
