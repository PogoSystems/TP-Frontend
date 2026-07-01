import * as React from "react";

interface InputTextProps{
    label:string;
    name:string;
    placeholder?:string;
    className?:string;
    required?: boolean
    value: string
    onChange:(event: React.ChangeEvent<HTMLInputElement>) => void
    type?: React.HTMLInputTypeAttribute
}

export function InputText({label,name, placeholder, className, required, value, onChange, type = "text"}: InputTextProps) {
    return(
        <div>
            <h3 className="text-text-title font-medium text-sm pb-2">{label} {required && <span className="text-red-500 ml-1">*</span>}</h3>
            <input name={name}
                   type={type}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   className={`${className} border-1 border-border-input rounded-lg py-2.5 px-4 w-full bg-white focus:border-accent-button focus:outline-hidden`}/>
        </div>
    )
}