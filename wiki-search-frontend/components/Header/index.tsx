import CompanyBlock from "./Company"
import ExampleBlock from "./Example"
import Navigation from "./Navigation"
import styles from "../../styles/header.module.css"

export default function Header() {

    return (
        <header className={styles.header_block}>
            <CompanyBlock></CompanyBlock>
            <ExampleBlock></ExampleBlock>
            <Navigation></Navigation>
        </header>
    )

}