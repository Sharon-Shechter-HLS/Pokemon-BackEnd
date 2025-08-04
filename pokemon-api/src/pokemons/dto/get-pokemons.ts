import { IsBoolean, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { SORT_BY_OPTIONS, SORT_BY_VALIDATION_MESSAGE, ERROR_USERID_MOST_BE_STRING } from '../pokemonConsts';

export class GetPokemonsDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  rowsPerPage?: number;

  @IsOptional()
  @IsEnum(SORT_BY_OPTIONS, {
    message: SORT_BY_VALIDATION_MESSAGE,
  })
  sortBy?: typeof SORT_BY_OPTIONS[number] = 'id-asc';

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true) 
  @IsBoolean()
  fromMy: boolean = false;

  @IsString({ message: ERROR_USERID_MOST_BE_STRING })
  userId: string = '';
}