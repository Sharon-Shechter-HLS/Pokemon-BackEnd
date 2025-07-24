import { Controller, Get, Query, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PokemonsService } from '../services/pokemons.service';
import { GetPokemonsDto } from '../dto/get-pokemons';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '../pokemonConsts';

@Controller('pokemons')
export class PokemonsController {
  private readonly logger = new Logger(PokemonsController.name); 

  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async getPokemons(@Query() query: GetPokemonsDto) {
    try {
      this.logger.log('Fetching pokemons with query:', JSON.stringify(query)); 
      return await this.pokemonsService.getPokemons(
        query.page || DEFAULT_PAGE,
        query.rowsPerPage || DEFAULT_ROWS_PER_PAGE,
        query.sortBy,
        query.search,
        query.fromMy,
        query.userId,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.warn(`Known error occurred: ${error.message}`); 
        throw error;
      }
      this.logger.error('Unexpected error in getPokemons:', error.message); 
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
