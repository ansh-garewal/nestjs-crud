import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, MinLength } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true})
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @MinLength(8)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
