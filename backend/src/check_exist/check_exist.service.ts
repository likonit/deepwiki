import { Injectable } from '@nestjs/common';
import checkExisting from 'src/scripts/checkExisting';

@Injectable()
export class CheckExistService {

    async search_info(name: string): Promise<string> {

        return JSON.stringify({result: checkExisting(name)})

    }

}