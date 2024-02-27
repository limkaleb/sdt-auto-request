import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dtos/CreateUser.dto';
// import dayjs from 'dayjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/user')
  async createUser(@Body() createUserDto: CreateUserDTO) {
    // const currentUserTimezone = dayjs().tz().guess();
    // console.log('current time zoneee: ', currentUserTimezone);
    const date = new Date(createUserDto.birthDate).toISOString();
    const user = await this.appService.createUser({
      ...createUserDto,
      birthDate: date,
    });
    return user;
  }

  @Delete('/user/:id')
  async deleteUser(@Param() params: any) {
    const user = await this.appService.deleteUser(Number(params.id));
    console.log('userr: ', user);
    return { status: 'success' };
  }
}
