import { Document } from 'mongoose';
import { StudentMarks } from '../interfaces/studentMarks.enum';
export interface IStudent extends Document {
  readonly firstName: string;
  readonly middleName?: string;
  readonly lastName: string;
  readonly dob: Date;
  readonly mark?: StudentMarks;
}
