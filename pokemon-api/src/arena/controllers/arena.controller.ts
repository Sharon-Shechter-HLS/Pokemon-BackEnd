import { Body, Controller, Post, UsePipes, ValidationPipe, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { StartGameDto } from '../dto/start-game.dto';
import { GameActionDto } from '../dto/game-action.dto';
import {switchPokemonDto} from '../dto/switch-pokemon-dto';
import { ArrenaService } from '../services/arena.service';
import { battle } from '../schemas/battleSchema';

@Controller('arena')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ArrenaController {
  private readonly logger = new Logger(ArrenaController.name);

  constructor(private readonly arrenaService: ArrenaService) {}

  @Post('startGame')
  async startGame(@Body() startGameDto: StartGameDto): Promise<battle> {
    try {
      const { userId, pokemonId } = startGameDto;
      this.logger.log(`Starting game for userId: ${userId}, pokemonId: ${pokemonId}`);
      const result = await this.arrenaService.startGame(userId, pokemonId);
      this.logger.log(`Game started successfully: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error starting game: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to start game: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('catch')
  async catchPokemon(@Body() gameActionDto: GameActionDto): Promise<any> {
    try {
      const { gameId } = gameActionDto;
      this.logger.log(`Attempting to catch Pokémon for gameId: ${gameId}`);
      const result = await this.arrenaService.catchPokemon(gameId);
      this.logger.log(`Catch attempt result: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error during catch attempt: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to catch Pokémon: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('attack')
  async attackPokemon(@Body() gameActionDto: GameActionDto): Promise<any> {
    try {
      const { gameId } = gameActionDto;
      this.logger.log(`Attempting attack for gameId: ${gameId}`);
      const result = await this.arrenaService.attackPokemon(gameId);
      this.logger.log(`Attack result: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error during attack: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to perform attack: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  } 
  @Post('switchPokemon')
async switchPokemon(@Body() switchPokemonDto: switchPokemonDto): Promise<any> {
  try {
    const { gameId, newPokemonId } = switchPokemonDto;
    this.logger.log(`Switching Pokémon for gameId: ${gameId} to newPokemonId: ${newPokemonId}`);
    const result = await this.arrenaService.switchPokemon(gameId, newPokemonId);
    this.logger.log(`Switch Pokémon result: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    this.logger.error(`Error during Pokémon switch: ${error.message}`, error.stack);
    throw new HttpException(
      `Failed to switch Pokémon: ${error.message}`,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
@Post('getAnotherOpponent')
async getAnotherOpponent(@Body() gameActionDto: GameActionDto): Promise<any> {
  try {
    const { gameId } = gameActionDto;
    this.logger.log(`Fetching another opponent for gameId: ${gameId}`);
    const result = await this.arrenaService.getAnotherOpponent(gameId);
    this.logger.log(`New opponent fetched successfully: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    this.logger.error(`Error fetching another opponent: ${error.message}`, error.stack);
    throw new HttpException(
      `Failed to fetch another opponent: ${error.message}`,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
}