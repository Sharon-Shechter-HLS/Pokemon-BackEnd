import { Injectable } from '@nestjs/common';
import { Model, Types  } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemonSchema';
import { POKEMON_MODEL_NAME, SortKey, SortOrder } from '../pokemonConsts'; 
import { getPokemonsAggregation , getRandomPokemonAggregation } from '../aggregations/pokemons.aggregation';
import { User } from '../../users/schemas/userSchema';
import { FindPokemonsResult } from '../types/findPokemonResponse';

@Injectable()
export class PokemonsRepository {
  constructor(
    @InjectModel(POKEMON_MODEL_NAME) private readonly pokemonModel: Model<Pokemon>,
    @InjectModel('User') private readonly userModel: Model<User>,
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
    sort?: { key: SortKey; order: SortOrder };
    search?: string;
    fromMy?: boolean;
    userId: string;
  }): Promise<FindPokemonsResult> {
    const skip = (page - 1) * rowsPerPage;
    const limit = rowsPerPage;

    if (fromMy) {
      // Fetch user's Pokémon collection directly
      const user = await this.userModel.findById(userId).select('userPokemonsCollection').lean().exec();
      if (!user || !user.userPokemonsCollection) {
        return { data: [], meta: { start: 0, end: 0, total: 0 } };
      }

      const total = user.userPokemonsCollection.length;
      const paginatedPokemonIds = user.userPokemonsCollection.slice(skip, skip + limit);

      const searchFilter = search ? { 'name.english': { $regex: search, $options: 'i' } } : {};
      const data = await this.pokemonModel
        .find({ _id: { $in: paginatedPokemonIds }, ...searchFilter })
        .sort(sort ? { [sort.key]: sort.order === SortOrder.Asc ? 1 : -1 } : {})
        .lean()
        .exec();

      const enrichedData = data.map((pokemon) => ({
        ...pokemon,
        isMyPokemon: true, // All Pokémon belong to the user
      }));

      const start = skip + 1;
      const end = skip + enrichedData.length;

      return {
        data: enrichedData,
        meta: { start, end, total: enrichedData.length }, // Update total to reflect filtered results
      };
    } else {
      // Perform aggregation for general Pokémon query
      const pipeline = getPokemonsAggregation(skip, limit, search, sort, fromMy, userId);

      const [{ data = [], total = 0 } = {}] = await this.pokemonModel.aggregate(pipeline).exec();

      // Fetch user's Pokémon collection for `isMyPokemon` flag
      const user = await this.userModel.findById(userId).select('userPokemonsCollection').lean().exec();
      const userPokemonIds = user?.userPokemonsCollection?.map((id) => id.toString()) || [];

      const enrichedData = data.map((pokemon) => ({
        ...pokemon,
        isMyPokemon: userPokemonIds.includes(pokemon._id.toString()),
      }));

      const start = skip + 1;
      const end = skip + enrichedData.length;

      return {
        data: enrichedData,
        meta: { start, end, total },
      };
    }
  }


async findRandomPokemon(): Promise<Pokemon | null> {
  const pipeline = getRandomPokemonAggregation(); 
  const [pokemon] = await this.pokemonModel.aggregate(pipeline).exec();

  return pokemon || null; 
}

async findPokemonById(_id: string): Promise<Pokemon | null> {
  return this.pokemonModel.findById(new Types.ObjectId(_id)).lean().exec(); 
}
}
