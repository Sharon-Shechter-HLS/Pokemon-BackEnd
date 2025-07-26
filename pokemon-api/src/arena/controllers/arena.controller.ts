import { Body, Controller, Post, UsePipes, ValidationPipe, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { StartGameDto } from '../dto/start-game.dto';
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
}