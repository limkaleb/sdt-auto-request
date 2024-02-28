import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateUserDTO } from './dtos/CreateUser.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUser(user: CreateUserDTO) {
    return this.prisma.user.findFirst({
      where: {
        ...user,
        birthDate: new Date(user.birthDate),
      },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
}
