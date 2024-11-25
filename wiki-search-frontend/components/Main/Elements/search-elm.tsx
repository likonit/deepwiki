"use client"

import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react"

import styles from "../../../styles/main.module.css"

import searchInWiki from "../../../scripts/search-in-wiki"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export default function SearchElm({fnc, text}: {fnc: Dispatch<SetStateAction<string | undefined>>, text: string}) {

    const [words, setWords] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string | undefined>("")

    const input = useRef<HTMLInputElement | null>(null)
    const wrapper = useRef<HTMLDivElement>(null)

    async function get_words(input_value: string) {

        const wordList: string[] = await searchInWiki(input_value)
        setWords(wordList)

    }

    useEffect(() => {

        function autoUpdateText() {

            setInputValue(input.current?.value)
            setTimeout(autoUpdateText, 50)

        }
        
        function handleClickOutside(event: MouseEvent) {

            if (wrapper.current && !wrapper.current.contains(event.target as Node)) {
                setWords([])
            }
            
        }

        document.addEventListener("mousedown", handleClickOutside)

        autoUpdateText()

    }, [])

    function generete_list(): React.ReactElement[] {
        
        const toRet: React.ReactElement[] = []
        words.map((item: string, i: number) => {

            toRet.push(<div key={i} onClick={() => {

                fnc(item)
                setInputValue(item)
                setWords([])

            }}>
                {item}
            </div>)

        })

        return toRet

    }

    return (
        <div className={styles.input_block}>
            <div className={inputValue?.length == 0 ? styles.input_close : styles.input_close_active}>
                <FontAwesomeIcon icon={faXmark} onClick={() => {

                    setInputValue("")
                    setWords([])

                }}></FontAwesomeIcon>
            </div>
            <input 
                value={inputValue}
                ref={input} 
                className={words.length == 0 ? styles.hidden : styles.active} 
                placeholder={text} 
                onInput={(e) => {

                    fnc(e.currentTarget.value)
                    setInputValue(e.currentTarget.value)
                    get_words(e.currentTarget.value)

            }}></input>
            <div className={words.length == 0 ? styles.hidden_answers : styles.visible_answers} ref={wrapper}>
                {generete_list()}
            </div>
        </div>
    )

}