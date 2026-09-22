import { Check, ArrowRight } from "lucide-react";
import { Card } from "./card.tsx";
import { Button } from "./button.tsx";

interface SuccessStateProps {
    title?: string;
    subtitle?: string;
    message?: string;
    onAction?: () => void;
    actionText?: string;
    variant?: "card" | "compact";
    className?: string;
}

export function SuccessState({title = "Operación realizada con éxito", subtitle, message, onAction, actionText, variant = "compact", className = "",}: Readonly<SuccessStateProps>) {
    if (variant === "compact") {
        return (
            <div
                className={`group relative flex items-center justify-between p-4 rounded-xl bg-white border border-border-card overflow-hidden transition-all hover:border-zinc-300 ${className}`}
            >
                <div className="flex items-center gap-3.5 pl-2">
                    <div className="flex items-center justify-center w-8 shrink-0">
                        <img src="/pogo.svg" alt="Éxito" className="w-full h-auto" />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-text-title">
                            {title}
                        </span>
                        {(message || subtitle) && (
                            <span className="text-text-subtle text-xs mt-0.5">
                                {message || subtitle}
                            </span>
                        )}
                    </div>
                </div>

                {onAction && actionText && (
                    <button
                        onClick={onAction}
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-text-subtle hover:text-text-title hover:bg-zinc-100 transition-colors cursor-pointer shrink-0 ml-4 border border-transparent hover:border-border-divider"
                    >
                        <span>{actionText}</span>
                        <ArrowRight
                            size={13}
                            className="text-text-subtle group-hover:translate-x-0.5 transition-transform duration-300"
                        />
                    </button>
                )}
            </div>
        );
    }

    return (
        <Card className={`w-full ${className}`}>
            <Card.Content className="flex flex-col items-center justify-center py-10 px-4 text-center gap-3">
                <div className="flex items-center justify-center w-20">
                    <img src="/pogo.svg" alt="Éxito" className="w-full h-auto" />
                </div>

                <div className="flex flex-col gap-1 max-w-sm">
                    <p className="text-base font-semibold text-text-title">{title}</p>
                    {subtitle && <p className="text-sm text-text-subtle">{subtitle}</p>}
                    {message && <p className="text-xs text-text-subtle leading-relaxed mt-1">{message}</p>}
                </div>

                {onAction && actionText && (
                    <div className="mt-2 group">
                        <Button
                            text={actionText}
                            variant="primary"
                            icon={<Check size={15} />}
                            onClick={onAction}
                        />
                    </div>
                )}
            </Card.Content>
        </Card>
    );
}