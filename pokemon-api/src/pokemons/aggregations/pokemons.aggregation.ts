import { PipelineStage } from 'mongoose';

export const getAllPokemonsAggregation = (
  skip: number,
  limit: number,
  search?: string,
  sort?: { key: string; order: 'asc' | 'desc' },
): PipelineStage[] => {
  const pipeline: PipelineStage[] = [];

  if (search) {
    pipeline.push({
      $match: { 'name.english': { $regex: search, $options: 'i' } },
    });
  }

  if (sort) {
    pipeline.push({
      $sort: { [sort.key]: sort.order === 'asc' ? 1 : -1 },
    });
  }
  pipeline.push({
    $facet: {
      data: [
        { $skip: skip },
        { $limit: limit }
      ],
      total: [
        { $count: 'total' }
      ]
    }
  });
 

  return pipeline;
};

export const getUserPokemonsAggregation = (
  userId: number,
  skip: number,
  limit: number,
  search?: string,
  sort?: { key: string; order: 'asc' | 'desc' },
): PipelineStage[] => {
  const pipeline: PipelineStage[] = [
    { $match: { userId } },
    {
      $lookup: {
        from: 'Pokemons',
        localField: 'userPokemonsCollection',
        foreignField: 'id',
        as: 'userPokemons',
      },
    },
    { $unwind: '$userPokemons' },
  ];

  if (search) {
    pipeline.push({
      $match: { 'userPokemons.name.english': { $regex: search, $options: 'i' } },
    });
  }

  if (sort) {
    pipeline.push({
      $sort: { [`userPokemons.${sort.key}`]: sort.order === 'asc' ? 1 : -1 },
    });
  }

  pipeline.push({
    $facet: {
      data: [
        { $skip: skip },
        { $limit: limit },
        { $replaceRoot: { newRoot: '$userPokemons' } }
      ],
      total: [
        { $count: 'count' }
      ]
    }
  });

  return pipeline;
};