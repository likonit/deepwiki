import { Module } from '@nestjs/common';
import { ParentCountController } from './parent_count.controller';
import { ParentCountService } from './parent_count.service';

@Module({
  imports: [],
  controllers: [ParentCountController],
  providers: [ParentCountService],
})
export class ParentCountModule {}
