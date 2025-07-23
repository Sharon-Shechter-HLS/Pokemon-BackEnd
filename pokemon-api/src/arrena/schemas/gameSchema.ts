import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Pokemon } from '../../pokemons/schemas/pokemonSchema';
import { Turn } from '../arenaConsts';

export type GameDocument = Game & Document;

@Schema({ collection: 'Games' })
export class Game {
  @Prop({ required: true })
  gameId: number;

  @Prop({ required: true, type: Object })
  user: Pokemon;

  @Prop({ required: true, type: Object })
  opponent: Pokemon;

  @Prop({ required: true, enum: Turn }) 
  turn: Turn;

  @Prop({required: true, })
  opponentCurrentLife: number;

  @Prop({ required: true, })
  userCurrentLife: number;

  @Prop({ type: String, default: null })
  winner: string | null;


  @Prop({ default: 0 })
  catchAttempts: number;

  @Prop({ default: false })
  canCatch: boolean;



}

export const GameSchema = SchemaFactory.createForClass(Game);