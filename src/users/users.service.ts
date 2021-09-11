import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Verify } from '../verify.presence';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly verifyAttributes: Verify,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.verifyAttributes.presentAttributes(createUserDto);
    const save = await this.userRepository.insert(createUserDto);
    return save;
  }

  findAll(): Promise<User[]> {
    try {
      return this.userRepository.find({ relations: ['posts'] });
    } catch (error) {
      return error;
    }
  }

  findOne(id: string): Promise<User> {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      return error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      return error;
    }
  }
}
