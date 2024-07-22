'use client';
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react"
import { useEffect, useState } from "react";
// import "./css/chat.css";
export default function Chat({roomId} : {roomId: string}) {
    const messages = useQuery(api.messages.getByOrganizationId, { organizationId: roomId });
    const sendMessage = useMutation(api.messages.send);
    const [newMessageText, setNewMessageText] = useState("");
    const { user } = useUser();
    const userName = user?.fullName || user?.username || "Anonymous";

    useEffect(() => {
        const hideButton = document.getElementById("hideButton");
        const messagesContent = document.getElementById("messages-content");
        
        setTimeout(() => {
            window.scrollTo({ top: messagesContent?.scrollHeight, behavior: "smooth" });
        }, 0);

        function hideContent() {
            const contents = document.querySelectorAll(".content");
            if (contents) {
                contents.forEach((content) => {
                    content.classList.toggle("hidden");
                });
            }
        }
        hideButton?.addEventListener('click', hideContent);

    }, [messages]);

    return (
        <div className="hidden md:block fixed right-0 bottom-0">
            <header className="flex justify-between p-2 bg-[#81e18c] w-[300px]">
                <h1 className="text-xl">MemoZ Chat</h1>
                <button className="text-xl" id="hideButton">__</button>
            </header>
            <main className="w-[300px] h-[400px] border-2 relative content bg-white p-2">
                <div id="messages-content" className="h-[350px] overflow-y-auto content">
                    {messages?.map((message) => (
                        <article key={message._id} >
                            <strong>{message.authorId}</strong>
                            <p className="rounded-md border-2 w-fit p-2 ml-2 my-2">{message.body}</p>
                        </article>
                    ))}
                </div>
                <form className="absolute left-0 bottom-0 w-full content border-2 border-slate-300 p-2 bg-white" onSubmit={async (e) => {
                    e.preventDefault();
                    await sendMessage({ body: newMessageText, authorId: userName, organizationId: roomId});
                    setNewMessageText("");
                }}>
                    <input
                        value={newMessageText}
                        className="outline-none w-3/4"
                        onChange={async (e) => {
                            const text = e.target.value;
                            setNewMessageText(text);
                        }}
                        placeholder="Write a message..."
                    />
                    <button className="bg-orange-300 w-1/4" type="submit" disabled={!newMessageText}>Send</button>
                </form>
            </main>
        </div>
    )

}

