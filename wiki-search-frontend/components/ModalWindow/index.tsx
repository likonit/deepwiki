"use client";

import styles from "../../styles/modal_window.module.css"
import React, {useEffect, useState} from "react"
import { ModalWindowContext } from "./provider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ModalWindow() {

    const {visible, setVisible} = React.useContext(ModalWindowContext)
    const [inContainer, setInContainer] = useState(true)

    function close() {

        const {child, header} = visible
        if (setVisible) setVisible({
            is: false,
            child: child,
            header: header
        })

    }

    useEffect(() => {

        if (visible.is) 
            document.body.classList.add("active")
         else 
            document.body.classList.remove("active")

        return () => {
            document.body.classList.remove("active")
        }
    }, [visible])

    return (
        <div className={styles.modal} style={{display: visible.is ? "block" : "none"}}>
            <div className={styles.modal__box}></div>
            <div className={styles.modal__block} onClick={() => {

                if (!inContainer) close()
                
            }}>
                <div className={styles.modal__block__container}>
                    <div 
                    onMouseEnter={() => {

                        setInContainer(true)

                    }}
                    onMouseLeave={() => {

                        setInContainer(false)

                    }}
                    className={styles.modal__block__container__block}>
                        <div className={styles.modal__block__container__block__close}>
                            <span onClick={close}>
                                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                            </span>
                        </div>
                        <h2>
                            {visible.header}
                        </h2>
                        <div className={styles.modal__block__container__data}>
                            {visible.child}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}