import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import {LoadSpinner} from "./loadSpinner.tsx";

interface SelectOption {
    value: string
    label: string
}

interface SelectProps {
    label: string
    options: SelectOption[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    required?: boolean
    isLoading?: boolean
}

export function Select({label, options, value, required, onChange, placeholder = 'Selecciona una opción', isLoading = false}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    function selectOption(optionValue: string) {
        onChange(optionValue)
        setIsOpen(false)
    }

    const selectedOption = options.find((option) => option.value === value)
    const displayText = selectedOption ? selectedOption.label : placeholder

    return (
        <div ref={containerRef}>
            <h3 className="text-text-title font-medium text-sm pb-2">{label} {required && <span className="text-red-500 ml-1">*</span>}</h3>

            <div className="relative">
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center justify-between border border-border-input rounded-lg p-2.5 w-full text-left text-text-title disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                    <span className={!selectedOption ? 'text-text-subtle' : ''}>{displayText}</span>
                    {isLoading ? (
                        <LoadSpinner width={25} height={25}/>
                    ) : (
                        <ChevronDown size={16} className={`text-text-subtle transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                </button>

                {isOpen && !isLoading && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-border-input rounded-lg shadow-sm max-h-60 overflow-y-auto">
                        {options.map((option) => {
                            const isSelected = option.value === value
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => selectOption(option.value)}
                                    className="flex items-center justify-between gap-3 w-full px-3 py-2.5 text-left hover:bg-accent-bg transition-colors"
                                >
                                    <span className="text-sm text-text-title">{option.label}</span>
                                    {isSelected && <Check size={14} className="text-accent-text shrink-0" />}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}