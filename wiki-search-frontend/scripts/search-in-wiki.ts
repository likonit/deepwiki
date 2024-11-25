export default async function searchInWiki(text: string): Promise<string[]> {

    let toRet: string[] = []
    
    if (text.trim() !== "") {

        try {

            const result = await fetch(`/api/wikipedia?text=${text}`)
            const jsoned = await result.json()
            toRet = jsoned

        } catch(e: unknown) {

            if (e instanceof Error)
                toRet = []
            
        }

    }

    return toRet

}