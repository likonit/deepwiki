import { Module } from '@nestjs/common';
import { ChildCountController } from './child_count.controller';
import { ChildCountService } from './child_count.service';

@Module({
  imports: [],
  controllers: [ChildCountController],
  providers: [ChildCountService],
})
export class ChildCountModule {}
