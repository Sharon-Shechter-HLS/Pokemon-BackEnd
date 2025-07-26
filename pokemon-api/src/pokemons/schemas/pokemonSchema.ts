import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; // Import Types for ObjectId
import { PokemonName, PokemonBaseStats, PokemonImage } from '../types/pokemon.types';

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
  @Prop({ type: Types.ObjectId }) 
  _id: Types.ObjectId;

  @Prop({ required: true })
  id: number;

  @Prop({
    type: {
      english: String,
      japanese: String,
      chinese: String,
      french: String,
    },
  })
  name: PokemonName;

  @Prop([String])
  type: string[];

  @Prop({
    type: {
      HP: Number,
      Attack: Number,
      Defense: Number,
      'Sp. Attack': Number,
      'Sp. Defense': Number,
      Speed: Number,
    },
  })
  base: PokemonBaseStats;

  @Prop()
  species: string;

  @Prop()
  description: string;

  @Prop({
    type: {
      sprite: String,
      thumbnail: String,
      hires: String,
    },
  })
  image: PokemonImage;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
