import WikiInfoModal from "./wiki-info-modal"
import Image from "next/image"

import styles from "../../../styles/ResultBlock/modal_content.module.css"

import React, { useEffect, useState } from "react"

export default function WikiModalContent({name}: {name: string}) {

    const [oldName, setOldName] = useState("")
    const [imageElm, setImageElm] = useState<React.ReactElement | null>(null)
    const default_image = <Image src="/assets/loading.gif" alt="Image" width={64} height={64}></Image>

    useEffect(() => {

        if (name == oldName) return

        setOldName(name)
        setImageElm(null);

        (async function() {

            const res = await (await fetch(`/api/images_from_wiki?title=${encodeURI(name)}&size=600`)).json()
            const source = res.query.pages[Object.keys(res.query.pages)[0]]
            const image_src = source.thumbnail ? source.thumbnail.source : "/assets/not_found.png"

            setImageElm(<Image src={image_src} alt="Image" width={400} height={400}></Image>)

        })()

    }, [name, oldName])

    return (
        <div className={styles.result_modal}>
            <article>
                <div className={styles.result_modal__image_block}>
                    {imageElm === null ? default_image : imageElm}
                </div>
                <div className={styles.result_modal__stata_block}>
                    <div className={styles.result_modal__stata_block__container}>
                        {[{
                            link: "/api/get_children_count",
                            name: "Ссылок на этой статье"
                        }, {
                            link: "/api/get_parent_count",
                            name: "На эту статью ведут ссылок"
                        }, {
                            name: "Ссылка на статью"
                        }].map((item, i) => {

                            return <WikiInfoModal 
                                    api_link={item.link ? `${item.link}?name=${encodeURI(name)}` : ""} 
                                    key={i}
                                    field_name={item.name}
                                    name={name}
                                ></WikiInfoModal>

                        })}
                    </div>
                </div>
            </article>
        </div>
    )

}