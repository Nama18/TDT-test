import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/article.entity';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { Category } from './categories/category.entity';
import { Comment } from './comments/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123',
      database: 'api',
      entities: [User, Article, Category, Comment],
      synchronize: true,
    }),
    AuthModule,
    ArticlesModule,
    CategoriesModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
