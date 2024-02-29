import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { CronjobsService } from './cronjobs/cronjobs.service';
import { TasksService } from './tasks/tasks.service';
import { HttpModule } from '@nestjs/axios';
import { SchedulerRegistry } from '@nestjs/schedule';

describe('AppController Unit Tests', () => {
  let appController: AppController;
  let spyService: AppService;
  let cronjobsService: CronjobsService;
  let tasksService: TasksService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: AppService,
      useFactory: () => ({
        createUser: jest.fn(() => ({ id: 1 })),
        getUsers: jest.fn(() => []),
        getUser: jest.fn(() => {}),
        getUserById: jest.fn(() => {}),
        deleteUser: jest.fn(() => {}),
        updateUser: jest.fn(() => ({ id: 1 })),
      }),
    };
    const CronjobsServiceProvider = {
      provide: CronjobsService,
      useFactory: () => ({
        createCronjob: jest.fn(() => {}),
        getCronjobs: jest.fn(() => []),
        getCronjobById: jest.fn(() => {}),
        updateCronjobsByUserId: jest.fn(() => ({ id: 1 })),
        deleteCronjobsByUserId: jest.fn(() => [{ name: 'aaa' }]),
      }),
    };
    const TasksServiceProvider = {
      provide: TasksService,
      useFactory: () => ({
        addCronjobs: jest.fn(() => []),
        addCronjob: jest.fn(() => []),
        deleteCron: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [
        AppService,
        ApiServiceProvider,
        CronjobsService,
        CronjobsServiceProvider,
        TasksService,
        TasksServiceProvider,
        SchedulerRegistry,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    spyService = app.get<AppService>(AppService);
    cronjobsService = app.get<CronjobsService>(CronjobsService);
    tasksService = app.get<TasksService>(TasksService);
  });

  it('calling createUser method', async () => {
    const date = '1990-2-3';
    const dto: CreateUserDTO = {
      firstName: 'aaa',
      lastName: 'bbb',
      birthDate: new Date(date).toISOString(),
      location: 'Jakarta',
    };
    await appController.createUser(dto);
    expect(spyService.getUser).toHaveBeenCalled();
    expect(spyService.createUser).toHaveBeenCalled();
    expect(spyService.createUser).toHaveBeenCalledWith(dto);
    expect(cronjobsService.createCronjob).toHaveBeenCalled();
    expect(tasksService.addCronjob).toHaveBeenCalled();
  });

  it('calling deleteUser method', async () => {
    const userId = 1;
    await appController.deleteUser(userId);
    expect(cronjobsService.deleteCronjobsByUserId).toHaveBeenCalled();
    expect(tasksService.deleteCron).toHaveBeenCalled();
    expect(spyService.deleteUser).toHaveBeenCalled();
    expect(spyService.deleteUser).toHaveBeenCalledWith(userId);
  });

  it('calling updateUser method', async () => {
    const userId = 1;
    const date = '1990-2-3';
    const dto: CreateUserDTO = {
      firstName: 'aaa',
      lastName: 'bbb',
      birthDate: new Date(date).toISOString(),
      location: 'Jakarta',
    };
    await appController.updateUser(userId, dto);
    expect(spyService.updateUser).toHaveBeenCalled();
    expect(spyService.updateUser).toHaveBeenCalledWith(userId, dto);
    expect(cronjobsService.updateCronjobsByUserId).toHaveBeenCalled();
    expect(tasksService.deleteCron).toHaveBeenCalled();
    expect(tasksService.addCronjob).toHaveBeenCalled();
  });

  it('calling getUserById method', async () => {
    const userId = 1;
    await appController.getUserById(userId);
    expect(spyService.getUserById).toHaveBeenCalled();
    expect(spyService.getUserById).toHaveBeenCalledWith(userId);
  });

  it('calling getUsers method', async () => {
    await appController.getUsers();
    expect(spyService.getUsers).toHaveBeenCalled();
  });
});
