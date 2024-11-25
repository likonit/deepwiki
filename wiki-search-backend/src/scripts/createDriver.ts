import * as dotenv from "dotenv"
import * as neo4j from "neo4j-driver"

dotenv.config()

// Стандартная конфигурация для neo4j.
const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

export default function createDriver(): neo4j.Driver {

    return neo4j.driver(
        dbHost || 'neo4j://localhost:7687',
        neo4j.auth.basic(dbUser || 'neo4j', dbPass || 'neo4j')
    )

}