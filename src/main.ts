import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

class NestApp {
  app: INestApplication;
  async prepare() {
    this.app = await NestFactory.create(AppModule);
    await this.app.listen(3000);
  }
}

async function bootstrap() {
  const app = new NestApp();
  await app.prepare();
}
bootstrap();
