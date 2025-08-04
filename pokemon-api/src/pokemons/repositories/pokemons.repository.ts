import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemonSchema';
import { USER_POKEMONS_COLLECTION_FIELD, NAME_ENGLISH_FIELD, REGEX_OPTIONS } from '../pokemonConsts';
import { getPokemonsAggregation, getRandomPokemonAggregation } from '../aggregations/pokemons.aggregation';
import { FindPokemonsResult } from '../types/findPokemonResponse';
import { Sort } from '../types/pokemon.types';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class PokemonsRepository {
  constructor(
    @InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>,
    private readonly usersService: UsersService,
  ) {}

  async findPokemons({
    page,
    rowsPerPage,
    sort,
    search,
    fromMy,
    userId,
  }: {
    page: number;
    rowsPerPage: number;
    sort?: Sort;
    search?: string;
    fromMy?: boolean;
    userId: string;
  }): Promise<FindPokemonsResult> {
    const skip = (page - 1) * rowsPerPage;
    const limit = rowsPerPage;

    if (fromMy) {
      return this.findUserPokemons(userId, skip, limit, search, sort); 
    } else {
      return this.findAllPokemons(userId, skip, limit, search, sort); 
    }
  }

  private async findUserPokemons(
    userId: string,
    skip: number,
    limit: number,
    search?: string,
    sort?: Sort,
  ): Promise<FindPokemonsResult> {
    const userPokemonIds = await this.usersService.getUserPokemonCollection(userId);
    if (userPokemonIds.length === 0) {
      return { data: [], meta: { start: 0, end: 0, total: [{ total: 0 }] } }; 
    }

    const total = userPokemonIds.length;
    const paginatedPokemonIds = userPokemonIds.slice(skip, skip + limit).map((id) => new Types.ObjectId(id));

    const searchFilter = search ? { [NAME_ENGLISH_FIELD]: { $regex: search, $options: REGEX_OPTIONS } } : {};
    const data = await this.pokemonModel
      .find({ _id: { $in: paginatedPokemonIds }, ...searchFilter })
      .sort(sort ? { [sort.key]: sort.order === 'asc' ? 1 : -1 } : {})
      .lean()
      .exec();

    const enrichedData = data.map((pokemon) => ({
      ...pokemon,
      isMyPokemon: true,
    }));

    const start = skip + 1;
    const end = skip + enrichedData.length;

    return {
      data: enrichedData,
      meta: { start, end, total: [{ total }] }, 
    };
  }

  private async findAllPokemons(
    userId: string,
    skip: number,
    limit: number,
    search?: string,
    sort?: Sort,
  ): Promise<FindPokemonsResult> {
    const pipeline = getPokemonsAggregation(skip, limit, search, sort, false, userId);

    const [{ data = [], total = 0 } = {}] = await this.pokemonModel.aggregate(pipeline).exec();

    const userPokemonIds = userId ? await this.usersService.getUserPokemonCollection(userId) : [];

    const enrichedData = data.map((pokemon) => ({
      ...pokemon,
      isMyPokemon: userPokemonIds.includes(pokemon._id.toString()),
    }));

    const start = skip + 1;
    const end = skip + enrichedData.length;

    return {
      data: enrichedData,
      meta: { start, end, total: [{ total }] }, // Updated format
    };
  }

  async findRandomPokemon(): Promise<Pokemon | null> {
    const pipeline = getRandomPokemonAggregation();
    const [pokemon] = await this.pokemonModel.aggregate(pipeline).exec();

    return pokemon || null;
  }

  async findPokemonById(_id: string): Promise<Pokemon | null> {
    return this.pokemonModel.findById(new Types.ObjectId(_id)).lean().exec();
  }

  async updatePokemon(pokemonId: string, updatedData: Partial<Pokemon>): Promise<void> {
    await this.pokemonModel.findByIdAndUpdate(pokemonId, updatedData, { new: true }).exec();
  }
}
