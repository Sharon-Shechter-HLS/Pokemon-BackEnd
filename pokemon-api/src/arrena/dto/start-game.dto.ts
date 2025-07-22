import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import {
  USER_ID_REQUIRED,
  USER_ID_MUST_BE_INTEGER,
  POKEMON_ID_REQUIRED,
  POKEMON_ID_MUST_BE_INTEGER,
} from '../arenaConsts';

export class StartGameDto {
  @IsNotEmpty({ message: USER_ID_REQUIRED })
  @Type(() => Number)
  @IsInt({ message: USER_ID_MUST_BE_INTEGER })
  userId: number;

  @IsNotEmpty({ message: POKEMON_ID_REQUIRED })
  @Type(() => Number)
  @IsInt({ message: POKEMON_ID_MUST_BE_INTEGER })
  pokemonId: number;
}
