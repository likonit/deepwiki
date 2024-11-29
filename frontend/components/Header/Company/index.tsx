import Image from "next/image"
import styles from "../../../styles/header.module.css"

export default function CompanyBlock() {

    return (
        <div className={styles.company_block}>
            <Image src="./assets/wiki.svg" width={100} height={100} alt="not found"></Image>
        </div>
    )

}