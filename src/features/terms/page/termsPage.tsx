import { useState } from 'react';
import { Card } from '../../../shared/components/ui/card.tsx';
import { TermsAndConditionsContent } from '../../../shared/components/ui/termsAndConditionsContent.tsx';
import { PrivacyPolicyContent } from '../../../shared/components/ui/privacyPolicyContent.tsx';
import { FileText, Lock } from 'lucide-react';

export function TermsPage() {
    const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

    return (
        <div className="flex flex-col h-full flex-1 gap-6 w-full min-h-0 pb-4">
            <div className="flex flex-col gap-4 shrink-0">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-semibold text-[#1a3a5a]">Términos y Privacidad</h1>
                    <p className="text-base text-[#4a5565]">
                        Consulta las normas del servicio y las políticas de tratamiento de datos de Pogo
                    </p>
                </div>

                <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none pb-px">
                    <button
                        type="button"
                        onClick={() => setActiveTab('terms')}
                        className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer shrink-0 min-h-[44px] ${
                            activeTab === 'terms'
                                ? 'border-[#1a3a5a] text-[#1a3a5a]'
                                : 'border-transparent text-[#64748b] hover:text-[#1a3a5a]'
                        }`}
                    >
                        <FileText size={18} />
                        Términos y Condiciones
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('privacy')}
                        className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer shrink-0 min-h-[44px] ${
                            activeTab === 'privacy'
                                ? 'border-[#1a3a5a] text-[#1a3a5a]'
                                : 'border-transparent text-[#64748b] hover:text-[#1a3a5a]'
                        }`}
                    >
                        <Lock size={18} />
                        Política de Privacidad
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 h-full">
                <Card className="flex-1 flex flex-col !p-6 sm:!p-8 min-h-0 h-full overflow-hidden">
                    {activeTab === 'terms' ? (
                        <TermsAndConditionsContent />
                    ) : (
                        <PrivacyPolicyContent />
                    )}
                </Card>
            </div>
        </div>
    );
}