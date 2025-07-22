import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsService } from './services/pokemons.service';
import { PokemonsRepository } from './repositories/pokemons.repository';
import { PokemonsController } from './contorles/pokemons.controller';
import { PokemonSchema } from './schemas/pokemonSchema';
import { UserSchema } from './schemas/userSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Pokemon', schema: PokemonSchema, collection: 'Pokemons' },
      { name: 'User', schema: UserSchema, collection: 'Users' },
    ]),
  ],
  providers: [PokemonsService, PokemonsRepository],
  controllers: [PokemonsController],
  exports: [PokemonsService, PokemonsRepository],
})
export class PokemonsModule {}
