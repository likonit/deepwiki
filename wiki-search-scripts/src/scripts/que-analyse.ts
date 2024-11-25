import Config from "../types/config.type"
import writeToDB from "./write-to-db"
import * as fs from "fs"

// Формирование базы.
export default async function start_analyse_que(
    start_name: string,
    config: Config
) {

    // Если устанавливаем меньше 13, то wikipedia api выдаст ошибку.
    const time_per_page = 13

    // Резервная очередь, котоая формируется при in_sleep mode или
    // вручную, если нужно доформировать связи.
    const reversed_que: Set<string> = new Set(JSON.parse(fs.readFileSync(config.statusFile, "utf-8")).que_reserve)
    const setted_arr = new Set(JSON.parse(fs.readFileSync(config.outputFile, "utf-8")))

    let que: Set<string> = reversed_que.size > 0 ? reversed_que : new Set((await writeToDB(start_name, {
        dbPass: config.dbPass,
        dbHost: config.dbHost,
        dbUser: config.dbUser
    })).links),
        in_sleep = false,
        count = setted_arr.size

    function check_status() {

        // Если нужно прервать обработку базы, но сохранить текущую очередь
        // то указываем в INSLEEP_FILE {"need_check":false}.
        const {need_check} = JSON.parse(fs.readFileSync(config.inSleepFile, "utf-8"))
        in_sleep = need_check

    }

    async function get_que() {

        check_status()

        if (in_sleep) {

            fs.writeFileSync(config.statusFile, JSON.stringify({
                que_reserve: Array.from(que)
            }), "utf-8")

            setTimeout(get_que, 300)
            console.log("mode: in sleep")
            return

        }

        if (que.size == 0) {

            setTimeout(get_que, 100)
            console.log("que is epmpty")
            return
    
        }

        while ((setted_arr.has(que.values().next().value)) && que.size > 0) {

            que.delete(que.values().next().value)

        }

        const firstElm = que.values().next().value

        if (firstElm != undefined) {

            try {

                // Асинхронно обрабатываем страницы, чтобы получить
                // максимальную скорость.
                writeToDB(firstElm, {
                    dbPass: config.dbPass,
                    dbHost: config.dbHost,
                    dbUser: config.dbUser
                }).then((data: {
                    links: string[], 
                    _name: string,
                    need_write: boolean
                }) => {

                    if (!data.need_write) return

                    setted_arr.add(data._name)

                    // Снижаем нагрузку и повышаем скорость, записывая файл асинхронно
                    // и раз в 2000 обработок.
                    if (count % 2000 == 0) {

                        fs.writeFile(config.outputFile, JSON.stringify(Array.from(setted_arr)), "utf-8", () => {})

                    }
                    
                    count++
    
                    if (count % config.consoleOutputCount == 0)
                        console.log(`|${data._name}| ${count}/3.000K (${((count/3000000)*100).toFixed(2)}%). ql: ${que.size})`)
                    
                    // Добавляем в очередь все дочерние элементы (ссылки на страницу).
                    data.links.forEach(item => que.add(item))

                })

            } catch(e) {

                console.log(e)

            }

            que.delete(que.values().next().value)

        }
    
        setTimeout(get_que, time_per_page)
    
    }
    
    get_que()

}