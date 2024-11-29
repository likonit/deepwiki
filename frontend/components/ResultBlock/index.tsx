"use client";

import { useContext, useEffect, useState, ReactElement, useRef, createRef } from "react"
import { LoadingContext } from "../Main/Elements/search-button-provider"
import Image from "next/image";
import WikiBlock from "./Elements/wiki-block";
import Dots from "./Elements/dots";

import styles from "../../styles/ResultBlock/main.module.css"

import {Inter} from "next/font/google"

const font = Inter({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

export default function ResultBlock() {

    const [arrayElm, setArrayElm] = useState<ReactElement[]>([])
    const [headerElm, setHeaderElm] = useState<ReactElement>()

    const [leftArrows, setLeftArrows] = useState<ReactElement[]>([])
    const [rightArrows, setRightArrows] = useState<ReactElement[]>([])
    
    const {isLoading} = useContext(LoadingContext)

    const arrows_ref = useRef([])

    function select_word(count: number): string {

        switch(count) {
            case 1:
                return "ссылка"
            case 2:
            case 3:
            case 4:
                return "ссылки"
            default:
                return "ссылок"
        }

    }

    function select_rand(arr: string[]) {

        return arr[Math.round(Math.random() * (arr.length-1))]

    }

    useEffect(() => {

        (async function() {

            function spec_error(name: string) {

                setArrayElm([])
                setLeftArrows([])
                setRightArrows([])
                setHeaderElm(<h1>{name}</h1>)
                
            }

            if (!isLoading) return

            if (isLoading.type == 1) {

                setHeaderElm(<></>)
                setArrayElm([<div key={1} className={styles.main_module__loading}>Ищем связь<Dots></Dots></div>])

            }
            
            if (isLoading.type == 2) {

                if (isLoading.array.length > 0) {

                    if (isLoading.array[0] == "__xERRORx__") {

                        spec_error("Связь не найдена!")
                        return

                    }

                    if (isLoading.array[0] == "__NOT_FOUND__") {

                        spec_error(`Страницы ${isLoading.array[1]} не существует. Пожалуйста, выбирайте статьи из выпадающего списка`)
                        return

                    }

                    if (isLoading.array[0] == "__x500x__") {

                        spec_error(`Сервер недоступен.`)
                        return

                    }

                    const arrayToPush: ReactElement[] = []
                    const leftA: ReactElement[] = []
                    const rightA: ReactElement[] = []

                    arrows_ref.current = isLoading.array.map((_, i) => arrows_ref.current[i] || createRef())

                    isLoading.array.forEach((item, i) => {

                        const _img: ReactElement = (
                            <div className={styles.wiki__arrow_block__arrow} key={i} ref={arrows_ref.current[i]}>
                                <Image src="./assets/arrow.svg" alt="left_arrow" width={60} height={120}></Image>
                            </div>
                        )

                        const elm = <WikiBlock 
                                    name={item} 
                                    key={i} 
                                    num={i}
                                    arrow={arrows_ref.current[i]}>
                                    </WikiBlock>
                        if (i+1 != isLoading.array.length) {

                            if (i % 2 == 0) leftA.push(_img)
                                else rightA.push(_img)

                        }
                        arrayToPush.push(elm)

                    })

                    const colors_for_first_word = ["#F7C6A3", "#D2A68B", "#F2D8A7"]
                    const colors_for_second_word = ["#9DB6B8", "#BACED1", "#EAD18A"]

                    const headerText = (<h2 className={font.className}>
                        От статьи <span style={{color: select_rand(colors_for_first_word)}}>{isLoading.array[0]}</span> до <span style={{color: select_rand(colors_for_second_word)}}>{isLoading.array.at(-1)}</span> всего {isLoading.array.length-1} {select_word(isLoading.array.length-1)}
                    </h2>)

                    setHeaderElm(headerText)
                    setArrayElm(arrayToPush)
                    setLeftArrows(leftA)
                    setRightArrows(rightA)

                }
            }

        })()

    }, [isLoading])

    return (
        <section>
            <center className={styles.wiki_header}>
                {headerElm}
            </center>
            <div className={styles.wiki}>
                <div className={styles.wiki__arrow_block_left}>{leftArrows}</div>
                <div className={styles.wiki_container}>
                    {arrayElm}
                </div>
                <div className={styles.wiki__arrow_block_right}>{rightArrows}</div>
            </div>
        </section>

    )

}