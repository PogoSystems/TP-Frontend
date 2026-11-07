import { Card } from "./card.tsx";
import { Button } from "./button.tsx";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon: LucideIcon;
    title?: string;
    description: string;
    actionText?: string;
    actionLink?: string;
    onActionClick?: () => void;
    variant?: "card" | "compact" | "inline";
    className?: string;
}

export function EmptyState({icon: Icon, title, description, actionText, actionLink, onActionClick, variant = "card", className = "",}: EmptyStateProps) {

    if (variant === "compact") {
        return (
            <Card className={`w-full ${className}`}>
                <Card.Content className="flex flex-row items-center gap-2 ">
                    <Icon size={20} className="text-gray-400 shrink-0" />
                    <p className="text-sm font-normal text-text-subtle">{description}</p>
                </Card.Content>

            </Card>
        );
    }

    if (variant === "inline") {
        return (
            <div className={`flex flex-col items-center justify-center py-6 px-4 text-center gap-2 ${className}`}>
                <Icon className="text-gray-300 mb-1 shrink-0" size={38} />
                {title && <p className="text-sm font-semibold text-text-title">{title}</p>}
                <p className="text-xs text-text-subtle max-w-sm">{description}</p>

                {actionText && actionLink && (
                    <Link to={actionLink} className="mt-2">
                        <Button text={actionText} variant="primary" />
                    </Link>
                )}

                {actionText && !actionLink && onActionClick && (
                    <div className="mt-2">
                        <Button text={actionText} variant="primary" onClick={onActionClick} />
                    </div>
                )}
            </div>
        );
    }

    // Variante por defecto: con su propia Card
    return (
        <Card className={`w-full ${className}`}>
            <Card.Content className="flex flex-col items-center justify-center py-8 px-4 text-center gap-2">
                <Icon className="text-gray-400 mb-1" size={36} />
                {title && <p className="text-sm font-semibold text-text-title">{title}</p>}
                <p className="text-sm text-text-subtle max-w-sm mb-2">{description}</p>

                {actionText && actionLink && (
                    <Link to={actionLink} className="mt-2">
                        <Button text={actionText} variant="primary" />
                    </Link>
                )}

                {actionText && !actionLink && onActionClick && (
                    <div className="mt-2">
                        <Button text={actionText} variant="primary" onClick={onActionClick} />
                    </div>
                )}
            </Card.Content>
        </Card>
    );
}