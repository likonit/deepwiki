"use client"

import styles from "../../../styles/main.module.css"
import { LoadingContext } from "./search-button-provider"
import React from "react"

export default function SearchButton({fromWord, toWord}: {fromWord: string | undefined, toWord: string | undefined}) {
    
    const {setLoading} = React.useContext(LoadingContext)

    async function search_in_bd(event: React.MouseEvent) {

        event.preventDefault()
        
        if (setLoading) setLoading({
            type: 1,
            array: []
        })

        const result = await fetch(`/api/link_search?from=${fromWord}&to=${toWord}`)
        const jsoned = await result.json()

        if (setLoading) setLoading({
            type: 2,
            array: !jsoned ? ["__xERRORx__"] : (jsoned.error ? ["__x500x__"] : jsoned)
        })

    }

    return (
        <div className={styles.button_block}>
            <button onClick={search_in_bd}>Найти</button>
        </div>
    )

}