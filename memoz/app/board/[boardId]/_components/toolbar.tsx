"use client"

import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState } from "@/types/canvas"

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
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolButton
                    isActive={
                        canvasState.mode === CanvasMode.None
                    }
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })} />
                <ToolButton
                    isActive={
                        canvasState.mode === CanvasMode.Inserting
                    }
                    label="Text"
                    icon={Type}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting })} />
                <ToolButton
                    isActive={false}
                    label="Stick Note"
                    icon={StickyNote}
                    onClick={() => { }} />
                <ToolButton
                    isActive={false}
                    label="Rectangle"
                    icon={Square}
                    onClick={() => { }} />
                <ToolButton
                    isActive={false}
                    label="Ellipsis"
                    icon={Circle}
                    onClick={() => { }} />
                <ToolButton
                    isActive={false}
                    label="Pen"
                    icon={Pencil}
                    onClick={() => { }} />


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
        </div>
    )
}

export const ToolbarSkeleton = function ToolbarSkeleton() {

    return (
        <div className="absolute top-[50%] -translate-y[50%] left-2 flex flex-col gap-y-4 shadow-md rounded-md bg-white h-[360px] w-[52px]"
        />
    )
}