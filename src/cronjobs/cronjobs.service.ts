import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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
      include: {
        user: true,
      },
    });
  }

  async getCronjobs() {
    return this.prisma.cronjob.findMany({
      include: {
        user: true,
      },
    });
  }

  async getCronjobById(id: number) {
    return this.prisma.cronjob.findUnique({
      where: {
        id,
      },
    });
  }

  async updateCronjobsByUserId(userId: number, crontab: string) {
    const cron = await this.prisma.cronjob.findFirst({
      where: {
        userId,
      },
    });

    return this.prisma.cronjob.update({
      data: {
        crontab,
      },
      where: {
        id: cron.id,
      },
    });
  }

  async deleteCronjobsByUserId(userId: number) {
    return this.prisma.cronjob.deleteMany({
      where: {
        userId,
      },
    });
  }
}
