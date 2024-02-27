import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export class AppE2ETestHelper {
  public app: INestApplication;
  public prismaService: PrismaService;

  public async close() {
    await this.prismaService.$disconnect();
    await this.app.close();
  }

  public async clearDatabase() {
    await this.prismaService.user.deleteMany();
    jest.restoreAllMocks();
  }
}
