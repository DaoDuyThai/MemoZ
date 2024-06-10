const Card = (props: any) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-3">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.title}</div>   
            </div>
            <img className="w-full" src={props.src} alt="Sunset in the mountains" />
        </div>
    )
}

export default Card; 