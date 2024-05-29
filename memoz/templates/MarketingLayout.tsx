import Footer from "@/components/common/footer";
import Header from "@/components/common/header"

const MarketingTemplate = (props: any) => {
    return (
        <>
            <Header />
            <div className={props.className}>
                {props.children}
            </div>
            <Footer />
        </>
    )
}


export default MarketingTemplate;