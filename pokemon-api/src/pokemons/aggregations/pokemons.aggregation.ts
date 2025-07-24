import { PipelineStage, Types } from 'mongoose';

export const getPokemonsAggregation = (
  skip: number,
  limit: number,
  search?: string,
  sort?: { key: string; order: 'asc' | 'desc' },
  fromMy?: boolean, 
  userId?: string, 
): PipelineStage[] => {
  const pipeline: PipelineStage[] = [];

  if (fromMy && userId) {
    pipeline.push({
      $match: { _id: new Types.ObjectId(userId) }, 
    });
    pipeline.push({
      $lookup: {
        from: 'pokemons', 
        localField: 'userPokemonsCollection',
        foreignField: '_id', 
        as: 'userPokemons',
      },
    });
    pipeline.push({ $unwind: '$userPokemons' }); 
  }

  if (search) {
    pipeline.push({
      $match: {
        [fromMy ? 'userPokemons.name.english' : 'name.english']: {
          $regex: search,
          $options: 'i',
        },
      },
    });
  }

  if (sort) {
    pipeline.push({
      $sort: {
        [fromMy ? `userPokemons.${sort.key}` : sort.key]: sort.order === 'asc' ? 1 : -1,
      },
    });
  }

  pipeline.push({
    $facet: {
      data: [
        { $skip: skip },
        { $limit: limit },
        ...(fromMy ? [{ $replaceRoot: { newRoot: '$userPokemons' } }] : []),
      ],
      total: [{ $count: 'total' }],
    },
  });

  return pipeline;
};

export const getRandomPokemonAggregation = (): PipelineStage[] => {
  return [
    { $sample: { size: 1 } }, 
  ];
};