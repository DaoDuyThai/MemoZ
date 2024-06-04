"use client"

import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"

export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolButton isActive={false} label="Select" icon={MousePointer2} onClick={() => { }} />
                <ToolButton isActive={false} label="Text" icon={Type} onClick={() => { }} />
                <ToolButton isActive={false} label="Stick Note" icon={StickyNote} onClick={() => { }} />
                <ToolButton isActive={false} label="Rectangle" icon={Square} onClick={() => { }} />
                <ToolButton isActive={false} label="Ellipsis" icon={Circle} onClick={() => { }} />
                <ToolButton isActive={false} label="Pen" icon={Pencil} onClick={() => { }} />


            </div>

            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton isDisabled={false} isActive={false} label="Undo" icon={Undo2} onClick={() => { }} />
                <ToolButton isDisabled={false} isActive={false} label="Redo" icon={Redo2} onClick={() => { }} />

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