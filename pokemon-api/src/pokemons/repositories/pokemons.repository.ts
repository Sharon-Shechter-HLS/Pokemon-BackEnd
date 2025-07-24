import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemonSchema';
import { POKEMON_MODEL_NAME, SortKey, SortOrder } from '../pokemonConsts'; 
import { getPokemonsAggregation } from '../aggregations/pokemons.aggregation';
import { User } from '../schemas/userSchema';

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
  }) {
    console.log('findPokemons called with:', {
      page,
      rowsPerPage,
      sort,
      search,
      fromMy,
      userId,
    });
    const skip = (page - 1) * rowsPerPage;
    const limit = page == 1 ? rowsPerPage : rowsPerPage + 1;

    const pipeline = getPokemonsAggregation(skip, limit, search, sort, fromMy, userId);
    console.log('Pokemons aggregation pipeline:', JSON.stringify(pipeline, null, 2));

const model = fromMy && userId ? this.userModel : this.pokemonModel; 
    const [{ data = [], total = 0 } = {}] = await model.aggregate(pipeline).exec();

    const start = skip + 1;
    const end = skip + data.length;

    return {
      data,
      meta: { start, end, total },
    };
  }

  async findPokemonById(id: number) {
    return this.pokemonModel.findOne({ id }).exec();
  }
}
