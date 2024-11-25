import React, { useEffect, useState } from "react"
import Dots from "./dots"

import styles from "../../../styles/ResultBlock/modal_content.module.css"

export default function WikiInfoModal({api_link, field_name, name}: {api_link: string, field_name: string, name: string}) {

    const [oldName, setOldName] = useState("")
    const [result, setResult] = useState<string | React.ReactElement | null>(null)

    useEffect(() => {

        if (oldName === name) return

        setOldName(name)
        setResult(null)

        const fetchData = async () => {

            if (api_link.length > 0) {

                try {

                    const response = await fetch(api_link)
                    const data = await response.json()
                    setResult(data?.low?.toString() || "Нет данных")

                } catch (err: unknown) {

                    if (err instanceof Error)
                        setResult("Ошибка при загрузке данных")

                }

            } else {

                switch (field_name) {

                    case "Ссылка на статью":
                        const text = `https://ru.wikipedia.org/wiki/${name.replaceAll(" ", "_")}`
                        setResult(
                            <a 
                            href={text} 
                            className={styles.result_modal__info_block__link}
                            target="_blank"
                            >{text}</a>)
                        break
                    default:
                        break
                        
                }

            }

        }

        fetchData()

    }, [name, api_link, oldName, field_name])

    return (
        <div className={styles.result_modal__info_block}>
            <div>
                <p>
                    <strong>{field_name}</strong>: <span>{result !== null ? result : <Dots></Dots>}</span>
                </p>
            </div>
        </div>
    )

}