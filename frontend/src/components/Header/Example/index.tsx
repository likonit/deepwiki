import styles from "../../../styles/header.module.css" 
import {Noto_Sans_Display} from "next/font/google"

const font = Noto_Sans_Display({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

export default function ExampleBlock() {

    return (
        <div className={styles.example_block}>
            <div>
                <h2 className={font.className}>deepwiki хранит:</h2>
                <p className={font.className}>• 2.848.191 статью</p>
                <p className={font.className}>• 142.943.288 связей</p>
            </div>
        </div>
    )

}