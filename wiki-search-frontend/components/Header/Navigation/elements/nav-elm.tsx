"use client";

import { useState } from "react"
import styles from "../../../../styles/header.module.css"

export default function NavigationElm({link, name}: {link: string, name: string}) {

    const [inHover, setInHover] = useState(false)

    return (
        <li className={styles.header__nav__container__elm}>
            <a 
            target="_blank"
            href={link}
            onMouseLeave={() => {setInHover(false)}}
            onMouseEnter={() => {setInHover(true)}}
            >{name}</a>
            <span className={styles.header__nav__container__elm__underline}>
                <span 
                className={inHover ? 
                    styles.header__nav__container__elm__underline_active : 
                    styles.header__nav__container__elm__underline_noactive}
                >
                </span>
            </span>
        </li>
    )

}