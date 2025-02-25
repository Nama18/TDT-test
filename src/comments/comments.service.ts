import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(commentData: Partial<Comment>): Promise<Comment> {
    const comment = this.commentRepository.create(commentData);
    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: number, commentData: Partial<Comment>): Promise<Comment> {
    await this.findById(id); // Pastikan komentar ada
    await this.commentRepository.update(id, commentData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const comment = await this.findById(id);
    await this.commentRepository.remove(comment);
  }
}