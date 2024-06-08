interface MarketingLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({
    children,
}: MarketingLayoutProps) => {
    return (
        <>
            {children}
        </>
    )
}

export default DashboardLayout;