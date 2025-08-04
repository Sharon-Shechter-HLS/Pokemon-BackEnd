import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsModule } from './pokemons/pokemons.module';
import { ArenaModule } from './arena/arena.module';
import { UsersModule } from './users/UsersModule';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './src/.env', 
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    PokemonsModule,
    ArenaModule,
    UsersModule
  ],
})
export class AppModule {}