import { Injectable } from '@nestjs/common';
import { Model, Types  } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemonSchema';
import { POKEMON_MODEL_NAME, SortKey, SortOrder } from '../pokemonConsts'; 
import { getPokemonsAggregation , getRandomPokemonAggregation } from '../aggregations/pokemons.aggregation';
import { User } from '../schemas/userSchema';
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
    userId?: string;
  }): Promise<FindPokemonsResult> {
    const skip = (page - 1) * rowsPerPage;
    const limit = page == 1 ? rowsPerPage : rowsPerPage + 1;

    const pipeline = getPokemonsAggregation(skip, limit, search, sort, fromMy, userId);

    const model = fromMy && userId ? this.userModel : this.pokemonModel; 
    const [{ data = [], total = 0 } = {}] = await model.aggregate(pipeline).exec();

    const start = skip + 1;
    const end = skip + data.length;

    return {
      data,
      meta: { start, end, total },
    };
  }


async findRandomPokemon(): Promise<Pokemon | null> {
  const pipeline = getRandomPokemonAggregation(); 
  const [pokemon] = await this.pokemonModel.aggregate(pipeline).exec();

  return pokemon || null; 
}
}
