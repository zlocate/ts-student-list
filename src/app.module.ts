import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/student-list', {
      useFindAndModify: false,
    }),
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
