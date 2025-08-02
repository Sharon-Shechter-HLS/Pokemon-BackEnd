import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PokemonsRepository } from '../repositories/pokemons.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/userSchema';
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
    userId: string,
    sortBy?: string,
    search?: string,
    fromMy?: boolean,
  ) {
    try {
      if (!userId) {
        throw new BadRequestException('User ID is required');
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
        userId, // Pass userId to the repository
      });
    } catch (error) {
      console.error('Error fetching pokemons:', error.message);
      throw new BadRequestException('Failed to fetch pokemons');
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

  async getPokemonById(_id: string) {
    try {
      const pokemon = await this.pokemonsRepository.findPokemonById(_id);
      if (!pokemon) {
        throw new NotFoundException(`Pokemon with ID ${_id} not found`);
      }
      return pokemon;
    } catch (error) {
      console.error('Error fetching pokemon by ID:', error.message);
      throw new BadRequestException(`${ERROR_FAILED_TO_FETCH_POKEMONS} ${_id}`);
    }
  }

  async updateUserGames(userId: string, battleId: Types.ObjectId): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { userBattles: battleId } },
      { new: true }
    ).exec();
  }

  async getUserById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }
}
