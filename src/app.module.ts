import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { CronjobsService } from './cronjobs/cronjobs.service';
import { TasksService } from './tasks/tasks.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PrismaModule,
    CronjobsModule,
    ScheduleModule.forRoot(),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    QueueModule,
    CronjobsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronjobsService, TasksService],
})
export class AppModule {}
