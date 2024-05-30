import Footer from "./_components/footer";
import Header from "./_components/header";

interface MarketingLayoutProps {
    children: React.ReactNode;
    title: string;
    className: string;
}

const MarketingLayout = ({
    children,
    className,
    title
}: MarketingLayoutProps) => {
    return (
        <main>
            
            <Header />
            <div className={" bg-[#fcf8f0] space-y-5 p-5"}>
                {children}
            </div>
            <Footer />
        
        </main>
    ) 
} 

export default MarketingLayout;