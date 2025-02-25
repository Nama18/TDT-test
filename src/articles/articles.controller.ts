import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { AuthGuard } from '@nestjs/passport'; // Pastikan Anda menggunakan AuthGuard untuk melindungi endpoint

@Controller('articles')
@UseGuards(AuthGuard('jwt')) // Hanya pengguna yang terautentikasi yang dapat mengakses endpoint ini
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() articleData: Partial<Article>): Promise<Article> {
    return this.articlesService.create(articleData);
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Article> {
    return this.articlesService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() articleData: Partial<Article>): Promise<Article> {
    return this.articlesService.update(id, articleData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.articlesService.delete(id);
  }
}