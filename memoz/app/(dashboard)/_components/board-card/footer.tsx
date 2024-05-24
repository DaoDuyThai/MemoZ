
interface FooterProps {
    isFavorite: boolean,
    title: string,
    authorLabel: string,
    createdAtLabel: string,
}

export const Footer = ({
    isFavorite,
    title,
    authorLabel,
    createdAtLabel
}: FooterProps) => {
    return (
        <div>
            Footer
        </div>
    )
}