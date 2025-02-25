import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(articleData: Partial<Article>): Promise<Article> {
    const article = this.articleRepository.create(articleData);
    return this.articleRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

   async findById(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async update(id: number, articleData: Partial<Article>): Promise<Article> {
    await this.findById(id); // Pastikan artikel ada
    await this.articleRepository.update(id, articleData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const article = await this.findById(id);
    await this.articleRepository.remove(article);
  }
}