import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StudentMarks } from '../interfaces/studentMarks.enum';

@Schema()
export class Student {
  @Prop({ required: true })
  firstName: string;
  @Prop()
  middleName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  dob: Date;
  @Prop({ type: StudentMarks, enum: Object.keys(StudentMarks) })
  mark: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
