import * as dotenv from 'dotenv'
import start_analyse_que from './scripts/que-analyse'

dotenv.config()

// Стандартная конфигурация для neo4j.
const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS


// Файл, куда будут записываться страницы, которые полностью обработаны,
// то есть те, у которых были найдены дети.
const outputFile = process.env.OUTPUT_FILE

// Файл, где будет содержаться резервная очередь.
const statusFile = process.env.STATUS_FILE

// Файл, отвечающий за установку in_sleep mode.
const inSleepFile = process.env.INSLEEP_FILE


// Частота выведения промежуточного количества обработанных страниц.
const consoleOutputCount = Number(process.env.CONSOLE_FREQ)


start_analyse_que(process.argv[2] || "Россия", {
    dbHost: dbHost,
    dbUser: dbUser,
    dbPass: dbPass,
    outputFile: outputFile,
    statusFile: statusFile,
    inSleepFile: inSleepFile,
    consoleOutputCount: consoleOutputCount
})