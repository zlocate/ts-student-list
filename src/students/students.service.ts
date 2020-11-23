import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IStudent, IStudentsService } from './interfaces/index';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
@Injectable()
export class StudentsService implements IStudentsService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<IStudent>,
  ) {}
  async findAll(): Promise<IStudent[]> {
    return await this.studentModel.find({}).exec();
  }

  async findOne(options: CreateStudentDto): Promise<IStudent> {
    return await this.studentModel.findOne(options).exec();
  }

  async findById(ID: string): Promise<IStudent> {
    return await this.studentModel.findById(ID).exec();
  }

  async create(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const studentItem = new this.studentModel(createStudentDto);
    return studentItem.save();
  }
  async update(ID: string, newValue: UpdateStudentDto): Promise<IStudent> {
    return this.studentModel
      .findByIdAndUpdate(ID, newValue, { runValidators: true, new: true })
      .exec();
  }

  async delete(ID: string): Promise<IStudent> {
    return await this.studentModel.findByIdAndRemove(ID).exec();
  }
}
