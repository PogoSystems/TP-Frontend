import { X, FileText } from 'lucide-react'

interface FileListItemProps {
    file: File
    onRemove: () => void
}

export function FileListItem({ file, onRemove }: FileListItemProps) {
    return (
        <div className="flex items-center justify-between gap-3 border border-border-input rounded-lg p-3">
            <div className="flex items-center gap-3 min-w-0">
                <FileText size={20} className="text-text-subtle shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                    <p className="text-sm text-text-title truncate">{file.name}</p>
                    <p className="text-xs text-text-subtle">{formatFileSize(file.size)}</p>
                </div>
            </div>

            <button
                onClick={onRemove}
                aria-label={`Eliminar ${file.name}`}
                className="text-text-subtle bg-none hover:text-accent-text shrink-0 hover:bg-accent-bg"
            >
                <X size={18} />
            </button>
        </div>
    )
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}