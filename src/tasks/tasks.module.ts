import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { HttpModule } from '@nestjs/axios';
import { QueueService } from 'src/queue/queue.service';
import { QueueModule } from 'src/queue/queue.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    QueueModule,
    BullModule.registerQueue({
      name: 'message',
    }),
  ],
  providers: [TasksService, QueueService],
  exports: [QueueService],
})
export class TasksModule {}
