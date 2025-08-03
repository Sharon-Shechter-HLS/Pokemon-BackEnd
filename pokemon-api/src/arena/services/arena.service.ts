import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ArrenaRepository } from '../repositories/arena.repository';
import { canCatch, attemptCatch } from '../battleUtils/catchLogic';
import { Types } from 'mongoose';
import { calculateNewLife } from '../battleUtils/attackLogic';

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
        winner: undefined,
        catchAttempts: 0,
        canCatch: true,
        hasSwitch: false, 
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

async attackPokemon(gameId: string): Promise<any> {
  try {
    const game = await this.arrenaRepository.getBattleWithDetails(new Types.ObjectId(gameId));
    if (!game) {
      throw new Error(GAME_NOT_FOUND);
    }

    if (game.turn === Turn.USER) {
      game.opponentCurrentLife = calculateNewLife(
        game.user.base.Attack,
        game.opponentCurrentLife,
        game.opponent.base.HP
      );

      if (game.opponentCurrentLife === 0) {
        game.winner = Winner.User;
        game.turn = null; 
        await this.arrenaRepository.updateGame(game._id, game);
        return await this.arrenaRepository.getBattleWithDetails(game._id);
      }

      game.turn = Turn.OPPONENT;
    } else if (game.turn === Turn.OPPONENT) {
      game.userCurrentLife = calculateNewLife(
        game.opponent.base.Attack,
        game.userCurrentLife,
        game.user.base.HP
      );

      if (game.userCurrentLife === 0) {
        game.winner = Winner.Opponent;
        game.turn = null; 
        await this.arrenaRepository.updateGame(game._id, game);
        return await this.arrenaRepository.getBattleWithDetails(game._id);
      }

      game.turn = Turn.USER;
    }

    await this.arrenaRepository.updateGame(game._id, game);
    return await this.arrenaRepository.getBattleWithDetails(game._id);
  } catch (error) {
    throw error; 
  }
}

async switchPokemon(gameId: string): Promise<any> {
  try {
    const game = await this.arrenaRepository.getBattleWithDetails(new Types.ObjectId(gameId));
    if (!game) {
      throw new HttpException(GAME_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (game.hasSwitch) {
      throw new HttpException('Pokémon has already been switched in this game.', HttpStatus.BAD_REQUEST);
    }

    await this.arrenaRepository.switchPokemon(new Types.ObjectId(gameId));

    const updatedGame = await this.arrenaRepository.getBattleWithDetails(new Types.ObjectId(gameId));
    return updatedGame;
  } catch (error) {
    throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
}

