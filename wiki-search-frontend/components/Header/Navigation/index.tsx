import NavigationElm from "./elements/nav-elm"
import styles from "../../../styles/header.module.css"

import {Noto_Sans_Display} from "next/font/google"

const font = Noto_Sans_Display({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

interface NavLink {
    link: string,
    name: string
}

export default function Navigation() {

    const links: NavLink[] = [
        {name: "Новости", link: "https://t.me/d33p_wiki"},
        {name: "Github", link: "https://github.com/likonit/deepwiki"},
        {name: "Контакты", link: "https://likonit.t.me"},
    ]
    return (
        <div className={styles.header__nav}>
            <nav className={styles.header__nav__container}>
                <ul className={font.className}>
                    {links.map((item, i) => {

                        return <NavigationElm key={i} name={item.name} link={item.link}>

                        </NavigationElm>

                    })}
                </ul>
            </nav>
        </div>
    )
}