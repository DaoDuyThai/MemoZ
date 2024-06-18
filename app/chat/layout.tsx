interface ChatLayoutElement {
    children: React.ReactNode;
}

const ChatLayout = ({
    children,
}: ChatLayoutElement) => {
    return (
        <>
            {children}
        </>
    )
}

export default ChatLayout;