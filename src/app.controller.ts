import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { AppService } from './app.service';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { CronjobsService } from './cronjobs/cronjobs.service';
import { getDay, getMonth } from './utils/date-utils';
import { TasksService } from './tasks/tasks.service';
import config from './core/config';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cronjobService: CronjobsService,
    private readonly tasksService: TasksService,
  ) {}

  @Post('/user')
  async createUser(@Body() createUserDto: CreateUserDTO) {
    const date = new Date(createUserDto.birthDate).toISOString();
    const existingUser = await this.appService.getUser(createUserDto);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    if (!Object.keys(config.TIMEZONE_MAP).includes(createUserDto.location)) {
      throw new HttpException('Location not supported', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.appService.createUser({
      ...createUserDto,
      birthDate: date,
    });

    const month = dayjs(date).get('month');
    const day = dayjs(date).get('date');
    const cron = await this.cronjobService.createCronjob(newUser.id, {
      name: `${newUser.firstName}_birthday_message`,
      isEnabled: true,
      // crontab: `0 9 ${getDay(date)} ${getMonth(date)} *`,
      crontab: `*/10 * * * * *`,
    });

    this.tasksService.addCronjob(cron);
    return newUser;
  }

  @Put('/user/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateUserDTO,
  ) {
    const date = new Date(createUserDto.birthDate).toISOString();
    const user = await this.appService.updateUser(id, {
      ...createUserDto,
      birthDate: date,
    });

    const cron = await this.cronjobService.updateCronjobsByUserId(
      user.id,
      `0 9 ${getDay(date)} ${getMonth(date)} *`,
    );

    this.tasksService.deleteCron(cron.name);
    this.tasksService.addCronjob(cron);
    return user;
  }

  @Delete('/user/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const crons = await this.cronjobService.deleteCronjobsByUserId(id);
    this.tasksService.deleteCron(crons[0].name);
    await this.appService.deleteUser(id);
    return { status: 'success' };
  }

  @Get('/user/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.appService.getUserById(id);
    return user;
  }
}
