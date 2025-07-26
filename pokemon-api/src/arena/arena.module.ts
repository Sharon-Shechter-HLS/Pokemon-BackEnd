import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArrenaService } from './services/arena.service';
import { ArrenaRepository } from './repositories/arena.repository';
import { ArrenaController } from './controllers/arena.controller';
import { battle, battlechema } from './schemas/battleSchema';
import { PokemonsModule } from '../pokemons/pokemons.module';

@Module({
  imports: [
    PokemonsModule,
    MongooseModule.forFeature([{ name: battle.name, schema: battlechema, collection: 'battles' }]),
  ],
  providers: [ArrenaService, ArrenaRepository],
  controllers: [ArrenaController],
  exports: [ArrenaService, ArrenaRepository],
})
export class ArenaModule {}
