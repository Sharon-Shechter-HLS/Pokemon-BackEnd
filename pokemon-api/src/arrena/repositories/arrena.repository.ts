import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from '../schemas/gameSchema';

@Injectable()
export class ArrenaRepository {
  constructor(@InjectModel(Game.name) private readonly gameModel: Model<GameDocument>) {}

  async createGame(gameData: Partial<Game>): Promise<Game> {
    try {
      const game = new this.gameModel(gameData);
      return await game.save();
    } catch (error) {
      throw new HttpException('Failed to create game', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findGameById(gameId: number): Promise<Game> {
    try {
      const game = await this.gameModel.findOne({ gameId }).exec();
      if (!game) {
        throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
      }
      return game;
    } catch (error) {
      throw new HttpException('Failed to fetch game', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateGame(game: Game): Promise<Game> {
    try {
      const updatedGame = await this.gameModel
        .findOneAndUpdate({ gameId: game.gameId }, game, { new: true, runValidators: true })
        .exec();
      if (!updatedGame) {
        throw new HttpException('Failed to update game', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return updatedGame;
    } catch (error) {
      throw new HttpException('Failed to update game', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
