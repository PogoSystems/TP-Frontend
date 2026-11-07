export function TermsAndConditionsContent() {
    return (
        <div className="flex-1 h-full min-h-0 flex flex-col gap-5 text-sm text-text-body leading-relaxed overflow-y-auto pr-3 select-text">
            <p className="text-xs text-text-subtle font-medium">Última actualización: Noviembre de 2026</p>

            {/* 1. Identificación del Titular */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">1. Identificación del Titular y Contacto</h3>
                <p>
                    POGO pone a disposición de los usuarios el correo electrónico oficial{' '}
                    <a href="mailto:pogo.systems.team@gmail.com" className="text-accent-button font-medium underline">
                        pogo.systems.team@gmail.com
                    </a>{' '}
                    como canal directo para atender consultas, sugerencias, reportes de seguridad y solicitudes relacionadas con la plataforma, incluyendo el ejercicio de los derechos de acceso, rectificación, cancelación y oposición (ARCO).
                </p>
                <p className="text-xs text-text-subtle">
                    La identificación formal de la persona natural o jurídica responsable del tratamiento de los datos personales y la plataforma se encuentra detallada en la Política de Privacidad.
                </p>
            </section>

            {/* 2. Objeto */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">2. Objeto de la Plataforma</h3>
                <p>
                    POGO es una plataforma web de evaluación adaptativa y apoyo al aprendizaje autorregulado, dirigida a estudiantes universitarios. Permite el registro de usuarios, la carga y procesamiento de documentos académicos mediante herramientas de inteligencia artificial, la generación de cuestionarios basados en los contenidos proporcionados y su organización conforme a los niveles cognitivos de la Taxonomía de Bloom. Asimismo, permite realizar un seguimiento informativo del rendimiento y progreso académico del usuario.
                </p>
            </section>

            {/* 3. Independencia Institucional */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">3. Independencia Institucional</h3>
                <p>
                    POGO es una plataforma independiente de las universidades e instituciones de educación superior. Su utilización no implica afiliación, respaldo, patrocinio, representación ni reconocimiento institucional por parte de ninguna universidad.
                </p>
                <p>
                    El uso de correos electrónicos institucionales como mecanismo de registro responde a fines estrictamente organizativos y de identificación del perfil académico, sin establecer ninguna relación contractual o de representación entre POGO y la institución educativa correspondiente, salvo que exista un convenio o acuerdo formal vigente que establezca expresamente lo contrario.
                </p>
            </section>

            {/* 4. Requisitos de Uso */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">4. Público Objetivo y Requisitos</h3>
                <p>
                    El servicio está dirigido exclusivamente a personas mayores de 18 años que sean estudiantes universitarios y deseen utilizar la plataforma con fines académicos. El usuario declara que la información proporcionada durante el registro es veraz, actualizada y corresponde a su identidad.
                </p>
            </section>

            {/* 5. Carga de Archivos y Propiedad Intelectual */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">5. Carga de Archivos y Propiedad Intelectual</h3>
                <p>
                    Los usuarios conservan los derechos de propiedad intelectual que les correspondan sobre los documentos académicos (archivos PDF, WORD, DOCX) que carguen en POGO. El usuario declara contar con los derechos, autorizaciones o habilitaciones necesarias para cargar, almacenar y permitir el procesamiento de dichos documentos conforme a la legislación vigente de derechos de autor (D. Leg. N.º 822).
                </p>
                <p>
                    Se prohíbe la carga de documentos que vulneren derechos de propiedad intelectual de terceros, contengan información confidencial o incorporen datos personales o sensibles cuyo tratamiento no cuente con una base legal válida o autorización correspondiente.
                </p>
                <p>
                    Los derechos de propiedad intelectual sobre el nombre "POGO", sus logotipos, elementos gráficos, interfaz visual y software corresponden a sus respectivos titulares. Queda prohibida su reproducción, distribución o utilización no autorizada.
                </p>
            </section>

            {/* 6. Uso de Inteligencia Artificial */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">6. Uso de Inteligencia Artificial (Google Gemini API)</h3>
                <p>
                    POGO utiliza servicios de inteligencia artificial proporcionados por Google mediante Gemini API, bajo modalidad de facturación activa, para procesar documentos académicos y estructurar las evaluaciones.
                </p>
                <p>
                    Para estas operaciones, POGO transmite únicamente el contenido del texto académico necesario para el análisis, sin incluir deliberadamente datos personales de identificación como nombres, correos o identificadores de cuenta de los usuarios.
                </p>
                <p>
                    Conforme a las condiciones de los servicios de Gemini API con facturación activa, Google no utiliza los prompts ni las respuestas generadas para entrenar o mejorar sus productos públicos. Sin embargo, el proveedor puede conservar temporalmente determinados registros por motivos de seguridad técnica, prevención de abuso o cumplimiento legal.
                </p>
            </section>

            {/* 7. Naturaleza de los Resultados */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">7. Naturaleza de los Resultados</h3>
                <p>
                    Las evaluaciones, puntuaciones, métricas y niveles de desempeño generados por POGO tienen carácter exclusivamente informativo, formativo y orientativo. Su finalidad es apoyar el estudio autorregulado. <strong>No constituyen calificaciones oficiales, certificaciones de competencias ni evaluaciones reconocidas por ninguna universidad.</strong>
                </p>
                <p>
                    Debido a la naturaleza automatizada de los modelos de inteligencia artificial, las preguntas y clasificaciones cognitivas pueden presentar imprecisiones o inconsistencias técnicas impredecibles.
                </p>
            </section>

            {/* 8. Registro y Seguridad */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">8. Registro y Seguridad de Cuentas</h3>
                <p>
                    El usuario es el único responsable de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada desde su cuenta. En caso de detectar o sospechar un uso no autorizado de su cuenta, debe notificarlo inmediatamente al correo oficial de soporte.
                </p>
            </section>

            {/* 9. Servicios de Terceros */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">9. Proveedores e Infraestructura de Terceros</h3>
                <p>
                    POGO utiliza infraestructura de proveedores especializados para su funcionamiento operativo, tales como Auth0 (gestión de autenticación), Supabase (almacenamiento de base de datos relacional) y Google Cloud (procesamiento de texto con IA). El tratamiento realizado por estos servicios se sujeta a sus respectivas condiciones operativas y de seguridad.
                </p>
            </section>

            {/* 10. Feedback y Sugerencias */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">10. Retroalimentación y Sugerencias</h3>
                <p>
                    Los comentarios, sugerencias e ideas de mejora que los usuarios envíen voluntariamente a POGO podrán ser utilizados para optimizar y desarrollar nuevas funcionalidades en la plataforma. Esta utilización no implica la adquisición de derechos sobre los documentos académicos ni la información personal del usuario, ni supone una cesión de propiedad intelectual sobre contenido propio.
                </p>
            </section>

            {/* 11. Suspensión y Disponibilidad */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">11. Disponibilidad y Suspensión del Servicio</h3>
                <p>
                    POGO se reserva el derecho de realizar mantenimientos técnicos, actualizaciones o modificaciones en la plataforma que puedan causar interrupciones temporales. Asimismo, POGO podrá suspender o restringir el acceso a usuarios que violen las prohibiciones de uso, intenten vulnerar la seguridad de los sistemas o realicen actividades de ingeniería inversa.
                </p>
            </section>

            {/* 12. Modificaciones */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">12. Modificación de los Términos</h3>
                <p>
                    POGO se reserva el derecho de actualizar estos términos para reflejar cambios en las funcionalidades o en la normativa aplicable. Las actualizaciones serán notificadas mediante la publicación de la nueva versión en la plataforma con su fecha de vigencia.
                </p>
            </section>

            {/* 13. Legislación y Jurisdicción */}
            <section className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-text-title text-base">13. Legislación Aplicable</h3>
                <p>
                    Los presentes Términos y Condiciones se rigen por la legislación vigente de la República del Perú. Cualquier controversia relacionada con la interpretación o uso de POGO será atendida de conformidad con las vías y procedimientos legalmente establecidos, respetando las competencias administrativas y judiciales aplicables a los usuarios.
                </p>
            </section>
        </div>
    );
}