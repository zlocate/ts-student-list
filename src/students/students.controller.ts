import {
  Controller,
  Get,
  Response,
  Param,
  Body,
  Post,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}
  @Get()
  public async getStudents(@Response() res) {
    const data = await this.studentService.findAll();
    return res.json({ data });
  }
  @Get('/find')
  public async findStudent(@Response() res, @Body() body) {
    const queryCondition = body;
    const data = await this.studentService.findOne(queryCondition);
    return res.json({ data });
  }

  @Get(':id')
  public async getStudent(
    @Response() res,
    @Param('id', new ValidateObjectId()) id: number,
  ) {
    const data = await this.studentService.findById(id);
    console.log(data);
    if (!data) throw new NotFoundException(`Student with id ${id} not found`);
    return res.json({ data });
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  public async createStudent(
    @Response() res,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    const data = await this.studentService.create(createStudentDto);
    res.json({ data });
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Student successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Student with given id not found',
  })
  public async updateStudent(
    @Param('id', new ValidateObjectId()) id: number,
    @Response() res,
    @Body() body,
  ) {
    const data = await this.studentService.update(id, body);
    if (!data) throw new NotFoundException(`Student with id ${id} not found`);
    return res.json({ data });
  }

  @Delete(':id')
  @ApiResponse({
    status: 404,
    description: 'Student with given id not found',
  })
  public async deleteStudent(
    @Param('id', new ValidateObjectId()) id: number,
    @Response() res,
  ) {
    const data = await this.studentService.delete(id);
    if (!data) throw new NotFoundException(`Student with id ${id} not found`);
    return res.json({ data });
  }
}
