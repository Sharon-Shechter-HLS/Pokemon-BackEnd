import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { StartGameDto } from '../dto/start-game.dto';
import { CatchDto } from '../dto/catch.dto'; 
import { ArrenaService } from '../services/arrena.service';
import { Game } from '../schemas/gameSchema';

@Controller('arena')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ArrenaController {
  constructor(private readonly arrenaService: ArrenaService) {}

  @Post('startGame')
  async startGame(@Body() startGameDto: StartGameDto): Promise<Game> {
    const { userId, pokemonId } = startGameDto;
    return await this.arrenaService.startGame(userId, pokemonId);
  }

  @Post('catch')
  async catchAttempt(@Body() catchDto: CatchDto): Promise<Game> {
    const { gameId } = catchDto; 
    return await this.arrenaService.catchAttempt(gameId);
  }
}