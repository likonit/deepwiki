import styles from "../../../styles/ResultBlock/main.module.css"
import { useEffect, useState, ReactElement, useContext, RefObject } from "react"
import Image from "next/image"

import { ModalWindowContext } from "../../ModalWindow/provider"
import WikiModalContent from "./modal-content"

export default function WikiBlock({name, num, arrow}: {name: string, num: number, arrow: RefObject<HTMLDivElement> | null}) {

    const border_color = ["#BBB4A9", "#B6AFA4", "#B1AAA0", "#ACA69B", "#A7A197", "#A29C92", "#9D978E", "#989289"]
    
    const [image, setImage] = useState<ReactElement>()
    
    const {visible, setVisible} = useContext(ModalWindowContext)

    useEffect(() => {

        (async function() {

            const result = await (await fetch(`/api/images_from_wiki?title=${encodeURI(name)}&size=200`)).json()
            const page = result.query.pages[Object.keys(result.query.pages)[0]]
            const src = page.thumbnail ? page.thumbnail.source : "/assets/not_found.png"
            
            setImage(<Image 
                src={src} 
                alt="Image" 
                height={70} 
                width={70} 
                ></Image>
            )

        })()
    }, [name])
    
    return (
        <div 
            className={`${styles.wiki_container__block} ${num % 2 == 0 ? styles.active : styles.no_active}`} 
            style={{border: `2px solid ${border_color[num]}`, boxSizing: "border-box"}}
            onMouseEnter={function() {

                if (arrow?.current) {

                    arrow.current.classList.add(`active`)

                    arrow.current.classList.add(`
                        ${num % 2 == 0 ? styles.wiki__arrow_block_left__active_arrow :
                            styles.wiki__arrow_block_right__active_arrow
                        }
                    `.trim())

                }

            }}
            onMouseLeave={function() {

                if (arrow?.current) {

                    arrow.current.classList.remove(`active`)

                    arrow.current.classList.remove(`
                        ${num % 2 == 0 ? styles.wiki__arrow_block_left__active_arrow :
                            styles.wiki__arrow_block_right__active_arrow
                        }
                    `.trim())

                }

            }}
            onClick={() => {

                const modal_child: React.ReactElement = <WikiModalContent name={name}></WikiModalContent>
                const {is} = visible
                if (setVisible !== null) setVisible({
                    is: !is,
                    child: modal_child,
                    header: name
                })

            }}
            >
            <span className={styles.wiki_container__block__image_block}>
                {image}
            </span>
            <div className={styles.wiki_container__block__text_block}>
                <div>
                    <p className={styles.wiki_container__block__text_block__header}>{name}<span className={styles.wiki_container__block__text_block__num}>[{num == 0 ? "Старт" : num}]</span></p>
                    {/* <p className={styles.wiki_container__block__text_block__link}>
                        <a href={`https://ru.wikipedia.org/wiki/${link}`} target="_blank"><FontAwesomeIcon icon={faLink}></FontAwesomeIcon>Ссылка на статью</a>
                    </p> */}
                </div>
            </div>
        </div>
    )

}