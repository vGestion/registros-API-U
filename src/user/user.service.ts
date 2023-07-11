import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashPassword;
    return this.UserModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.UserModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.UserModel.findOneAndUpdate(updateUserDto).exec();
  }

  async remove(id: string) {
    return this.UserModel.findByIdAndRemove({ _id: id }).exec();
  }

  async deleteCertificate(id: string, evento: string): Promise<User> {
    return this.UserModel.findOneAndUpdate(
      { _id: id },
      { $pull: { certificates: { event: evento } } },
      { new: true }
    ).exec();
  }

  async addCertificate(id: string, certificate: { event: string, url: string }): Promise<User> {
    return this.UserModel.findOneAndUpdate(
      { _id: id },
      { $push: { certificates: certificate } },
      { new: true }
    ).exec();
  }

  async login(id: string, password: string): Promise<Boolean> {
    var usuario = await this.findOne(id);
    if (usuario) {
      let correcto = await bcrypt.compare(password, usuario.password);
      if (correcto) {
        return true;
      } else {
        return false;
      }
    }else{
      return false;
    }
  }

  async changePassword(id: string, updateUserDto: UpdateUserDto):Promise<User>{
    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(updateUserDto.password, salt);
    updateUserDto.password = newPassword;
    return this.UserModel.findOneAndUpdate(updateUserDto).exec();
  }


  async loginAuth(id: string, password: string):Promise<User>{
    var usuario = await this.findOne(id);
    if (usuario) {
      let correcto = await bcrypt.compare(password, usuario.password);
      if (correcto) {
        return usuario;
      } else {
        return null;
      }
    }else{
      return null;
    }
  }


  async loadCertificate(id: string, file: File){
    

  }
}