import { IsString } from 'class-validator';

export class switchPokemonDto {
  @IsString()
  gameId: string;

  @IsString()
  newPokemonId: string; 
}