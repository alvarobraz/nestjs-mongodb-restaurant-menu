import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUserDTO } from 'src/dto/user';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: IUserDTO): Promise<User> {
    const emailExists = await this.searchByEmail(userData);
    if (emailExists) {
      throw new NotFoundException('O email já existe.');
    }

    const createUser = await this.prisma.user.create({ data: userData });
    return createUser;
  }

  async searchByEmail({ email }: IUserDTO) {
    const checkEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (checkEmail) return true;
    return false;
  }

  async searchUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async deleteUser(id: string): Promise<boolean> {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return false;
    }
    await this.prisma.user.delete({
      where: { id },
    });

    return true;
  }
}
