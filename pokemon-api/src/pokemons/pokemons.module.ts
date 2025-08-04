import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsService } from './services/pokemons.service';
import { PokemonsRepository } from './repositories/pokemons.repository';
import { PokemonsController } from './contorles/pokemons.controller';
import { Pokemon, PokemonSchema } from './schemas/pokemonSchema';
import { UsersModule } from '../users/UsersModule';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pokemon.name, schema: PokemonSchema, collection: 'pokemons' },
    ]),
    UsersModule,
  ],
  providers: [PokemonsService, PokemonsRepository],
  controllers: [PokemonsController],
  exports: [PokemonsService, PokemonsRepository],
})
export class PokemonsModule {}
