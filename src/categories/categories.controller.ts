import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { AuthGuard } from '@nestjs/passport'; // Pastikan Anda menggunakan AuthGuard untuk melindungi endpoint

@Controller('categories')
@UseGuards(AuthGuard('jwt')) // Hanya pengguna yang terautentikasi yang dapat mengakses endpoint ini
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoriesService.create(categoryData);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoriesService.update(id, categoryData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.categoriesService.delete(id);
  }
}