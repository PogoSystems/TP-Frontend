
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

        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
            {/* Card */}
            <div className="bg-white rounded-xl max-w-md w-full p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto my-auto" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    aria-label="Cerrar modal"
                    className="absolute top-4 right-4 text-text-subtle rounded-md p-2 hover:bg-accent-bg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer">
                    <X size={20}/>
                </button>

                {/* Modal content */}
                {children}
            </div>
        </div>

    )
}