import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("search")
  async main(@Query() query): Promise<string> {

    if (!query.from || !query.to) {

      return JSON.stringify({status: "error"})

    }
    return await this.appService.search_info(query.from, query.to)
  }
  
}
