"use client"

import { Circle, Mic, MicOff, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { joinBasicCall, leaveBasicCall, listenToCall } from "@/components/call"
import { list } from "postcss"
import AgoraRTC from "agora-rtc-sdk-ng";


interface ToolbarProps {
    canvasState: CanvasState,
    setCanvasState: (newState: CanvasState) => void
    undo: () => void,
    redo: () => void,
    canUndo: boolean,
    canRedo: boolean,
}

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo
}: ToolbarProps) => {
    const [clickVoice, setClickVoice] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        interface RTC {
            client: any;
            localAudioTrack: any;
        }

        let rtc: RTC = {
            localAudioTrack: null,
            client: null
        };

        let options = {
            // Pass your App ID here.
            appId: "851ac570e1b74e8fbd3010cdfa270f00",
            // Set the channel name.
            channel: "voice",
            // Pass your temp token here.
            token: "007eJxTYPhZ3s6xliNgX6Rmm0CJABvHdKvfqdECSt3r9Rv2lZi5vldgsDA1TEw2NTdINUwyN0m1SEtKMTYwNEhOSUs0MjdIMzDYb1qV1hDIyLDNSoOZkQECQXxWhrL8zORUBgYAbCccfQ==",
            // Set the user ID.
            uid: user?.id.toString(),
        };

        async function startBasicCall() {
            console.log("hello world");
            // Create an AgoraRTCClient object.
            rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

            // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
            rtc.client.on("user-published", async (user: any, mediaType: any) => {
                // Subscribe to the remote user when the SDK triggers the "user-published" event
                await rtc.client.subscribe(user, mediaType);
                console.log("subscribe success");

                // If the remote user publishes an audio track.
                if (mediaType === "audio") {
                    // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
                    const remoteAudioTrack = user.audioTrack;
                    // Play the remote audio track.
                    remoteAudioTrack.play();
                }
            });
            // Listen for the "user-unpublished" event
            rtc.client.on("user-unpublished", async (user: any) => {
                // Unsubscribe from the tracks of the remote user.
                await rtc.client.unsubscribe(user);
            });



            const joinBtn = document.getElementById("join");
            console.log(joinBtn);

            if (joinBtn) {
                joinBtn.onclick = async function () {
                    console.log("join button is clicked");

                    // Join an RTC channel.
                    await rtc.client.join(options.appId, options.channel, options.token, options.uid);
                    // Create a local audio track from the audio sampled by a microphone.
                    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                    // Publish the local audio tracks to the RTC channel.
                    await rtc.client.publish([rtc.localAudioTrack]);

                    console.log("publish success!");
                }
            }
            const leaveBtn = document.getElementById("leave");
            if (leaveBtn) {
                leaveBtn.onclick = async function () {
                    // Destroy the local audio track.
                    rtc.localAudioTrack.close();

                    // Leave the channel.
                    await rtc.client.leave();
                }
            }

        }

        startBasicCall();
    }, []);

    const handleVoice = () => {
        setClickVoice(!clickVoice);
        // if(!clickVoice) {
        //     joinBasicCall(user?.id.toString() || "123");
        // } else {
        //     leaveBasicCall();
        // }
    }

    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolButton
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })} />
                <ToolButton
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                    label="Text"
                    icon={Type}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Text
                    })} />
                <ToolButton
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                    label="Stick Note"
                    icon={StickyNote}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Note
                    })} />
                <ToolButton
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                    label="Rectangle"
                    icon={Square}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Rectangle
                    })} />
                <ToolButton
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Ellipse
                    })} />
                <ToolButton
                    label="Pen"
                    icon={Pencil}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Pencil
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Pencil
                    }
                />


            </div>

            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton
                    isDisabled={!canUndo}
                    label="Undo" icon={Undo2}
                    onClick={undo} />
                <ToolButton
                    isDisabled={!canRedo}
                    label="Redo" icon={Redo2}
                    onClick={redo} />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton
                    isDisabled={false}
                    label="Mic" icon={clickVoice ? Mic : MicOff}
                    onClick={() => handleVoice()} />
                <button id="join">Join</button>
                <button id="leave">Leave</button>
            </div>
        </div>
    )
}

export const ToolbarSkeleton = function ToolbarSkeleton() {

    return (
        <div className="absolute top-[50%] -translate-y[50%] left-2 flex flex-col gap-y-4 shadow-md rounded-md bg-white h-[360px] w-[52px]"
        />
    )
}