import * as neo4j from "neo4j-driver"
import rearchForLink from "./search-links"
import DatabaseConnection from "../types/database.type"

export default async function writeToDB(search_name: string, database_info: DatabaseConnection): Promise<{
    links: string[],
    _name: string,
    need_write: boolean
}> {

    function createDriver(): neo4j.Driver {

        // Совет по организации БД: установить индекс на name.
        return neo4j.driver(
            database_info.dbHost || "neo4j://localhost:7687",
            neo4j.auth.basic(database_info.dbUser || "neo4j", database_info.dbPass || "neo4j"),
            {
                maxConnectionPoolSize: 30000,
                connectionAcquisitionTimeout: 20000
            }
        )

    }

    let driver = createDriver()

    async function execute_batch(list: string[], main_parent: string, attempt: number = 3) {

        let query = ""

        try {
            
            // в Cypher нужно экранировать кавычки.
            function escapeString(str: string) {
                return str
                    .replace(/"/g, '\\\\"')
                    .replace(/'/g, "\\'")
            }
            
            const return_list = list.map(item =>
                `"${escapeString(item)}"`
            ).join(',')
            
            const parent_name = escapeString(main_parent);
            
            // Основной запрос формирования базы
            // формируем связь (текущая_страница - родитель)->(ссылки на странице - дети).
            query = `
                CALL apoc.periodic.iterate(
                    'UNWIND [${return_list}] AS element
                    RETURN element',
                    '
                    WITH element
                    MERGE (b:A {name: "${parent_name}"})
                    MERGE (elm:A {name: element})
                    MERGE (b)-[:PARENT]->(elm)
                    ',
                    {batchSize: 300, parallel: true}
                )
            `
            
            await driver.executeQuery(query)
            await driver.close()

        } catch(e) {

            // Бывают единичные сбои, происхождение которых мне неизвестно.
            // Для таких случаев нужно просто перезапустить драйвер.
            console.log(e)
            return await new Promise(async (res, rej) => {

                await driver.close()

                console.log("driver was recreated")

                driver = createDriver()
                
                if (attempt == 0) return "error"
                setTimeout(res, (4-attempt)*2000)

            }).then(() => {

                return execute_batch(list, main_parent, attempt-1)

            })

        }

    }

    const data = await rearchForLink(search_name)
    const {name, links} = data

    if (links.length == 0) {
        
        // Нам не нужны элементы без детей.
        await driver.close()
        return {links: links, _name: name, need_write: false}
    
    }

    await execute_batch(links, name)
    return {links: links, _name: name, need_write: true}

}