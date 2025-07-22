import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [Number], default: [] })
  userPokemonsCollection: number[];

  @Prop({ type: [Number], default: [] })
  userGames: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);