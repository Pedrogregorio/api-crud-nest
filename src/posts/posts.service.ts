import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verify } from '../verify.presence';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRespository: Repository<Post>,
    private readonly verifyAttributes: Verify,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<void> {
    this.verifyAttributes.presentAttributes(createPostDto);
    await this.postRespository.insert(createPostDto);
  }

  findAll() {
    try {
      return this.postRespository.find({ relations: ['user'] });
    } catch (error) {
      return error;
    }
  }

  findOne(id: string) {
    try {
      return this.postRespository.findOne(id);
    } catch (error) {
      return error;
    }
  }

  remove(id: string) {
    try {
      return this.postRespository.delete(id);
    } catch (error) {
      return error;
    }
  }
}
