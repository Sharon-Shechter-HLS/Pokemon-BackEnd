import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PokemonsService } from '../services/pokemons.service';
import { GetPokemonsDto } from '../dto/get-pokemons';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '../pokemonConsts';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getPokemons(@Query() query: GetPokemonsDto) {
    return this.pokemonsService.getPokemons(
      query.page || DEFAULT_PAGE,
      query.rowsPerPage || DEFAULT_ROWS_PER_PAGE,
      query.sortBy,
      query.search,
      query.fromMy,
      query.userId, 
    );
  }
}
