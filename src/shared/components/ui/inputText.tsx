interface InputTextProps{
    label:string;
    name:string;
    placeholder?:string;
    className?:string;
}

export function InputText({label,name, placeholder, className}: InputTextProps) {
    return(
        <div>
            <h3 className="text-text-title font-medium text-sm pb-2">{label}</h3>
            <input name={name}
                   placeholder={placeholder}
                   className={`${className} border-1 border-border-input rounded-lg p-2.5 w-full focus:border-accent-button focus:outline-hidden`}/>
        </div>
    )
}