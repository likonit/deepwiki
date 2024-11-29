import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChildCountModule } from './child_count/child_count.module';
import { ParentCountModule } from './parent_count/parent_count.module';
import { CheckExistModule } from './check_exist/check_exist.module';

@Module({
  imports: [ChildCountModule, ParentCountModule, CheckExistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
