import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRespository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<void> {
    await this.postRespository.insert(createPostDto);
  }

  findAll() {
    return this.postRespository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.postRespository.findOne(id);
  }

  remove(id: string) {
    return this.postRespository.delete(id);
  }
}
