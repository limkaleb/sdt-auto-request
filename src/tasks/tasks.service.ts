// import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
// import dayjs from 'dayjs';
import { CronjobsService } from 'src/cronjobs/cronjobs.service';
import { Cronjob } from '@prisma/client';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    // private readonly httpService: HttpService,
    // private prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
    private cronjobsService: CronjobsService,
  ) {}

  async onModuleInit() {
    return this.addCronjobs();
  }

  async addCronjobs() {
    const cronjobs = await this.cronjobsService.getCronjobs();

    cronjobs.forEach((cronjob) => {
      const job = new CronJob(cronjob.crontab, () => {
        this.logger.warn(`set new job!`);
      });

      this.schedulerRegistry.addCronJob(cronjob.name, job);
      job.start();
    });
  }

  addCronjob(cronjob: Cronjob) {
    const job = new CronJob(cronjob.crontab, () => {
      this.logger.warn(`set a new job!`);
    });

    this.schedulerRegistry.addCronJob(cronjob.name, job);
    job.start();
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
    return `job ${name} deleted!`;
  }

  // @Cron('*/10 * * * * *')
  // async handleAddCron() {
  //   this.logger.log('called first cron every 10 seconds..');
  //   users.forEach((user) => {
  //     const month = dayjs(user.birthDate).get('month');
  //     this.logger.warn('date fetched month: ', month);

  //     // 0 9 * 8 *
  //     const job = new CronJob(`*/${month} 0 0 * * *`, () => {
  //       this.logger.warn(`set new job!`);
  //     });

  //     this.schedulerRegistry.addCronJob(user.firstName, job);
  //     job.start();
  //   });
  // }

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
