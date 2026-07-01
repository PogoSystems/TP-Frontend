import * as React from "react";

//Base style for the card component
const BASE_STYLE='bg-bg-sidebar border-1 border-border-card rounded-xl p-5';

/*    Subcomponents     */
//Header
interface CardHeaderProps{
    title: string,
    subtitle?: string
}
function CardHeader({title, subtitle}: CardHeaderProps){
    return(
        <div>
            <p className="text-icon-purple font-semibold text-sm">{subtitle}</p>
            <h2 className="text-text-title font-semibold lg:text-lg">{title}</h2>
        </div>
    )
}

//Content
interface CardContentProps{
    children: React.ReactNode;
    className?: string;
}

function CardContent({children, className}: CardContentProps){
    return(
        <div className={`text-text-body ${className}`}>
            {children}
        </div>
    )
}

//Footer
interface CardFooterProps{
    children: React.ReactNode;
    className?: string;
}

function CardFooter({children, className}: CardFooterProps){
    return(
        <div className={`${className}`}>
            {children}
        </div>
    )
}

/*    Main component     */
interface CardProps{
    children: React.ReactNode;
    className?: string; // if it needs to be customized with additional styles
}


export function Card({children, className}: CardProps){
    return(
        <div className={`${BASE_STYLE} ${className}`}>
            {children}
        </div>
    )
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
