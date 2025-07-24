import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PokemonsRepository } from '../repositories/pokemons.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/userSchema';
import { SortKey, SortOrder, ERROR_USER_ID_REQUIRED, ERROR_FAILED_TO_FETCH_POKEMONS, ERROR_FAILED_TO_FETCH_RANDOM_POKEMON, SORT_BY_MAPPING, SORT_BY_VALIDATION_MESSAGE } from '../pokemonConsts';

@Injectable()
export class PokemonsService {
  constructor(
    private readonly pokemonsRepository: PokemonsRepository,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getPokemons(
    page: number,
    rowsPerPage: number,
    sortBy?: string,
    search?: string,
    fromMy?: boolean,
    userId?: string,
  ) {
    try {
      if (fromMy && !userId) {
        throw new BadRequestException(ERROR_USER_ID_REQUIRED);
      }

      let sort: { key: SortKey; order: SortOrder } | undefined;
      if (sortBy) {
        const sortMapping = SORT_BY_MAPPING[sortBy];
        if (!sortMapping) {
          throw new BadRequestException(SORT_BY_VALIDATION_MESSAGE); 
        }
        sort = sortMapping;
      }

      return await this.pokemonsRepository.findPokemons({
        page,
        rowsPerPage,
        sort,
        search,
        fromMy,
        userId,
      });
    } catch (error) {
      console.error('Error fetching pokemons:', error.message);
      throw new BadRequestException(ERROR_FAILED_TO_FETCH_POKEMONS);
    }
  }

  async getRandomPokemon() {
    try {
      const pokemon = await this.pokemonsRepository.findRandomPokemon(); 

      if (!pokemon) {
        throw new NotFoundException(ERROR_FAILED_TO_FETCH_RANDOM_POKEMON);
      }

      return pokemon;
    } catch (error) {
      console.error('Error fetching random pokemon:', error.message);
      throw new BadRequestException(ERROR_FAILED_TO_FETCH_RANDOM_POKEMON);
    }
  }
}
