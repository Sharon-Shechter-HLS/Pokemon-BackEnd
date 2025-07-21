import { Module } from '@nestjs/common';
import { PokemonsService } from './services/pokemons.service';
import { PokemonsRepository } from './repositories/pokemons.repository';
import { PokemonsController } from './contorles/pokemons.controller';

@Module({
  providers: [PokemonsService, PokemonsRepository],
  controllers: [PokemonsController],
  exports: [PokemonsService, PokemonsRepository],
})
export class PokemonsModule {}
