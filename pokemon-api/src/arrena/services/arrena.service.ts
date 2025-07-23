import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ArrenaRepository } from '../repositories/arrena.repository';
import { Turn, MAX_CATCH_ATTEMPTS } from '../arenaConsts';
import { Game } from '../schemas/gameSchema';
import { attemptCatch, canCatch } from '../businessLogic /catchLogic';

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
      userPokemon: userPokemon,
      opponentPokemon: opponentPokemon,
      turn: Turn.USER,
      userCurrentLife: userPokemon.base.HP, 
      opponentCurrentLife: opponentPokemon.base.HP,
      winner: null,
      catchAttempts: 0,
      canCatch: false,
    };

    const game = await this.arrenaRepository.createGame(gameData);
    return game;
  }

  async catchAttempt(gameId: number): Promise<Game> {
    const game = await this.arrenaRepository.findGameById(gameId);

    if (!canCatch(game.catchAttempts)) {
      game.canCatch = false;
      return await this.arrenaRepository.updateGame(game);
    }

    const { success, updatedAttempts } = attemptCatch(
      game.catchAttempts,
      game.opponentCurrentLife,
      game.opponentPokemon.base.HP,
    );

    game.catchAttempts = updatedAttempts;
    if (success) {
      game.winner = game.userPokemon.name.english;
      game.caught = true;
      game.canCatch = false;
    }

    return await this.arrenaRepository.updateGame(game);
  }
}
