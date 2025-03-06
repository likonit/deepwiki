import { Controller, Get } from '@nestjs/common';
import { ChildCountService } from './child_count.service';
import { Query } from '@nestjs/common';

@Controller()
export class ChildCountController {
  constructor(private readonly appService: ChildCountService) {}

  @Get("child_count")
  async main(@Query() query): Promise<string> {

    if (!query.name) {

      return JSON.stringify({status: "error"})

    }
    return await this.appService.search_info(query.name)
  }
  
}
