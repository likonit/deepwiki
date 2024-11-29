import * as fs from "fs"
import * as dotenv from "dotenv"

dotenv.config()

// Файл, где будут храниться только проверенные связи.
const local_db = process.env.LOCAL_DB

const whole_data = new Set(JSON.parse(fs.readFileSync(local_db, "utf-8")))

export default function checkExisting(name: string): boolean {
    
    return whole_data.has(name)

}