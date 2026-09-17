import {RefreshCw} from "lucide-react";
import {Card} from "./card.tsx";
import {Button} from "./button.tsx";

interface ErrorStateProps {
    title?: string;
    subtitle?: string;
    message?: string;
    onRetry?: () => void;
    variant?: "card" | "compact";
    className?: string;
}

export function ErrorState({
                               title = "Oops, no se pudieron cargar los datos",
                               subtitle = "Por favor, inténtalo de nuevo más tarde.",
                               message,
                               onRetry,
                               variant = "card",
                               className = "",
                           }: Readonly<ErrorStateProps>) {
    const handleAction = onRetry || (() => window.location.reload());

    if (variant === "compact") {
        return (
            <div
                className={`group relative flex items-center justify-between p-4 rounded-xl bg-white border border-border-card overflow-hidden transition-all hover:border-red-200 ${className}`}>
                <div className="flex items-center gap-3.5 pl-2">
                    <div className="flex items-center justify-center w-8 shrink-0">
                        <img src="/monkeError2.svg" alt="Error" className="w-full h-auto"/>
                    </div>

                    <div className="flex flex-col">
                    <span className="text-xs font-semibold text-text-title">
                      {title !== "No se pudieron cargar los datos" ? title : "Algo no salió como esperábamos"}
                    </span>
                        <span className="text-text-subtle text-xs">
                            {message}
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleAction}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-text-subtle hover:text-text-title hover:bg-zinc-100 transition-colors cursor-pointer shrink-0 ml-4 border border-transparent hover:border-border-divider"
                >
                    <RefreshCw size={13}
                               className="text-text-subtle group-hover:rotate-180 transition-transform duration-500"/>
                    <span>Reintentar</span>
                </button>
            </div>
        );
    }

    return (
        <Card className={`w-full ${className}`}>
            <Card.Content className="flex flex-col items-center justify-center py-10 px-4 text-center gap-3">
                <div className="flex items-center justify-center w-20">
                    <img src="/monkeError2.svg" alt="Error" className="w-full h-auto"/>
                </div>

                <div className="flex flex-col gap-1 max-w-sm">
                    <p className="text-base font-semibold text-text-title">{title}</p>
                    {subtitle && <p className="text-sm text-text-subtle">{subtitle}</p>}
                    {message && <p className="text-xs text-text-subtle leading-relaxed mt-1">{message}</p>}
                </div>

                <div className="mt-2 group">
                    <Button
                        text="Volver a intentar"
                        variant="primary"
                        icon={<RefreshCw size={15}
                                         className="group-hover:rotate-180 transition-transform duration-500"/>}
                        onClick={handleAction}
                    />
                </div>
            </Card.Content>
        </Card>
    );
}