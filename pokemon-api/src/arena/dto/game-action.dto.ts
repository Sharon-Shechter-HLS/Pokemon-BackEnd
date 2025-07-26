import { IsInt, IsNotEmpty } from 'class-validator';

export class GameActionDto {
  @IsNotEmpty()
  @IsInt()
  gameId: number;
}