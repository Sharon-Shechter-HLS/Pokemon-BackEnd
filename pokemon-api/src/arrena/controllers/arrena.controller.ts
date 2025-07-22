import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { StartGameDto } from '../dto/start-game.dto';
import { ArrenaService } from '../services/arrena.service';

@Controller('arena')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ArrenaController {
  constructor(private readonly arrenaService: ArrenaService) {}

  @Post('startGame')
  async startGame(@Body() startGameDto: StartGameDto): Promise<string> {
    const { userId, pokemonId } = startGameDto;
    return await this.arrenaService.startGame(userId, pokemonId);
  }
}