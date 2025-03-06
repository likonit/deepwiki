import { useState, useEffect } from "react";

export default function Dots() {

    const [dots, setDots] = useState("")

    useEffect(() => {

        setTimeout(() => {

            setDots(dots.length == 3 ? "" : dots+".")

        }, 400)

    })

    return (
        <a>{dots}</a>
    )
}