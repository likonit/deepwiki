import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        const { from, to } = req.query

        const response = await fetch(
            `http://localhost:3005/search?from=${from}&to=${to}`
        )

        res.status(200).json(await response.json())

    } catch(e: unknown) {

        if (e instanceof Error)
            res.status(500).json({ error: e.message });

    }

}