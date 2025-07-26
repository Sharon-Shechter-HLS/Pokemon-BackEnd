import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { battle, battleDocument } from '../schemas/battleSchema';

@Injectable()
export class ArrenaRepository {
  constructor(@InjectModel(battle.name) private readonly battleModel: Model<battleDocument>) {}

  async createGame(battleData: Partial<battle>): Promise<battleDocument> {
    const game = new this.battleModel(battleData);
    return game.save(); 
  }

  async getBattleWithDetails(battleId: Types.ObjectId): Promise<any> {
    return this.battleModel
      .findById(battleId) 
      .populate('user') 
      .populate('opponent') 
      .lean()
      .exec();
  }

  async updateGame(gameId: Types.ObjectId, updatedData: Partial<battle>): Promise<void> {
    await this.battleModel.findByIdAndUpdate(gameId, updatedData, { new: true }).exec();
  }
}
