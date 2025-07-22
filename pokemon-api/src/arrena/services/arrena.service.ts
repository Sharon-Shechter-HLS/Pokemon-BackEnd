import { Injectable } from '@nestjs/common';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ArrenaRepository } from '../repositories/arrena.repository';
import { Turn } from '../arenaConsts';

@Injectable()
export class ArrenaService {
  constructor(
    private readonly pokemonsService: PokemonsService,
    private readonly arrenaRepository: ArrenaRepository,
  ) {}

  async startGame(userId: number, pokemonId: number): Promise<string> {
    const userPokemon = await this.pokemonsService.findPokemonById(pokemonId);
    if (!userPokemon) {
      return 'User Pokémon not found';
    }

    const opponentPokemon = await this.pokemonsService.getRandomPokemon();
    if (!opponentPokemon) {
      return 'Opponent Pokémon not found';
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

    return `Game started with ID: ${game.gameId}`;
  }
}
