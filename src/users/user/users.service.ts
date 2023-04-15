import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../schemas/user.schema';
import {
  InternalServerErrorException,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common/exceptions';
import { UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) { }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.findAll({}, { password: 0 });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.userRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateWriteOpResult> {
    try {
      return await this.userRepository.updateOne({ _id: id }, updateUserDto);
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.userRepository.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
