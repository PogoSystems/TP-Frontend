import * as React from "react";

interface TextAreaProps {
    label: string
    name: string
    placeholder?: string
    rows?: number
    className?: string
    required?: boolean
    value: string
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export function TextArea({ label, name, required, placeholder, rows = 4, className , value, onChange}: TextAreaProps) {
    return (
        <div>
            <h3 className="text-text-title font-medium text-sm pb-2">{label} {required && <span className="text-red-500 ml-1">*</span>}</h3>
            <textarea
                name={name}
                placeholder={placeholder}
                value={value}
                rows={rows}
                onChange={onChange}
                className={`${className} border border-border-input rounded-lg p-2.5 w-full resize-none focus:border-accent-button focus:outline-hidden`}/>
        </div>
    )
}