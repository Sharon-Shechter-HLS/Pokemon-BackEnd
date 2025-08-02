import { Body, Controller, Post, Delete, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {UpdateCollectionDto} from "../dto/update-collection.dto";
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post('addPokemon')
  async addPokemon(@Body() addPokemonDto: UpdateCollectionDto): Promise<any> {
    try {
      const { userId, pokemonId } = addPokemonDto;
      this.logger.log(`Adding Pokémon to user collection for userId: ${userId}, pokemonId: ${pokemonId}`);
      const result = await this.usersService.addPokemon(userId, pokemonId);
      this.logger.log(`Pokémon added successfully: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error adding Pokémon: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to add Pokémon: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('removePokemon')
  async removePokemon(@Body() removePokemonDto: UpdateCollectionDto): Promise<any> {
    try {
      const { userId, pokemonId } = removePokemonDto;
      this.logger.log(`Removing Pokémon from user collection for userId: ${userId}, pokemonId: ${pokemonId}`);
      const result = await this.usersService.removePokemon(userId, pokemonId);
      this.logger.log(`Pokémon removed successfully: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error removing Pokémon: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to remove Pokémon: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}