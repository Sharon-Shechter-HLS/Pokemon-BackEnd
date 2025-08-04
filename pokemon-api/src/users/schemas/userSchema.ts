import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';  

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Pokemon' }], 
    default: [],
  })
  userPokemonsCollection: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Battle' }], 
  })
  userBattles: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
