import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Schema } from 'mongoose';
import { UserDocument } from '../schemas/userSchema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async findUserById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }

  async addPokemonToUser(user: UserDocument, pokemonId: string): Promise<UserDocument> {
    const pokemonObjectId = new Schema.Types.ObjectId(pokemonId); 
    user.userPokemonsCollection.push(pokemonObjectId);
    return user.save();
  }

  async removePokemonFromUser(user: UserDocument, pokemonId: string): Promise<UserDocument> {
    const pokemonObjectId = new Schema.Types.ObjectId(pokemonId); 
    user.userPokemonsCollection = user.userPokemonsCollection.filter(
      (id) => id.toString() !== pokemonObjectId.toString()
    );
    return user.save();
  }
}