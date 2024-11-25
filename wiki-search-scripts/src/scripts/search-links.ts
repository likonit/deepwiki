import * as request from "request"

// поиск ссылок на википедии по имени
export default async function rearchForLink(page_name: string): Promise<{links: string[], name: string}> {

    return new Promise(resolve => {

        request.get(`https://ru.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page_name)}&format=json&prop=links`, {}, (err, res, body) => {
        
            try {

                const links = JSON.parse(body).parse.links
                const toRet = []
                
                links.map(item => {

                    if (item.exists === "") {
                        
                        const link = item["*"]
                        let igonore = false

                        if (link.split(":").length > 1) {
                            
                            // такие страницы не парсим, потому что они служебные
                            const igonore_words = [
                                "Шаблон", "Обсуждение шаблона",
                                "Википедия", "Обсуждение Википедии", 
                                "Обсуждение", 
                                "Категория", "Обсуждение категории",
                                "Портал", "Обсуждение портала", 
                                "Модуль", "Обсуждение модуля", 
                                "Проект", "Обсуждение проекта",
                                "Файл", "Обсуждение файла",
                                "Участник", "Обсуждение участника", 
                                "Справка", "Обсуждение справки", 
                                "Участница",  "Обсуждение участницы", 
                                "Обсуждение MediaWiki", "MediaWiki", 
                                "Арбитраж", "Обсуждение арбитража",
                                "Инкубатор"
                            ]

                            const phrase = link.split(":")[0]
                            igonore = igonore_words.includes(phrase)

                        }

                        if (!igonore && !toRet.includes(link)) toRet.push(link)
                        
                    }
                    
                })

                resolve({links: toRet, name: page_name})

            } catch(e) {

                console.log("ERROR in page ", page_name)
                console.log(e)
                resolve({links: [], name: page_name})

            }

        })

    })

}