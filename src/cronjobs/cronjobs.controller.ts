import { Controller, Logger } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller('cronjobs')
export class CronjobsController {
  private readonly logger = new Logger(CronjobsService.name);
  constructor(
    private cronjobsService: CronjobsService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async scheduleCronjobs() {
    const cronjobs = await this.cronjobsService.getCronjobs();

    cronjobs.forEach((cronjob) => {
      const job = new CronJob(cronjob.crontab, () => {
        this.logger.warn(`set new job!`);
      });

      this.schedulerRegistry.addCronJob(cronjob.name, job);
      job.start();
    });
  }
}
