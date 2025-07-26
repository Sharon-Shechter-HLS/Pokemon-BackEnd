import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Turn, Winner } from '../arenaConsts';

export type battleDocument = battle & Document & { _id: Types.ObjectId };

@Schema({ collection: 'battle', timestamps: true, versionKey: false })
export class battle {
  @Prop({ type: Types.ObjectId, ref: 'Pokemon', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Pokemon', required: true })
  opponent: Types.ObjectId;

  @Prop({ required: true, enum: Turn })
  turn: Turn;

  @Prop({ required: true })
  opponentCurrentLife: number;

  @Prop({ required: true })
  userCurrentLife: number;

  @Prop({ type: String, enum: Winner, default: Winner.None })
  winner: Winner;

  @Prop({ default: 0 })
  catchAttempts: number;

  @Prop({ default: false })
  canCatch: boolean;

  @Prop({ default: false }) 
  isCatched: boolean;
}

export const battlechema = SchemaFactory.createForClass(battle);