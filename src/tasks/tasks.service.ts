import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CronjobsService } from 'src/cronjobs/cronjobs.service';
import config from 'src/core/config';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
    private cronjobsService: CronjobsService,
  ) {}

  async onModuleInit() {
    return this.addCronjobs();
  }

  async addCronjobs() {
    const { TIMEZONE_MAP, SEND_EMAIL_TARGET, SEND_EMAIL_URL } = config;
    const cronjobs = await this.cronjobsService.getCronjobs();

    cronjobs.forEach((cronjob) => {
      const { firstName, lastName, location } = cronjob.user;
      const job = new CronJob(
        cronjob.crontab,
        () => {
          this.logger.warn(`Sending email!`);
          this.httpService.post(SEND_EMAIL_URL, {
            email: SEND_EMAIL_TARGET,
            message: `Hey, ${firstName} ${lastName} it's your birthday`,
          });
        },
        null, // onComplete
        true, // start
        TIMEZONE_MAP[location], // timeZone
      );

      this.schedulerRegistry.addCronJob(cronjob.name, job);
      job.start();
    });
  }

  async addCronjob(cronjob: any) {
    const { TIMEZONE_MAP, SEND_EMAIL_TARGET, SEND_EMAIL_URL } = config;
    const { firstName, lastName, location } = cronjob.user;
    const job = new CronJob(
      cronjob.crontab,
      async () => {
        this.logger.warn(`Sending email!`);
        this.httpService.post(SEND_EMAIL_URL, {
          email: SEND_EMAIL_TARGET,
          message: `Hey, ${firstName} ${lastName} it's your birthday`,
        });
      },
      null, // onComplete
      true, // start
      TIMEZONE_MAP[location], // timeZone
    );

    this.schedulerRegistry.addCronJob(cronjob.name, job);
    job.start();
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
    return `job ${name} deleted!`;
  }
}
