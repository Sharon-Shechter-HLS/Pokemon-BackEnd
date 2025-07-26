import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsService } from './services/pokemons.service';
import { PokemonsRepository } from './repositories/pokemons.repository';
import { PokemonsController } from './contorles/pokemons.controller';
import { Pokemon, PokemonSchema } from './schemas/pokemonSchema';
import { User, UserSchema } from './schemas/userSchema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pokemon.name, schema: PokemonSchema, collection: 'pokemons' },
      { name: User.name, schema: UserSchema, collection: 'users' },
    ]),
  ],
  providers: [PokemonsService, PokemonsRepository],
  controllers: [PokemonsController],
  exports: [PokemonsService, PokemonsRepository],
})
export class PokemonsModule {}
