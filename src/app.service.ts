import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: any): Promise<User> {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
