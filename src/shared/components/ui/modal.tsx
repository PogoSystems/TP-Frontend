
import * as React from "react";
import {X} from "lucide-react";
interface ModalProps{
    children: React.ReactNode;
    isOpen: boolean; // to know if the modal is open or closed
    onClose: () => void;
}

export function Modal({children, isOpen, onClose}: ModalProps){
    if (!isOpen) return null; // if the modal is not open, don't render anything
    return(

        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4" onClick={onClose}>
            {/* Card */}
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    aria-label="Close sidebar"
                    className="absolute top-6 right-5 text-text-subtle rounded-md p-1 hover:bg-accent-bg transition-colors">
                    <X size={20}/>
                </button>

                {/* Modal content */}
                {children}
            </div>
        </div>

    )
}