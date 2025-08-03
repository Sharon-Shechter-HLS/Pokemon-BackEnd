import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { UserDocument } from '../schemas/userSchema';
import { USER_POKEMONS_COLLECTION_FIELD } from '../../pokemons/pokemonConsts';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async findUserById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }

  async addPokemonToUser(user: UserDocument, pokemonId: string): Promise<UserDocument> {
    const pokemonObjectId = new Types.ObjectId(pokemonId); 
    user.userPokemonsCollection.push(pokemonObjectId);
    return user.save();
  }

  async removePokemonFromUser(user: UserDocument, pokemonId: string): Promise<UserDocument> {
    const pokemonObjectId = new Types.ObjectId(pokemonId); 
    user.userPokemonsCollection = user.userPokemonsCollection.filter(
      (id) => id.toString() !== pokemonObjectId.toString()
    );
    return user.save();
  }

  async getUserPokemonCollection(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId).select(USER_POKEMONS_COLLECTION_FIELD).lean().exec();
    return user?.[USER_POKEMONS_COLLECTION_FIELD]?.map((id) => id.toString()) || [];
  }
}