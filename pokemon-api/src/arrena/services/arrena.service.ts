import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ArrenaRepository } from '../repositories/arrena.repository';
import { Turn } from '../arenaConsts';
import { Game } from '../schemas/gameSchema';

@Injectable()
export class ArrenaService {
  constructor(
    private readonly pokemonsService: PokemonsService,
    private readonly arrenaRepository: ArrenaRepository,
  ) {}

  async startGame(userId: number, pokemonId: number): Promise<Game> {
    const userPokemon = await this.pokemonsService.findPokemonById(pokemonId);
    if (!userPokemon) {
      throw new HttpException('User Pokémon not found', HttpStatus.NOT_FOUND);
    }

    const opponentPokemon = await this.pokemonsService.getRandomPokemon();
    if (!opponentPokemon) {
      throw new HttpException('Opponent Pokémon not found', HttpStatus.NOT_FOUND);
    }

    const gameData = {
      gameId: Date.now(),
      user: userPokemon,
      opponent: opponentPokemon,
      turn: Turn.USER,
      winner: null,
      catchAttempts: 0,
      canCatch: false,
    };

    const game = await this.arrenaRepository.createGame(gameData);
    if (!game) {
      throw new HttpException('Game creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return game;
  }
}
