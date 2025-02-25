import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { AuthGuard } from '@nestjs/passport'; // Pastikan Anda menggunakan AuthGuard untuk melindungi endpoint

@Controller('comments')
@UseGuards(AuthGuard('jwt')) // Hanya pengguna yang terautentikasi yang dapat mengakses endpoint ini
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() commentData: Partial<Comment>): Promise<Comment> {
    return this.commentsService.create(commentData);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() commentData: Partial<Comment>): Promise<Comment> {
    return this.commentsService.update(id, commentData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.commentsService.delete(id);
  }
}