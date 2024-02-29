import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';

@Module({
  providers: [CronjobsService],
  exports: [CronjobsService],
})
export class CronjobsModule {}
