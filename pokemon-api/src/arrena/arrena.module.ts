import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArrenaService } from './services/arrena.service';
import { ArrenaRepository } from './repositories/arrena.repository';
import { ArrenaController } from './controllers/arrena.controller';
import { Game, GameSchema } from './schemas/gameSchema';
import { PokemonsModule } from '../pokemons/pokemons.module';

@Module({
  imports: [
    PokemonsModule,
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  providers: [ArrenaService, ArrenaRepository],
  controllers: [ArrenaController],
  exports: [ArrenaService, ArrenaRepository],
})
export class ArrenaModule {}
