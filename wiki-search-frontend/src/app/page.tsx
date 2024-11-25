import Header from "../../components/Header"
import MainBlock from "../../components/Main"
import Footer from "../../components/Footer";
import ResultBlock from "../../components/ResultBlock"
import { LoadingProvider } from "../../components/Main/Elements/search-button-provider"
import { ModalWindowContextProvider } from "../../components/ModalWindow/provider";
import ModalWindow from "../../components/ModalWindow";

export const metadata = {
    title: 'deepwiki',
  }

export default function Main() {

    return (
        <>
            <main>
                <Header></Header>
                <LoadingProvider>
                    <ModalWindowContextProvider>
                        <MainBlock></MainBlock>
                        <ResultBlock></ResultBlock>
                        <ModalWindow></ModalWindow>
                    </ModalWindowContextProvider>
                </LoadingProvider>
            </main>
            <Footer></Footer>
        </>
    )

}