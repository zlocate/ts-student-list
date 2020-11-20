import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
  async transform(value: string) {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestException(`${value} is invalid ObjectId`);
    return value;
  }
}
