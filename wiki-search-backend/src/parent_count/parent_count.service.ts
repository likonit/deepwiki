import { Injectable } from '@nestjs/common';
import createDriver from 'src/scripts/createDriver';
import * as neo4j from "neo4j-driver"

@Injectable()
export class ParentCountService {

    async search_info(name: string): Promise<string> {

        const driver = createDriver()

        const result = await driver.executeQuery(
            `MATCH (parent)-[:PARENT]->(child)
            WHERE child.name = "${name}"
            RETURN count(parent) as cnt`
        )

        await driver.close()

        return JSON.stringify(result.records[0].get("cnt"))

    }

}
