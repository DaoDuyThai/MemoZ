"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Link2, Trash2 } from "lucide-react"
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "./ui/button";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps['side'];
    sideOffset?: DropdownMenuContentProps['sideOffset'];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionsProps) => {
    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then(() => { toast.success('Link copied') })
            .catch(() => { toast.error('Failed to copy link') })
    }

    const { mutate, pending } = useApiMutation(api.board.remove)

    const onDelete = () => {
        mutate({ id })
            .then(() => { toast.success('Board deleted') })
            .catch(() => { toast.error('Failed to delete board') })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => { e.stopPropagation() }} side={side} sideOffset={sideOffset} className="w-60">
                <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy board link
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete board?"
                    description="This will delete the board and all of its contents."
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModal>

            </DropdownMenuContent>
        </DropdownMenu>
    )

}