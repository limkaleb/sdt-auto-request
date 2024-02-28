import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CronjobsService {
  constructor(private prisma: PrismaService) {}

  async createCronjob(
    userId: number,
    data: Prisma.CronjobCreateWithoutUserInput,
  ) {
    return this.prisma.cronjob.create({
      data: {
        ...data,
        userId,
      },
    });
  }
}
