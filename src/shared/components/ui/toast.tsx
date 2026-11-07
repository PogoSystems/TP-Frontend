import { useEffect } from "react";
import {Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    isOpen: boolean;
    message: string;
    type?: ToastType;
    duration?: number;
    onClose: () => void;
    className?: string;
}

export function Toast({
                          isOpen,
                          message,
                          type = "success",
                          duration = 4000,
                          onClose,
                          className = "",
                      }: Readonly<ToastProps>) {
    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {

        }, duration);

        return () => clearTimeout(timer);
    }, [isOpen, duration, ]);

    if (!isOpen) return null;

    const icons = {
        success: (
            <div className="flex items-center justify-center w-6 shrink-0">
                <img src="/pogo.svg" alt="Error" className="w-full h-auto" />
            </div>
        ),
        error: (
            <div className="flex items-center justify-center w-6 shrink-0">
                <img src="/monkeError2.svg" alt="Error" className="w-full h-auto" />
            </div>
        ),
        info: <Info size={18} className="text-blue-500 shrink-0" />
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-border-card shadow-lg transition-all min-w-[320px] max-w-md ${className}`}>
                <div className="flex items-center gap-2.5">
                    {icons[type]}
                    <span className="text-xs sm:text-sm font-medium text-text-title leading-relaxed">
                        {message}
                    </span>
                </div>

                <button onClick={onClose} type="button" className="flex items-center justify-center p-1 rounded-md text-text-subtle hover:text-text-title hover:bg-zinc-100 transition-colors cursor-pointer shrink-0 ml-2">
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}