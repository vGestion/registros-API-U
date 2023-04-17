import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type UserDocument = User & Document; 

@Schema() 
export class User {
  @Prop()
  _id: string

  @Prop() 
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  date: Date;

  @Prop()
  sex: string;

  @Prop()
  gender: string;

  @Prop()
  ci: string;

  @Prop()
  password: string;

  @Prop()
  residence: string;

  @Prop()
  nationality: string;

  @Prop()
  rol: string;

  @Prop()
  certificates:[
    {
      event: string;
      url: string;
    }]
}

export const UserSchema = SchemaFactory.createForClass(User); 