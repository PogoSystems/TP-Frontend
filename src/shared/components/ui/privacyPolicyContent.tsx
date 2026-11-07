export function PrivacyPolicyContent() {
    return (
        <div className="flex-1 h-full min-h-0 flex flex-col gap-5 text-sm text-text-body leading-relaxed overflow-y-auto pr-3 select-text">
            <p className="text-xs text-text-subtle font-medium">Última actualización: Noviembre de 2026</p>

            <p>
                De conformidad con la <strong>Ley N.º 29733 (Ley de Protección de Datos Personales de la República del Perú)</strong> y su Reglamento aprobado por el <strong>Decreto Supremo N.º 016-2024-JUS</strong>, la presente Política de Privacidad describe el tratamiento que POGO realiza respecto a la información de sus usuarios.
            </p>

            {/* 1. Responsable del Tratamiento */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">1. Responsable del Tratamiento de Datos</h3>
                <p>
                    El tratamiento de la información recopilada en la plataforma es gestionado por el equipo a cargo del desarrollo operativo de POGO. Para cualquier consulta o ejercicio de derechos ARCO, los usuarios pueden dirigirse a la cuenta de correo de atención oficial:{' '}
                    <a href="mailto:pogo.systems.team@gmail.com" className="text-accent-button font-medium underline">
                        pogo.systems.team@gmail.com
                    </a>.
                </p>
            </section>

            {/* 2. Datos Recopilados */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">2. Datos Personales Recopilados</h3>
                <p>POGO recopila las siguientes categorías de datos estrictamente necesarias:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Datos de Identificación y Registro:</strong> Nombre, apellido y correo electrónico institucional universitario.</li>
                    <li><strong>Datos del Perfil Académico:</strong> Universidad y carrera declaradas por el usuario.</li>
                    <li><strong>Datos de Desempeño y Uso:</strong> Respuestas a cuestionarios, puntuaciones, nivel en la Taxonomía de Bloom, frecuencia de estudio e historial de actividad.</li>
                    <li><strong>Contenido Académico Cargado:</strong> Textos y documentos (PDF, WORD, DOCX) subidos voluntariamente por el usuario para ser evaluados.</li>
                </ul>
            </section>

            {/* 3. Finalidades del Tratamiento */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">3. Finalidades del Tratamiento</h3>
                <p>Los datos son recopilados con las siguientes finalidades legítimas:</p>
                <ol className="list-decimal pl-5 space-y-1">
                    <li>Gestionar la cuenta del usuario e identificar su perfil académico universitario.</li>
                    <li>Procesar el contenido de los documentos para la generación automatizada de cuestionarios adaptativos.</li>
                    <li>Generar paneles de métricas y analítica sobre el progreso de aprendizaje autorregulado.</li>
                    <li>Atender solicitudes, consultas o reclamos enviados a los canales de soporte.</li>
                </ol>
            </section>

            {/* 4. Encargados y Transferencia Internacional */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">4. Encargados y Transferencias Internacionales</h3>
                <p>
                    Para prestar sus funciones, POGO recurre a proveedores tecnológicos que actúan como encargados del tratamiento y cuyos servidores se ubican fuera del Perú (realizando transferencias internacionales de datos):
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Auth0 (Okta, Inc.):</strong> Gestión segura de identidad y credenciales de acceso.</li>
                    <li><strong>Supabase, Inc.:</strong> Almacenamiento seguro de bases de datos relacionales y métricas.</li>
                    <li><strong>Google Cloud (Google LLC - Gemini API):</strong> Procesamiento de texto académico en modalidad pagada de facturación activa. <em>Garantía:</em> Únicamente se envía el texto académico imprescindible sin asociar deliberadamente datos de identificación personal del usuario.</li>
                </ul>
            </section>

            {/* 5. Conservación y Eliminación */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">5. Plazos de Conservación y Eliminación de Cuentas</h3>
                <p>
                    Los datos personales se conservarán mientras la cuenta del usuario permanezca activa. El usuario tiene derecho a solicitar en cualquier momento la <strong>cancelación y eliminación definitiva de su cuenta y de todos los datos asociados</strong> enviando un mensaje a <code>pogo.systems.team@gmail.com</code>.
                </p>
                <p>
                    Una vez atendida la solicitud, se procederá al borrado seguro de los datos de la cuenta, métricas e historial de documentos en nuestras bases de datos, salvo conservación exigida por norma legal peruana.
                </p>
            </section>

            {/* 6. Derechos ARCO */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">6. Ejercicio de Derechos ARCO</h3>
                <p>
                    Conforme a la Ley N.º 29733, los usuarios pueden ejercer en cualquier momento sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> mediante solicitud enviada a{' '}
                    <a href="mailto:pogo.systems.team@gmail.com" className="text-accent-button font-medium underline">
                        pogo.systems.team@gmail.com
                    </a>. La solicitud debe incluir el nombre completo, el correo institucional registrado y el detalle de la petición.
                </p>
                <p className="text-xs text-text-subtle">
                    Si el usuario considera que su atención no ha sido debida, puede presentar una reclamación ante la Autoridad Nacional de Protección de Datos Personales (ANPD) del Ministerio de Justicia y Derechos Humanos del Perú.
                </p>
            </section>
        </div>
    );
}