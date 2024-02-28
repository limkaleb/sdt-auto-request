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

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cronjobService: CronjobsService,
  ) {}

  @Post('/user')
  async createUser(@Body() createUserDto: CreateUserDTO) {
    const date = new Date(createUserDto.birthDate).toISOString();
    const existingUser = await this.appService.getUser(createUserDto);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.appService.createUser({
      ...createUserDto,
      birthDate: date,
    });

    const month = dayjs(date).get('month');
    const day = dayjs(date).get('date');
    await this.cronjobService.createCronjob(newUser.id, {
      name: `${newUser.firstName}_birthday_message`,
      isEnabled: true,
      crontab: `0 9 ${day} ${month} *`,
    });

    return newUser;
  }

  @Put('/user/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateUserDTO,
  ) {
    const date = new Date(createUserDto.birthDate).toISOString();
    const user = await this.appService.updateUser(Number(id), {
      ...createUserDto,
      birthDate: date,
    });

    const month = dayjs(date).get('month');
    const day = dayjs(date).get('date');
    await this.cronjobService.createCronjob(user.id, {
      name: `${user.firstName}_birthday_message`,
      isEnabled: true,
      crontab: `0 9 ${day} ${month} *`,
    });

    return user;
  }

  @Delete('/user/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.appService.deleteUser(Number(id));
    return { status: 'success' };
  }

  @Get('/user/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.appService.getUserById(Number(id));
    return user;
  }
}
