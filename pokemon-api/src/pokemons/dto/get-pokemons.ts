import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { SORT_BY_OPTIONS, SORT_BY_VALIDATION_MESSAGE } from '../pokemonConsts';

export class GetPokemonsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  rowsPerPage?: number;

  @IsOptional()
  @IsEnum(SORT_BY_OPTIONS, {
    message: SORT_BY_VALIDATION_MESSAGE,
  })
  sortBy?: typeof SORT_BY_OPTIONS[number];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  fromMy?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;
}