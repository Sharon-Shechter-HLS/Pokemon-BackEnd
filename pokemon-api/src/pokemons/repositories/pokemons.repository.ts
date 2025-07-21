import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, POKEMON_MODEL_NAME } from '../schemas/pokemonSchema';

@Injectable()
export class PokemonsRepository {
  constructor(
    @InjectModel(POKEMON_MODEL_NAME) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async findPokemons({
    page,
    rowsPerPage,
    sortBy,
    filters,
  }: {
    page: number;
    rowsPerPage: number;
    sortBy?: string;
    filters?: any;
  }) {
    const skip =  (page - 1) * rowsPerPage;
    const limit = page == 1 ? rowsPerPage: rowsPerPage + 1;

    const total = await this.pokemonModel.countDocuments(filters);

    const queryBuilder = this.pokemonModel.find(filters).skip(skip).limit(limit).lean();

    if (sortBy) {
      const [key, order] = sortBy.split('-');
      queryBuilder.sort({ [key]: order === 'asc' ? 1 : -1 });
    }

    const data = await queryBuilder.exec();

    const start = skip + 1;
    const end =skip + data.length;

    return {
      data,
      meta: {
        start,
        end,
        total,
      },
    };
  }
}