import { Injectable } from '@nestjs/common';
import * as neo4j from "neo4j-driver"
import createDriver from './scripts/createDriver';
import checkExisting from './scripts/checkExisting';

@Injectable()
export class AppService {

    async search_info(from: string, to: string): Promise<string> {

        if (!checkExisting(from)) return JSON.stringify(["__NOT_FOUND__", from])
        if (!checkExisting(to)) return JSON.stringify(["__NOT_FOUND__", to])

        const driver = createDriver()

        let result: neo4j.QueryResult, toRet: string[]

        if (from === to) {

            // Если у нас точка входа совпадает с выходом, то берем первого ребёнка
            // получится не самый оптимальный путь, но если мы включим режим,
            // при котором поиск осуществляется такой поиск, то получатся петли.
            const fisrt_child = await driver.executeQuery(`
                MATCH (parent)-[:PARENT]->(child)
                WHERE parent.name = "${from}"
                RETURN child.name as name
                Limit 1`
            )

            if (!fisrt_child.records[0].get("name")) {

                toRet = ["Error"]

            } else {

                // А здесь достраиваем кратчайший путь от первого ребенка до
                // конечной точки.
                result = await driver.executeQuery(
                    `MATCH (start:A {name: "${fisrt_child.records[0].get("name")}"}), (end:A {name: "${to}"})
                    MATCH path = shortestPath((start)-[:PARENT*]->(end))
                    RETURN [node IN nodes(path) | node.name] AS names`
                )

                toRet = [from].concat(result.records[0].get("names"))
                
            }


        } else {

            // В ином случае сразу получаем кратчайший путь.
            result = await driver.executeQuery(
                `MATCH (start:A {name: "${from}"}), (end:A {name: "${to}"})
                MATCH path = shortestPath((start)-[:PARENT*]->(end))
                RETURN [node IN nodes(path) | node.name] AS names`
            )

            toRet = result.records[0].get("names")

        }

        await driver.close()
        return JSON.stringify(toRet)

    }

}
