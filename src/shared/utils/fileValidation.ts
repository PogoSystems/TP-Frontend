const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
]

export interface FileValidationResult {
    validFiles: File[]
    rejectedFiles: { file: File; reason: string }[]
}

export function validateFiles(files: File[]): FileValidationResult {
    const validFiles: File[] = []
    const rejectedFiles: { file: File; reason: string }[] = []

    for (const file of files) {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            rejectedFiles.push({ file, reason: 'Formato no permitido. Solo PDF, Word o PowerPoint.' })
            continue
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            rejectedFiles.push({ file, reason: 'El archivo supera los 10MB' })
            continue
        }

        validFiles.push(file)
    }

    return { validFiles, rejectedFiles }
}