import { IsNotEmpty, IsString } from 'class-validator';
import {
  USER_ID_REQUIRED,
  POKEMON_ID_REQUIRED,
  USER_ID_MUST_BE_STRING,
  POKEMON_ID_MUST_BE_STRING,
} from '../arenaConsts';

export class StartGameDto {
  @IsNotEmpty({ message: USER_ID_REQUIRED })
  @IsString({ message: USER_ID_MUST_BE_STRING })
  userId: string;

  @IsNotEmpty({ message: POKEMON_ID_REQUIRED })
  @IsString({ message: POKEMON_ID_MUST_BE_STRING }) 
  pokemonId: string;
}
