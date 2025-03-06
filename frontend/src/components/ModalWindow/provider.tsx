"use client";

import React, { Dispatch, SetStateAction } from "react"
import { useState } from "react"

interface Modal {
    is: boolean,
    child: React.ReactElement | null,
    header: string
}

export const ModalWindowContext = React.createContext<{
    visible: Modal,
    setVisible: Dispatch<SetStateAction<Modal>> | null
}>({
    visible: {
        is: false,
        child: null,
        header: ""
    },
    setVisible: null
})

export function ModalWindowContextProvider({children}: {children: React.ReactNode}) {

    const [visible, setVisible] = useState<Modal>({
        is: false,
        child: null,
        header: ""
    })

    return (
        <ModalWindowContext.Provider value={{visible, setVisible}}>
            {children}
        </ModalWindowContext.Provider>
    )
    
}