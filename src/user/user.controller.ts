import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { IUserDTO } from 'src/dto/user';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}
  @Post('create')
  async signupUser(@Body() userData: IUserDTO): Promise<UserModel> {
    return this.user.createUser(userData);
  }

  @Get()
  async searchByEmail(@Body() userData: IUserDTO) {
    const user = await this.user.searchByEmail(userData);

    return user;
  }

  @Get('all')
  async searchUsers() {
    const users = await this.user.searchUsers();

    return users;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const result = await this.user.deleteUser(id);
    if (!result) {
      throw new NotFoundException('usuário não encontrada');
    }
    return { message: 'Usuário excluído com sucesso' };
  }
}
