"use client"

import SearchElm from "./Elements/search-elm"
import SearchButton from "./Elements/search-button"
import styles from "../../styles/main.module.css"

import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import { useState, useRef, useLayoutEffect } from "react"

import {Inter} from "next/font/google"

const font = Inter({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

export default function MainBlock() {

    const [from, setFrom] = useState<string | undefined>("")
    const [to, setTo] = useState<string | undefined>("")

    const [arrowAnimate, setArrowAnimate] = useState(false)

    const iconRef = useRef<HTMLSpanElement>(null)

    useLayoutEffect(() => {

        setTimeout(() => {

            setArrowAnimate(!arrowAnimate)

        }, 2000)


    }, [arrowAnimate])

    return (
        <section className={styles.main_block}>
            <h1 className={font.className}>Найдите кратчайшую связь между двумя статьями Википедии!</h1>
            <div className={styles.search_block}>
                <div className={styles.search_panel}>
                    <SearchElm fnc={setFrom} text="Статья, с которой начать"></SearchElm>
                    <span className={arrowAnimate ? styles.pointer_icon_active : styles.pointer_icon } ref={iconRef}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
                    </span>
                    <SearchElm fnc={setTo} text="Статья, в которую прийти"></SearchElm>
                </div>
                <SearchButton fromWord={from} toWord={to}></SearchButton>
            </div>
        </section>
    )

}