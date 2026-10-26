import { useState } from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { RefreshCw, Home, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Button } from './button.tsx';
import { Card } from './card.tsx';

export function RouteErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);

    let title = '¡Ups! Algo no salió como esperábamos';
    let message = 'Ocurrió un problema inesperado al cargar esta sección. Por favor, intenta recargar.';
    let technicalDetails = '';

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            title = 'Página no encontrada (404)';
            message = 'La sección o recurso al que intentas acceder no existe o fue movido.';
        } else {
            title = `Error ${error.status}`;
            message = error.statusText || message;
        }
        technicalDetails = typeof error.data === 'string' ? error.data : JSON.stringify(error.data, null, 2);
    } else if (error instanceof Error) {
        technicalDetails = `${error.name}: ${error.message}\n\n${error.stack ?? ''}`;
        if (error.message.includes('removeChild') || error.message.includes('Node')) {
            title = 'Conflicto de visualización en el navegador';
            message = 'Detectamos una interferencia con las extensiones o traducción del navegador. Te recomendamos recargar la página.';
        }
    } else if (typeof error === 'string') {
        technicalDetails = error;
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-lg border border-border-card">
                <Card.Content className="flex flex-col items-center justify-center py-10 px-6 text-center gap-4">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 text-amber-500 mb-2">
                        <AlertTriangle size={36} />
                    </div>

                    <div className="flex flex-col gap-2 max-w-md">
                        <h2 className="text-xl font-bold text-text-title">{title}</h2>
                        <p className="text-sm text-text-subtle leading-relaxed">{message}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full justify-center">
                        <Button
                            text="Recargar página"
                            variant="primary"
                            icon={<RefreshCw size={16} />}
                            onClick={() => window.location.reload()}
                        />
                        <Button
                            text="Ir al inicio"
                            variant="secondary"
                            icon={<Home size={16} />}
                            onClick={() => navigate('/')}
                        />
                    </div>

                    {technicalDetails && (
                        <div className="w-full mt-6 pt-4 border-t border-border-divider">
                            <button
                                type="button"
                                onClick={() => setShowDetails((prev) => !prev)}
                                className="flex items-center justify-center gap-1.5 text-xs text-text-subtle hover:text-text-title transition-colors mx-auto cursor-pointer"
                            >
                                <span>{showDetails ? 'Ocultar detalles técnicos' : 'Ver detalles técnicos'}</span>
                                {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {showDetails && (
                                <pre className="mt-3 p-3 text-left text-xs bg-slate-900 text-slate-200 rounded-lg overflow-x-auto max-h-48 whitespace-pre-wrap break-all font-mono">
                                    {technicalDetails}
                                </pre>
                            )}
                        </div>
                    )}
                </Card.Content>
            </Card>
        </div>
    );
}
