import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('message')
export class QueueConsumer {
  private readonly logger = new Logger(QueueConsumer.name);

  @Process()
  async dequeue(job: Job<unknown>) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
    return {};
  }
}
