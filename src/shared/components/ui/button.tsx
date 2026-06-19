import * as React from "react";

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps{
    text: string;
    icon?: React.ReactNode;
    variant?: ButtonVariant;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const BASE_STYLE='flex flex-row gap-2 justify-center items-center rounded-lg transition-colors text-sm font-medium w-full';

const VARIANTS: Record<ButtonVariant, string> ={
    primary: 'bg-bg-button text-white hover:bg-accent-button px-5 py-2.5 ',
    secondary: 'bg-white text-text-body hover:bg-gray-200 border-1 border-gray-200 px-5 py-2.5 ',
    ghost: 'bg-transparent text-ghost-button hover:text-accent-text p-0'
}

export function Button({text, icon, variant='primary', onClick, type='button', disabled=false}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${BASE_STYLE} ${VARIANTS[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {text}
            {icon}
        </button>
    )
}