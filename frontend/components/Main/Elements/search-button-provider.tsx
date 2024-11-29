"use client";

import React, { Dispatch, SetStateAction } from "react"
import { useState } from "react"

interface LoadingData {
    type: 0|1|2, 
    array: string[]
}

export const LoadingContext = React.createContext<{
    isLoading: LoadingData,
    setLoading: Dispatch<SetStateAction<LoadingData>> | null
}>({isLoading: {type: 0, array: []}, setLoading: null})

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setLoading] = useState<LoadingData>({
        type: 0,
        array: []
    })
  
    return (
      <LoadingContext.Provider value={{isLoading, setLoading}}>
        {children}
      </LoadingContext.Provider>
    )

}