import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const text = req.query.text instanceof Array ? req.query.text[0] : req.query.text

    if (!text) 
        return res.status(400).json({ error: "Text parameter is required" })

    try {
        
        const response = await fetch(
            `https://ru.wikipedia.org/w/api.php?action=opensearch&search=${encodeURI(text)}&limit=7&namespace=0&format=json`
        )

        const list = (await response.json())[1]
        const result: string[] = []
        
        async function list_analyze(i: number) {

            try {

                if (i == list.length) return result

                // Дополнительно проверяем, есть ли имя в базе
                // потому что есть много статей, которые отображаются в поиске
                // но на самом деле они просто редиректят/удалены/не существуют.
                const answ: {result: boolean} = await (await fetch(
                    `http://localhost:3005/check_exist?name=${list[i]}`
                )).json()

                if (answ.result) result.push(list[i])
                return await list_analyze(i+1)

            } catch(e: unknown) {
                
                if (e instanceof Error)
                    return []

            }

        } 

        res.status(200).json(await list_analyze(0))

    } catch (error: unknown) {

        if (error instanceof Error) {

            res.status(500).json({ error: error.message})

        }

    }

}