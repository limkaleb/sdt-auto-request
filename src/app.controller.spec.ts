import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaService } from './prisma/prisma.service';
// import { CreateUserDTO } from './dtos/CreateUser.dto';
import { PrismaModule } from './prisma/prisma.module';

describe('AppController', () => {
  // let appController: AppController;
  // let appService: AppService;
  // let prismaService: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // appController = app.get<AppController>(AppController);
    // prismaService = app.get<PrismaService>(PrismaService);
  });

  // afterAll(async () => {
  //   const app: TestingModule = await Test.createTestingModule({
  //     controllers: [AppController],
  //     providers: [AppService],
  //   }).compile();

  //   await prismaService.$disconnect();
  //   await app.close();
  // });

  // afterEach(async () => {
  //   await prismaService.user.deleteMany();
  //   jest.restoreAllMocks();
  // });

  // describe('.createUser', () => {
  //   it('should create user successfully"', async () => {
  //     const user: CreateUserDTO = {
  //       firstName: 'aaa',
  //       lastName: 'bbb',
  //       birthDate: '1990-2-3',
  //       location: 'jakarta',
  //     };
  //     jest.spyOn(appService, 'createUser').mockImplementation(async () => {
  //       status: 'success';
  //     });
  //     const response = await appController.createUser(user);
  //     console.log('response: ', response);
  //     expect(response.firstName).toBe('aaa');
  //     // expect(response).toStrictEqual({ status: 'success' });
  //     // expect(response.birthDate)
  //   });
  // });
});
