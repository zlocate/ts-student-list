import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { StudentMarks } from '../interfaces/studentMarks.enum';

export class UpdateStudentDto {
  @ApiProperty({
    description: 'Student first name',
    example: 'Denis',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly firstName: string;
  @ApiPropertyOptional({
    description: 'Student middle name',
    example: 'Petrovich',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly middleName?: string;
  @ApiProperty({
    description: 'Student last name',
    example: 'Novikov',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly lastName: string;
  @ApiProperty({
    description: 'Student date of birth (dob) - ISO8601 type',
    example: '2017-06-07T14:34:08.700Z',
  })
  @IsDateString({
    message:
      'dob (date of birth) must be valid date (ISO8601 string), e.g 2017-06-07T14:34:08.700Z',
  })
  @IsOptional()
  readonly dob: Date;
  @ApiPropertyOptional({
    description: 'Student mark',
    enum: StudentMarks,
  })
  @IsOptional()
  @IsEnum(StudentMarks, {
    message: `mark should be one of: ${Object.values(StudentMarks)}`,
  })
  readonly mark?: StudentMarks;
}
