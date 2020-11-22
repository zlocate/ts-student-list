import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

// Пример реализации валидации Id (MongoDB ObjectId) при помощи Pipe'ов
@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
  async transform(value: string) {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid)
      throw new BadRequestException(
        `Передан некорректный идентификатор ${value}`,
      );
    return value;
  }
}
