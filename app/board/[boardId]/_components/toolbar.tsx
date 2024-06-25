"use client"

import { Circle, Mic, MicOff, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { joinBasicCall, leaveBasicCall } from "@/components/call"
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



    const handleVoice = () => {
        setClickVoice(!clickVoice);
        if (!clickVoice) {
            joinBasicCall(user?.id.toString() || "123");
        } else {
            leaveBasicCall();
        }
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