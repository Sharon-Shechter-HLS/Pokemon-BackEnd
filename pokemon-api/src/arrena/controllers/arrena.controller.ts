import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { StartGameDto } from '../dto/start-game.dto';

@Controller('arena')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ArrenaController {
  @Post('startGame')
  startGame(@Body() startGameDto: StartGameDto): string {
    const { userId, pokemonId } = startGameDto;
    return `Game started for User ID: ${userId} with Pokemon ID: ${pokemonId}`;
  }
}