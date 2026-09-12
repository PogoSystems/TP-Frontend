import * as React from "react";

const BASE_STYLE = 'bg-bg-sidebar border-1 border-border-card rounded-xl p-5';

/* Subcomponents */
interface CardHeaderProps {
    title: string;
    subtitle?: string;
    className?: string; // <-- Permitir className
}

function CardHeader({ title, subtitle, className = "" }: CardHeaderProps) {
    return (
        <div className={`min-w-0 overflow-hidden ${className}`}>
            {subtitle && (
                <p className="text-icon-purple font-semibold text-sm truncate">
                    {subtitle}
                </p>
            )}
            <h2 className="text-text-title font-semibold lg:text-lg truncate block w-full [overflow-wrap:anywhere]">
                {title}
            </h2>
        </div>
    );
}

// Content
interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

function CardContent({ children, className = "" }: CardContentProps) {
    return (
        <div className={`text-text-body min-w-0 overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

// Footer
interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

function CardFooter({ children, className = "" }: CardFooterProps) {
    return (
        <div className={`min-w-0 ${className}`}>
            {children}
        </div>
    );
}

/* Main component */
interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`${BASE_STYLE} ${className}`}>
            {children}
        </div>
    );
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;