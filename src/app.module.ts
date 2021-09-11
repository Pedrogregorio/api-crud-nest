import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { AppController } from './app.controller';
import { Verify } from './verify.presence';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'gregorio',
      password: 'secret123',
      database: 'api_nest_test',
      entities: [User, Post],
      migrations: ['migration/*.js'],
      synchronize: true,
      cli: {
        migrationsDir: 'migration',
      },
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, Verify],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
