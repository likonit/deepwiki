import { Controller, Get } from '@nestjs/common';
import { CheckExistService } from './check_exist.service';
import { Query } from '@nestjs/common';

@Controller()
export class CheckExistController {
  constructor(private readonly appService: CheckExistService) {}

  @Get("check_exist")
  async getHello(@Query() query): Promise<string> {

    if (!query.name) {

      return JSON.stringify({status: "error"})

    }

    return await this.appService.search_info(query.name)
  }
  
}
