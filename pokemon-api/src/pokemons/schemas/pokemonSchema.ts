import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
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
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };

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
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    'Sp. Attack': number;
    'Sp. Defense': number;
    Speed: number;
  };

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
  image: {
    sprite: string;
    thumbnail: string;
    hires: string;
  };
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
