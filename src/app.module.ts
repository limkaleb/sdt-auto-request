import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { CronjobsService } from './cronjobs/cronjobs.service';
import { CronjobsController } from './cronjobs/cronjobs.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [
    PrismaModule,
    CronjobsModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    QueueModule,
    CronjobsModule,
  ],
  controllers: [AppController, CronjobsController],
  providers: [AppService, CronjobsService, TasksService],
})
export class AppModule {}
