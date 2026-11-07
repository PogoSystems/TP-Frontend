import { useState } from 'react';
import { Modal } from './modal';
import { Button } from './button';
import { TermsAndConditionsContent } from './termsAndConditionsContent';

interface TermsModalProps {
    isOpen: boolean;
    onAccept: () => void;
}

export function TermsModal({ isOpen, onAccept }: TermsModalProps) {
    const [accepted, setAccepted] = useState(false);

    return (
        <Modal isOpen={isOpen} onClose={() => {}}>
            <div className="flex flex-col gap-4 px-1 max-h-[85vh] overflow-hidden">
                <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center justify-center w-8 shrink-0">
                        <img src="/monkeError2.svg" alt="Error" className="w-full h-auto"/>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-text-title">Términos y Condiciones</h2>
                        <p className="text-xs text-text-subtle">Revisa y acepta las normas de uso de Pogo para continuar</p>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 overflow-y-auto max-h-[45vh]">
                    <TermsAndConditionsContent />
                </div>

                <div className="flex flex-col gap-3 shrink-0 pt-1">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="terms-checkbox"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="w-4 h-4 text-accent-button rounded border-gray-300 cursor-pointer accent-[#0060AC]"
                        />
                        <label htmlFor="terms-checkbox" className="text-sm text-text-title cursor-pointer select-none">
                            He leído y acepto los Términos y Condiciones de Uso
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <div className="w-full sm:w-auto">
                            <Button
                                text="Aceptar y Continuar"
                                onClick={onAccept}
                                disabled={!accepted}
                                variant="primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}