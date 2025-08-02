import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCollectionDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  pokemonId: string;
}