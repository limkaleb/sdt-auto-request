import { Global, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { HttpModule } from '@nestjs/axios';
import { CronjobsService } from 'src/cronjobs/cronjobs.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [TasksService, CronjobsService],
  exports: [TasksService],
})
export class TasksModule {}
