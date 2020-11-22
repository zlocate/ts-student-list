import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Error } from 'mongoose';

// Пример реализации exception filter'а
// В данном случае используется для обработки ValidationError
// Данная ошибка произойдет если данные пройдут валидацию на уровне запроса (DTO), однако не пройдут валидацию на уровне модели Mongoose
// (например если в процессе обработки данных будет получен некорректный результат)
// Проверить работу фильтра можно исключив валидатор для mark на уровне DTO.

@Catch(Error.ValidationError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: Error.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    return res.status(HttpStatus.BAD_REQUEST).send({
      message: exception.message,
    });
  }
}
