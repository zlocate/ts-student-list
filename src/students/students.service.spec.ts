import { StudentSchema } from './schemas/student.schema';
import { StudentsService } from './students.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { StudentMarks } from './interfaces/studentMarks.enum';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/MongooseTestModule';

const deleteKeys = (object, keys) => {
  const item = Object.assign({}, object);
  keys.forEach((key) => delete item[key]);
  return item;
};

describe('StudentService', () => {
  let service: StudentsService;
  let createdUserId: number;
  let connection;

  const invalidObjectId = 123;
  const defaultUser = {
    firstName: 'Denis',
    middleName: 'Z',
    lastName: 'Locate',
    dob: new Date('2017-06-07T14:34:08.700Z'),
    mark: StudentMarks.Excellent,
  };
  const updatedUser = {
    firstName: 'Max',
    middleName: 'ZLocate',
    lastName: 'Ivanov',
    dob: new Date('2019-06-07T14:34:08.700Z'),
    mark: StudentMarks.Unsatisfactory,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
      ],
      providers: [StudentsService],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    connection = await module.get(getConnectionToken());
  });

  it('service is defined', () => {
    expect(service).toBeDefined();
  });

  it('[+] student created (with middle name and mark)', async () => {
    const createdUser = await service.create(defaultUser);
    createdUserId = createdUser._id;
    return expect(createdUser).toMatchObject(defaultUser);
  });

  it('[+] student created (with mark, without middle name)', async () => {
    const userData = deleteKeys(defaultUser, ['middleName']);
    const createdUser = await service.create(defaultUser);
    return expect(createdUser).toMatchObject(userData);
  });

  it('[+] student created (without mark and middle name)', async () => {
    const userData = deleteKeys(defaultUser, ['middleName', 'mark']);
    const createdUser = await service.create(defaultUser);
    return expect(createdUser).toMatchObject(userData);
  });

  it('[+] get user by id', async () => {
    const createdUser = await service.findById(createdUserId);
    return expect(createdUser).toMatchObject(defaultUser);
  });

  it('[+] update user (valid data)', async () => {
    const newUser = await service.update(createdUserId, updatedUser);
    return expect(newUser).toMatchObject(updatedUser);
  });

  it('[+] remove user by id', async () => {
    const deletedUser = await service.delete(createdUserId);
    return expect(deletedUser).toMatchObject(updatedUser);
  });

  it('[-] update user (user not found)', async () => {
    const newUser = await service.update(createdUserId, updatedUser);
    return expect(newUser).toBeNull();
  });

  it('[-] get user by valid id missed at db', async () => {
    const createdUser = await service.findById(createdUserId);
    return expect(createdUser).toBeNull();
  });

  it('[-] get user by invalid id', async () => {
    return service
      .findById(invalidObjectId)
      .catch((e) => expect(e.name).toBe('CastError'));
  });

  afterAll(async () => {
    await connection.close();
    await closeInMongodConnection();
  });
});
