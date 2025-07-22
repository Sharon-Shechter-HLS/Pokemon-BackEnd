import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from '../schemas/gameSchema';

@Injectable()
export class ArrenaRepository {
  constructor(@InjectModel(Game.name) private readonly gameModel: Model<GameDocument>) {}

  async createGame(gameData: Partial<Game>): Promise<Game> {
    const game = new this.gameModel(gameData);
    return game.save();
  }
}
