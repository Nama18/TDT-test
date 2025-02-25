import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport'; // Pastikan Anda menggunakan AuthGuard untuk melindungi endpoint

@Controller('users')
@UseGuards(AuthGuard('jwt')) // Hanya pengguna yang terautentikasi yang dapat mengakses endpoint ini
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}