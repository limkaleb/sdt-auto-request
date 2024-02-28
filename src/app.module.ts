import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [
    PrismaModule,
    TasksModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
