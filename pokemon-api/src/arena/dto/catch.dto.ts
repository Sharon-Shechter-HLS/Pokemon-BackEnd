import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CatchDto {
  @IsNotEmpty({ message: 'Game ID is required' })
  @Type(() => Number)
  @IsInt({ message: 'Game ID must be an integer' })
  gameId: number;
}