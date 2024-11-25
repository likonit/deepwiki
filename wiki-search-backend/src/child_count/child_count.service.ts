import { Injectable } from '@nestjs/common';
import createDriver from 'src/scripts/createDriver';

@Injectable()
export class ChildCountService {

    async search_info(name: string): Promise<string> {

        const driver = createDriver()
    
        const result = await driver.executeQuery(
            `MATCH (parent)-[:PARENT]->(child)
            WHERE parent.name = "${name}"
            RETURN count(child) as cnt`
        )
    
        await driver.close()
    
        return result.records[0].get("cnt")
    
    }

}
