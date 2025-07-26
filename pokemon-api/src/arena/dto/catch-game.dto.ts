import { IsNotEmpty, IsString } from 'class-validator';
import { GAME_ID_REQUIRED, GAME_ID_MUST_BE_STRING } from '../arenaConsts';

export class CatchGameDto {
  @IsNotEmpty({ message: GAME_ID_REQUIRED })
  @IsString({ message: GAME_ID_MUST_BE_STRING })
  gameId: string;
}