import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { QueueConsumer } from './queue.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message',
    }),
  ],
  providers: [QueueService, QueueConsumer],
})
export class QueueModule {}
