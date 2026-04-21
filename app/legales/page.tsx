"use client";
import ScrollToTopButton from "@/components/scroll-to-top-btn/scroll-to-top";
import { useGlobal } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { list } from "postcss";

const linksArray = [
  {
    name: "1. ACEPTACIÓN DE LOS TÉRMINOS",
    id: "ACEPTACION",
    text: "El acceso y uso de la plataforma DEODI (en adelante, la 'Plataforma'), de titularidad de la Universidad Nacional de Córdoba – Campus Norte (en adelante, 'Campus Norte UNC'), implica la aceptación plena y sin reservas de los presentes Términos y Condiciones. Si usted no está de acuerdo con estos términos, deberá abstenerse de utilizar la Plataforma.",
  },
  {
    name: "2. OBJETO DE LA PLATAFORMA",
    id: "OBJETO",
    text: "DEODI es una herramienta digital de orientación y diagnóstico de empleabilidad. Su propósito es: Permitir a los usuarios cargar sus antecedentes, experiencias e intereses. Generar un Perfil de Empleabilidad personalizado. Guiar al usuario en la selección de trayectos formativos y módulos dentro de la oferta académica de Campus Norte UNC. Interactuar con agentes de IA para la asistencia en la redacción de CV, Cartas de presentación.",
    list: [
      "Permitir a los usuarios cargar sus antecedentes, experiencias e intereses.",
      "Generar un Perfil de Empleabilidad personalizado.",
      "Guiar al usuario en la selección de trayectos formativos y módulos dentro de la oferta académica de Campus Norte UNC.",
      "Interactuar con agentes de IA para la asistencia en la redacción de CV, Cartas de presentación.",
    ],
  },
  {
    name: "3. CAPACIDAD LEGAL Y MENORES DE EDAD",
    id: "CAPACIDAD",
    text: "Dada la naturaleza de la Plataforma, orientada a generar perfiles de Empleabilidad, y guiar en la selección de trayectos formativos en Campus Norte UNC, dado que los destinatarios abarcan un universo de personas de 16 años en adelante, se establece la siguiente distinción:",
    list: [
      "Mayores de 18 años: Poseen plena capacidad para otorgar consentimiento.",
      "Menores de edad (16 y 17 años): los adolescentes pueden utilizar la plataforma bajo la supervisión de sus progenitores o representantes legales.",
      "Consentimiento Especial: El registro de un menor de 18 años implica que este cuenta con la autorización de sus padres o tutores. Campus Norte UNC se reserva el derecho de solicitar la acreditación de dicha autorización en cualquier momento. Los datos de menores serán tratados con un estándar de protección reforzado, priorizando su interés superior.",
    ],
  },
  {
    name: "4. PROTECCIÓN DE DATOS PERSONALES (LEY 25.326)",
    id: "PROTECCION",
    text: "Campus Norte UNC cumple con la Ley de Protección de Datos Personales y sus normas reglamentarias.",
    list: [
      "Finalidad: Los datos recolectados (CV, intereses, competencias) tienen como único fin la elaboración del perfil de empleabilidad y la recomendación de programas formativos.",
      "Consentimiento Informado: Al completar su perfil, el usuario presta su consentimiento libre, expreso e informado para que DEODI procese sus datos.",
      "Uso de Algoritmos: El usuario acepta que su 'Perfil de Empleabilidad' se genera mediante procesos automatizados de diagnóstico basados en la información suministrada.",
      "Confidencialidad: La UNC no venderá ni cederá sus datos a terceros con fines comerciales ajenos a los programas de Campus Norte sin consentimiento previo.",
    ],
  },
  {
    name: "5. DERECHOS ARCO (Acceso, Rectificación, Cancelación y Oposición)",
    id: "DERECHOS",
    text: "Los usuarios podrán ejercer sus derechos de acceso, rectificación, actualización o supresión de sus datos de forma gratuita en intervalos no inferiores a seis meses, enviando un correo electrónico a la administración de Campus Norte UNC o a través de la configuración de su perfil en la Plataforma.",
  },
  {
    name: "6. RESPONSABILIDAD Y LÍMITES DE LA PLATAFORMA",
    id: "RESPONSABILIDAD",
    text: "El usuario garantiza que la información proporcionada es veraz, exacta y actualizada. Es responsabilidad del usuario:",
    list: [
      "Mantener la confidencialidad de sus credenciales de acceso.",
      "No utilizar la plataforma para fines ilícitos o que afecten derechos de terceros.",
      "Asumir que el 'Perfil de Empleabilidad' es una herramienta de orientación y no garantiza, por sí sola, la obtención de un empleo.",
    ],
  },
  {
    name: "7. PROPIEDAD INTELECTUAL",
    id: "PROPIEDAD",
    text: "Todo el contenido de la Plataforma, incluyendo algoritmos de diagnóstico, diseño gráfico, logos y software, es propiedad exclusiva de la UNC o de sus licenciantes y está protegido por las leyes de propiedad intelectual.",
  },
  {
    name: "8. EXENCIÓN DE RESPONSABILIDAD",
    id: "EXENCION",
    text: "Campus Norte UNC no se responsabiliza por:",
    list: [
      "Interrupciones temporales de la Plataforma por razones técnicas.",
      "La veracidad de los datos cargados por otros usuarios.",
      "Decisiones de contratación tomadas por empresas externas basadas en el perfil generado, siendo este meramente orientativo.",
    ],
  },
  {
    name: "9. MODIFICACIONES",
    id: "MODIFICACIONES",
    text: "La UNC se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones serán notificadas a través de la Plataforma y el uso continuo de la misma implicará la aceptación de los nuevos términos.",
  },
  {
    name: "10. LEY APLICABLE Y JURISDICCIÓN",
    id: "APLICABLE",
    text: "Para todas las cuestiones judiciales que pudieran derivarse del uso de la Plataforma, serán competentes los Tribunales Federales de la Ciudad de Córdoba, República Argentina.",
  },
];

export default function Page() {
  const scroller = useGlobal((s) => s.scroller);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    scroller?.scrollTo(el, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      offset: -120,
    });
  };

  return (
    <main className="max-w-5xl mx-auto mt-32 px-6 md:px-0">
      <h1 className="text-2xl text-balance font-bold">
        TÉRMINOS Y CONDICIONES DE USO Y POLÍTICA DE PRIVACIDAD – PLATAFORMA
        DEODI (CAMPUS NORTE UNC)
      </h1>
      <ul className="py-10">
        {linksArray.map((link) => (
          <li key={link.id} className="">
            <Button
              onClick={() => handleScrollTo(link.id)}
              className="hover:underline "
            >
              {link.name}
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-10 pb-20">
        {linksArray.map((link) => (
          <div key={link.id}>
            <h2
              id={link.id}
              className="scroll-mt-32 text-xl text-pretty font-bold mb-4"
            >
              {link.name}
            </h2>
            <p className="text-pretty text-sm">{link.text}</p>
            {link.list && (
              <ul className="list-disc list-inside pl-4 mt-4 text-sm text-pretty">
                {link.list.map((item, i) => {
                  const colonIndex = item.indexOf(": ");
                  const hasColon = colonIndex !== -1;

                  const title = hasColon ? item.slice(0, colonIndex) : null;
                  const rest = hasColon ? item.slice(colonIndex + 2) : item;

                  return (
                    <li key={i} className="text-sm">
                      {title && <span className="font-bold">{title}: </span>}
                      {rest}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
      <ScrollToTopButton />
    </main>
  );
}
