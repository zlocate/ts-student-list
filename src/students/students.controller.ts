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
  UseFilters,
} from '@nestjs/common';

import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { MongoExceptionFilter } from '../shared/filters/mongo-exception.filter';

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
  public async findStudent(@Response() res, @Body() body: UpdateStudentDto) {
    const queryCondition = body;
    const data = await this.studentService.findOne(queryCondition);
    if (!data)
      throw new NotFoundException('По заданным критериям объект не найден');
    return res.json({ data });
  }

  @Get(':id')
  public async getStudent(
    @Response() res,
    @Param('id', new ValidateObjectId()) id: number,
  ) {
    const data = await this.studentService.findById(id);
    if (!data) throw new NotFoundException(`Студент с id ${id} не найден`);
    return res.json({ data });
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Запись успешно создана.',
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации',
  })
  @UseFilters(MongoExceptionFilter)
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
    description: 'Запись с указанным Id успешно удалена',
  })
  @ApiResponse({
    status: 404,
    description: 'Запись с указанным Id не найдена (студент не найден)',
  })
  @UseFilters(MongoExceptionFilter)
  public async updateStudent(
    @Param('id', new ValidateObjectId()) id: number,
    @Response() res,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const data = await this.studentService.update(id, updateStudentDto);
    if (!data) throw new NotFoundException(`Студент с id ${id} не найден`);
    return res.json({ data });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Запись с указанным Id успешно удалена',
  })
  @ApiResponse({
    status: 404,
    description: 'Запись с указанным id не найдена',
  })
  public async deleteStudent(
    @Param('id', new ValidateObjectId()) id: number,
    @Response() res,
  ) {
    const data = await this.studentService.delete(id);
    if (!data) throw new NotFoundException(`Студент с id ${id} не найден`);
    return res.json({ data });
  }
}
