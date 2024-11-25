import { Module } from '@nestjs/common';
import { CheckExistController } from './check_exist.controller';
import { CheckExistService } from './check_exist.service';

@Module({
  imports: [],
  controllers: [CheckExistController],
  providers: [CheckExistService],
})
export class CheckExistModule {}
