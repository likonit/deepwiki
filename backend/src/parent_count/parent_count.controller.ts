import { Controller, Get } from '@nestjs/common';
import { ParentCountService } from './parent_count.service';
import { Query } from '@nestjs/common';

@Controller()
export class ParentCountController {
  constructor(private readonly appService: ParentCountService) {}

  @Get("parent_count")
  async main(@Query() query): Promise<string> {

    if (!query.name) {

      return JSON.stringify({status: "error"})

    }
    return await this.appService.search_info(query.name)
  }
  
}
