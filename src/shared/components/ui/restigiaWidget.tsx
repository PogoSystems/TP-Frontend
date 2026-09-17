import React from 'react';

export const RestigiaWidget: React.FC = () => {
    return (
        <div className="group relative w-full overflow-hidden rounded-lg border border-border-card bg-white p-3  transition-all duration-300 ease-in-out hover:shadow-md">
            <a href="https://youtube.com/@KanarianDev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold text-[#1e3a5f] transition-opacity hover:opacity-80">
                <svg className="h-4 w-4 flex-shrink-0 fill-[#e52e2e]" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                <span className="truncate">youtube.com/@KanarianDev</span>
            </a>


            <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-in-out group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                <div className="overflow-hidden">
                    <div className="overflow-hidden rounded-xl border border-gray-100">
                        <img
                            src="restigia-preview.png"
                            alt="Restigia Preview"
                            className="h-auto w-full object-cover"
                        />
                    </div>

                    <h3 className="restigia-title my-2 text-center text-3xl font-bold tracking-widest">
                        RESTIGIA
                    </h3>

                    <a
                        href="https://restigia.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full rounded-lg bg-[var(--color-restigia-btn)] py-2 text-center text-sm font-bold tracking-wide text-[var(--color-restigia-btn-text)] transition-colors hover:bg-[var(--color-restigia-btn-hover)]"
                    >
                        JUEGA YA
                    </a>
                </div>
            </div>
        </div>
    );
};
