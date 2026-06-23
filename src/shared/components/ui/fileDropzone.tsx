import * as React from "react";
import {useState} from "react";
import {validateFiles} from "../../utils/fileValidation.ts";
import { Upload } from 'lucide-react';

interface FileDropzoneProps{
    onFilesSelected: (files: File[]) => void,
    maxFiles: number,
    currentCount: number
}

export function FileDropzone({onFilesSelected, maxFiles, currentCount}: FileDropzoneProps) {
    const [isDraggingOver, setIsDraggingOver] = useState(false); // to save the state of the dropzone when a file is dragged over it

    const remainingSlots = maxFiles - currentCount
    const isDisabled = remainingSlots <= 0

    // Tells the browser to not open the document when a file is dragged over the dropzone
   function handleDragOver(event: React.DragEvent){
       event.preventDefault()
       setIsDraggingOver(true);
       console.log("archivo encima de la zona")
   }

   // Tells the browser to not open the document when a file is dropped in the dropzone
   function handleDrop(event: React.DragEvent){
       event.preventDefault()
       setIsDraggingOver(false);
       console.log("archivo soltado")

       if(isDisabled) return //if there is no space left, do not allow to drop files

       const droppedFiles= Array.from(event.dataTransfer.files).slice(0, remainingSlots)
       const {validFiles, rejectedFiles} = validateFiles(droppedFiles)

       if(rejectedFiles.length > 0){
           alert(rejectedFiles.map((r) => `${r.file.name}: ${r.reason}`).join('\n'))
       }
       onFilesSelected(validFiles)
   }

   // To save the files that are selected in the file input
   function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>){
       const selectedFiles = Array.from(event.target.files ?? []).slice(0, remainingSlots)
       const { validFiles, rejectedFiles } = validateFiles(selectedFiles)
       if (rejectedFiles.length > 0) {
           alert(rejectedFiles.map((r) => `${r.file.name}: ${r.reason}`).join('\n'))
       }

       onFilesSelected(validFiles)
       event.target.value=""; // Reset the input value to allow selecting the same file again
   }

    return (
            <div onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={() => setIsDraggingOver(false)}
                 className={`border-2 border-dashed rounded-lg p-8 flex flex-col justify-center items-center gap-4 text-center text-text-title ${isDraggingOver  ? 'border-accent-button' : 'border-border-input'} ${isDisabled ? 'opacity-50' : ''}`}>
                <div className="bg-gray-100 rounded-full p-4">
                    <Upload className="text-icon-grey"/>
                </div>
                <div>
                    <p className="text-base font-medium text-text-title pb-2">Subir Contenido</p>
                    <p className="text-sm text-text-subtle">Solamente archivos PDF o DOCX, máximo 10MB</p>
                </div>

                <label htmlFor="file-upload" className={`bg-bg-button text-white px-5 py-2.5 rounded-lg cursor-pointer ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}>
                   Seleccionar archivos
                </label>
                <input id="file-upload" type="file" multiple disabled={isDisabled} className="hidden" onChange={handleFileInputChange}/>
            </div>

    )
}