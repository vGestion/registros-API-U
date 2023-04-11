import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.UserModel.create(createUserDto);
  }

  findAll() {
    return this.UserModel.find().exec();
  }

  findOne(id: string) {
    return this.UserModel.findOne({ _id: id }).exec();
  }

  update(id: string,updateUserDto: UpdateUserDto) {
    return this.UserModel.findOneAndUpdate(updateUserDto).exec();
  }

  remove(id: string) {
    return this.UserModel.findByIdAndRemove({ _id: id }).exec();
  }
}
