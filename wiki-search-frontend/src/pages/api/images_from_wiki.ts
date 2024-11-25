import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { title, size } = req.query

    if (!title || !size) 
        return res.status(400).json({ error: "Title, size parameter is required" })

    try {
        
        const response = await fetch(
            `https://ru.wikipedia.org/w/api.php?action=query&titles=${encodeURI(title instanceof Array? title[0] : title)}&prop=pageimages&format=json&pithumbsize=${size}`
        )

        res.status(200).json(await response.json())

    } catch (error: unknown) {

        if (error instanceof Error)
            res.status(500).json({ error: error.message });

    }

}