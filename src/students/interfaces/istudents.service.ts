import { IStudent } from './istudents.interface';

export interface IStudentsService {
  findAll(): Promise<IStudent[]>;
  findById(ID: number): Promise<IStudent | null>;
  findOne(options: object): Promise<IStudent | null>;
  create(student: IStudent): Promise<IStudent>;
  update(ID: number, newValue: IStudent): Promise<IStudent | null>;
  delete(ID: number): Promise<IStudent>;
}
