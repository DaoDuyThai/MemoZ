interface ContactLayoutProps {
    children: React.ReactNode;
}

const ContactLayout = ({
    children,
}: ContactLayoutProps) => {
    return (
        <>
            {children}
        </>
    )
}

export default ContactLayout;