"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle
} from "@/components/ui/dialog"
import { useRenameModal } from "@/store/use-rename-modal"


export const RenameModal = () => {
    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModal();

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                    <DialogDescription>
                        Enter new title for this board
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
           
        </Dialog>
    )
}