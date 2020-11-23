import { IStudent } from './istudents.interface';

export interface IStudentsService {
  findAll(): Promise<IStudent[]>;
  findById(ID: string): Promise<IStudent | null>;
  findOne(options: object): Promise<IStudent | null>;
  create(student: IStudent): Promise<IStudent>;
  update(ID: string, newValue: IStudent): Promise<IStudent | null>;
  delete(ID: string): Promise<IStudent>;
}
