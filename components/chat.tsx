import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useEffect, useState } from "react";
import "./css/chat.css";
export default function Chart() {
    const messages = useQuery(api.messages.list);
    const sendMessage = useMutation(api.messages.send);
    const [newMessageText, setNewMessageText] = useState("");


    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 0);
    }, [messages]);

    return (
        <main className="chat">
            <header>MemoZ Chart</header>
            {messages?.map((message) => (
                <article key={message._id}>
                    <strong>{message.authorId}</strong>
                    <p>{message.body}</p>
                </article>
            ))}
            <form onSubmit={async (e) => {
                e.preventDefault();
                await sendMessage({ body: newMessageText, authorId: "user1" });
                setNewMessageText("");
            }}>
                <input 
                    value={newMessageText}
                    onChange={async (e) => {
                        const text = e.target.value;
                        setNewMessageText(text);
                    }}
                    placeholder="Write a message..."
                />
                <button type="submit" disabled={!newMessageText}>Send</button>
            </form>
        </main>
    )
    
}

