import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ArrenaRepository } from '../repositories/arena.repository';
import { canCatch, attemptCatch } from '../battleUtils/catchLogic';
import { Types } from 'mongoose';
import { Turn, Winner, USER_NOT_FOUND, USER_POKEMON_NOT_FOUND, OPPONENT_POKEMON_NOT_FOUND, FAILED_TO_START_GAME, GAME_NOT_FOUND } from '../arenaConsts';

@Injectable()
export class ArrenaService {
  constructor(
    private readonly pokemonsService: PokemonsService,
    private readonly arrenaRepository: ArrenaRepository,
  ) {}

  async startGame(userId: string, pokemonId: string): Promise<any> {
    try {
      const user = await this.pokemonsService.getUserById(userId);
      if (!user) {
        throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const userPokemon = await this.pokemonsService.getPokemonById(pokemonId);
      if (!userPokemon) {
        throw new HttpException(USER_POKEMON_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const opponentPokemon = await this.pokemonsService.getRandomPokemon();
      if (!opponentPokemon) {
        throw new HttpException(OPPONENT_POKEMON_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const battleData = {
        user: userPokemon._id,
        opponent: opponentPokemon._id,
        turn: Turn.USER,
        userCurrentLife: userPokemon.base.HP,
        opponentCurrentLife: opponentPokemon.base.HP,
        winner: Winner.None,
        catchAttempts: 0,
        canCatch: false,
      };

      const savedBattle = await this.arrenaRepository.createGame(battleData);

      await this.pokemonsService.updateUserGames(userId, savedBattle._id);

      const populatedBattle = await this.arrenaRepository.getBattleWithDetails(savedBattle._id);

      return populatedBattle;
    } catch (error) {
      throw new HttpException(
        `${FAILED_TO_START_GAME}: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async catchPokemon(gameId: string): Promise<any> {
  try {
    const game = await this.arrenaRepository.getBattleWithDetails(new Types.ObjectId(gameId));
    if (!game) {
      throw new Error(GAME_NOT_FOUND);
    }

    if (!canCatch(game.catchAttempts)) {
      game.canCatch = false;
      await this.arrenaRepository.updateGame(game._id, game);
      const updatedGame = await this.arrenaRepository.getBattleWithDetails(game._id);
      return updatedGame;
    }

    const { success, updatedAttempts } = attemptCatch(
      game.catchAttempts,
      game.opponentCurrentLife,
      game.opponent.base.HP
    );

    const updatedGameData = {
      catchAttempts: updatedAttempts,
      canCatch: canCatch(updatedAttempts),
      turn: Turn.OPPONENT,
      isCatched: success,
    };

    await this.arrenaRepository.updateGame(game._id, updatedGameData);

    const updatedGame = await this.arrenaRepository.getBattleWithDetails(game._id);
    return updatedGame;
  } catch (error) {
    throw error; 
  }
}
}

