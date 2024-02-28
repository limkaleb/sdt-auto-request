import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('message')
    private messageQueue: Queue,
  ) {}

  async enqueue(message) {
    await this.messageQueue.add({ message }, { delay: 5000 });
  }
}
