interface PricingLayoutProps {
    children: React.ReactNode;
}

const PricingLayout = ({
    children,
}: PricingLayoutProps) => {
    return (
        <>
            {children}
        </>
    )
}

export default PricingLayout;