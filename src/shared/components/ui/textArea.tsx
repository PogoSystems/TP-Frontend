interface TextAreaProps {
    label: string
    name: string
    placeholder?: string
    rows?: number
    className?: string
    required?: boolean
}

export function TextArea({ label, name, required, placeholder, rows = 4, className }: TextAreaProps) {
    return (
        <div>
            <h3 className="text-text-title font-medium text-sm pb-2">{label} {required && <span className="text-red-500 ml-1">*</span>}</h3>
            <textarea
                name={name}
                placeholder={placeholder}
                rows={rows}
                className={`${className} border border-border-input rounded-lg p-2.5 w-full resize-none focus:border-accent-button focus:outline-hidden`}/>
        </div>
    )
}