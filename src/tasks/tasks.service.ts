import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueueService } from 'src/queue/queue.service';
import { CronJob } from 'cron';
import dayjs from 'dayjs';

// import { lastValueFrom } from 'rxjs';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly queueService: QueueService,
    private readonly httpService: HttpService,
    private prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // addValueWithDelay(value) {
  //   console.log('ading value...');
  //   setTimeout(() => {
  //     this.queueService.enqueue(`${value}, happy bdayyyyyy to youuu!`);
  //     console.log(`Added ${value} to the array`); // log message to console
  //   }, 1000); // set delay time in milliseconds (e.g. 1 second)
  // }

  // getCrons() {
  //   const jobsList = [];
  //   const jobs = this.schedulerRegistry.getCronJobs();
  //   jobs.forEach((value, key) => {
  //     let next;
  //     try {
  //       next = new Date(value.nextDates().ts);
  //     } catch (e) {
  //       next = 'error: next fire date is in the past!';
  //     }
  //     this.logger.log(`job: ${key} -> next: ${next}`);
  //     jobsList.push({ name: key, time: next });
  //   });
  //   return jobsList;
  // }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleAddCron() {
    this.logger.log('called first cron every 10 seconds..');

    // const jobs = this.schedulerRegistry.getCronJobs();
    // this.logger.log('jobs fetched: ', jobs);

    // handle get date
    const users = await this.prisma.user.findMany({
      where: {
        lastMessageAt: null,
      },
    });
    this.logger.log('users fetched: ', users);

    users.forEach((user) => {
      const month = dayjs(user.birthDate).get('month');
      this.logger.warn('date fetched month: ', month);

      // 0 9 * 8 *
      const job = new CronJob(`*/${month} 0 0 * * *`, () => {
        this.logger.warn(`set new job!`);
      });

      this.schedulerRegistry.addCronJob(user.firstName, job);
      job.start();
    });

    // this.logger.warn(
    //   `job ${name} added for each minute at ${seconds} seconds!`,
    // );
  }

  // @Cron('* * * */1 * *')
  // async handleCron2() {
  //   this.logger.log('Called second cron every 2 seconds..');
  // for (let i = 1; i <= 5; i++) {
  //   this.addValueWithDelay(i * 10); // pass in value multiplied by 10
  // }

  // for (let i = 0; i < 10; i++) {
  //   await this.queueService.enqueue(`${i}, happy bdayyyyyy to youuu!`);
  // }
  // const data = await lastValueFrom(
  //   this.httpService.post(
  //     'https://email-service.digitalenvision.com.au/send-email',
  //     {
  //       email: 'test@digitalenvision.com.au',
  //       message: 'Hello, nice to meet you.',
  //     },
  //   ),
  // );
  // console.log('data: ', data);
  // }
}
