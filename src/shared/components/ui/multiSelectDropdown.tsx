import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { LoadSpinner } from './loadSpinner'

interface MultiSelectOption {
    value: string
    label: string
}

interface MultiSelectDropdownProps {
    label: string
    options: MultiSelectOption[]
    selectedValues: string[]
    onChange: (values: string[]) => void
    placeholder?: string
    required?: boolean
    isLoading?: boolean
    disabled?: boolean
    emptyMessage?: string
}

export function MultiSelectDropdown({label, options, required, selectedValues, onChange, placeholder = 'Selecciona una opción',
                                        isLoading = false, disabled = false, emptyMessage = 'No hay opciones disponibles'}: MultiSelectDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const hasOptions = options.length > 0
    const isDisabled = disabled || isLoading || (!isLoading && !hasOptions)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    function toggleOption(value: string) {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value))
        } else {
            onChange([...selectedValues, value])
        }
    }

    const getDisplayText = () => {
        if (isLoading) return 'Cargando documentos...'
        if (!disabled && !hasOptions) return emptyMessage
        if (selectedValues.length === 0) return placeholder
        if (selectedValues.length === options.length) return 'Todos los documentos'
        return `${selectedValues.length} documento(s) seleccionado(s)`
    }

    const displayText = getDisplayText()

    return (
        <div ref={containerRef}>
            <h3 className="text-text-title font-medium text-sm pb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </h3>

            <div className="relative">
                <button
                    type="button"
                    disabled={isDisabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center justify-between border border-border-input rounded-lg p-2.5 w-full text-left text-text-title disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                    <span className={`truncate ${selectedValues.length === 0 || isLoading || !hasOptions ? 'text-text-subtle' : ''}`}>
                        {displayText}
                    </span>

                    {isLoading ? (
                        <LoadSpinner width={25} height={25} />
                    ) : (
                        <ChevronDown
                            size={16}
                            className={`text-text-subtle shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                    )}
                </button>

                {isOpen && !isDisabled && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-border-input rounded-lg shadow-sm max-h-60 overflow-y-auto">
                        {options.map((option) => {
                            const isSelected = selectedValues.includes(option.value)
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => toggleOption(option.value)}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-accent-bg transition-colors"
                                >
                                    <span
                                        className={`flex items-center justify-center w-4 h-4 rounded border shrink-0 ${
                                            isSelected ? 'bg-accent-button border-accent-button' : 'border-border-input'
                                        }`}
                                    >
                                        {isSelected && <Check size={12} className="text-white" />}
                                    </span>
                                    <span className="text-sm text-text-title">{option.label}</span>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}