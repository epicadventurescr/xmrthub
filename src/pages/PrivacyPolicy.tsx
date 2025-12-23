import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

const translations = {
  en: {
    backToHome: "Back to Home",
    title: "Privacy Policy",
    introduction: {
      title: "Introduction",
      content: `This Privacy Policy explains how XMRT DAO ("we," "us," or "our") collects, uses, 
        and protects information when you use the MobileMonero mining application and related services. 
        By using our services, you agree to the collection and use of information in accordance with this policy.`
    },
    informationCollected: {
      title: "Information We Collect",
      intro: "We may collect the following types of information:",
      items: [
        { label: "Wallet Addresses:", text: "Monero wallet addresses used for mining payouts" },
        { label: "Mining Statistics:", text: "Hashrate, shares submitted, and mining session data" },
        { label: "Device Information:", text: "Basic device type (mobile/PC) for optimizing mining instructions" },
        { label: "Usage Data:", text: "How you interact with our application to improve user experience" }
      ]
    },
    howWeUse: {
      title: "How We Use Your Information",
      items: [
        "To facilitate cryptocurrency mining through the SupportXMR pool",
        "To display mining statistics and leaderboard information",
        "To manage collective fund distribution through the XMRT DAO",
        "To improve our services and user experience",
        "To communicate important updates about the mining pool or DAO"
      ]
    },
    collectiveFund: {
      title: "Collective Fund Management",
      content: "Funds mined through MobileMonero are collectively managed by",
      suiteAI: "Suite AI",
      contentEnd: "for the benefit of XMRT DAO and its member contributors. Mining proceeds are distributed according to DAO governance rules and contributor participation."
    },
    thirdParty: {
      title: "Third-Party Services",
      intro: "Our service integrates with the following third-party services:",
      items: [
        { label: "SupportXMR:", text: "Mining pool service for Monero mining" },
        { label: "Termux:", text: "Terminal application for Android devices (user-installed)" },
        { label: "XMRig:", text: "Mining software for PC platforms" }
      ],
      note: "These services have their own privacy policies, and we encourage you to review them."
    },
    dataSecurity: {
      title: "Data Security",
      content: `We implement appropriate technical and organizational measures to protect your information. 
        However, no method of transmission over the Internet or electronic storage is 100% secure. 
        While we strive to protect your data, we cannot guarantee absolute security.`
    },
    cookies: {
      title: "Cookies and Tracking",
      content: `We use minimal cookies and local storage to remember your preferences (such as language 
        and platform settings). We do not use third-party tracking or advertising cookies.`
    },
    yourRights: {
      title: "Your Rights",
      intro: "You have the right to:",
      items: [
        "Access information we hold about your mining activity",
        "Request correction of inaccurate data",
        "Stop using our services at any time",
        "Contact us with questions about your data"
      ]
    },
    changes: {
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify users of any 
        significant changes by posting the new policy on this page with an updated revision date.`
    },
    contactUs: {
      title: "Contact Us",
      content: "If you have any questions about this Privacy Policy or our data practices, please contact us at:"
    },
    lastUpdated: "Last updated: January 2026"
  },
  es: {
    backToHome: "Volver al Inicio",
    title: "Política de Privacidad",
    introduction: {
      title: "Introducción",
      content: `Esta Política de Privacidad explica cómo XMRT DAO ("nosotros", "nos" o "nuestro") recopila, usa 
        y protege la información cuando utiliza la aplicación de minería MobileMonero y los servicios relacionados. 
        Al utilizar nuestros servicios, usted acepta la recopilación y el uso de información de acuerdo con esta política.`
    },
    informationCollected: {
      title: "Información que Recopilamos",
      intro: "Podemos recopilar los siguientes tipos de información:",
      items: [
        { label: "Direcciones de Billetera:", text: "Direcciones de billetera Monero utilizadas para pagos de minería" },
        { label: "Estadísticas de Minería:", text: "Hashrate, acciones enviadas y datos de sesión de minería" },
        { label: "Información del Dispositivo:", text: "Tipo de dispositivo básico (móvil/PC) para optimizar las instrucciones de minería" },
        { label: "Datos de Uso:", text: "Cómo interactúa con nuestra aplicación para mejorar la experiencia del usuario" }
      ]
    },
    howWeUse: {
      title: "Cómo Usamos Su Información",
      items: [
        "Para facilitar la minería de criptomonedas a través del pool SupportXMR",
        "Para mostrar estadísticas de minería e información de clasificación",
        "Para gestionar la distribución colectiva de fondos a través del XMRT DAO",
        "Para mejorar nuestros servicios y experiencia de usuario",
        "Para comunicar actualizaciones importantes sobre el pool de minería o DAO"
      ]
    },
    collectiveFund: {
      title: "Gestión Colectiva de Fondos",
      content: "Los fondos minados a través de MobileMonero son gestionados colectivamente por",
      suiteAI: "Suite AI",
      contentEnd: "para el beneficio de XMRT DAO y sus miembros contribuyentes. Los ingresos de minería se distribuyen de acuerdo con las reglas de gobernanza del DAO y la participación de los contribuyentes."
    },
    thirdParty: {
      title: "Servicios de Terceros",
      intro: "Nuestro servicio se integra con los siguientes servicios de terceros:",
      items: [
        { label: "SupportXMR:", text: "Servicio de pool de minería para minería de Monero" },
        { label: "Termux:", text: "Aplicación de terminal para dispositivos Android (instalada por el usuario)" },
        { label: "XMRig:", text: "Software de minería para plataformas PC" }
      ],
      note: "Estos servicios tienen sus propias políticas de privacidad, y le animamos a revisarlas."
    },
    dataSecurity: {
      title: "Seguridad de Datos",
      content: `Implementamos medidas técnicas y organizativas apropiadas para proteger su información. 
        Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. 
        Aunque nos esforzamos por proteger sus datos, no podemos garantizar una seguridad absoluta.`
    },
    cookies: {
      title: "Cookies y Seguimiento",
      content: `Utilizamos cookies mínimas y almacenamiento local para recordar sus preferencias (como el idioma 
        y la configuración de la plataforma). No utilizamos cookies de seguimiento o publicidad de terceros.`
    },
    yourRights: {
      title: "Sus Derechos",
      intro: "Usted tiene derecho a:",
      items: [
        "Acceder a la información que tenemos sobre su actividad de minería",
        "Solicitar la corrección de datos inexactos",
        "Dejar de usar nuestros servicios en cualquier momento",
        "Contactarnos con preguntas sobre sus datos"
      ]
    },
    changes: {
      title: "Cambios a Esta Política",
      content: `Podemos actualizar esta Política de Privacidad de vez en cuando. Notificaremos a los usuarios 
        sobre cualquier cambio significativo publicando la nueva política en esta página con una fecha de revisión actualizada.`
    },
    contactUs: {
      title: "Contáctenos",
      content: "Si tiene alguna pregunta sobre esta Política de Privacidad o nuestras prácticas de datos, contáctenos en:"
    },
    lastUpdated: "Última actualización: Enero 2026"
  }
};

const PrivacyPolicy = () => {
  const [searchParams] = useSearchParams();
  const initialLang = searchParams.get("lang") === "es" ? "es" : "en";
  const [language, setLanguage] = useState<"en" | "es">(initialLang);
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-['Press_Start_2P'] text-xs">{t.backToHome}</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className={`text-xs ${language === "en" ? "text-primary" : "text-muted-foreground"}`}>EN</span>
            <Switch 
              checked={language === "es"}
              onCheckedChange={(checked) => setLanguage(checked ? "es" : "en")}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-xs ${language === "es" ? "text-primary" : "text-muted-foreground"}`}>ES</span>
          </div>
        </div>

        <h1 className="font-['Press_Start_2P'] text-xl md:text-2xl text-primary mb-8">
          {t.title}
        </h1>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.introduction.title}
            </h2>
            <p>{t.introduction.content}</p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.informationCollected.title}
            </h2>
            <p className="mb-3">{t.informationCollected.intro}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              {t.informationCollected.items.map((item, index) => (
                <li key={index}><strong>{item.label}</strong> {item.text}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.howWeUse.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              {t.howWeUse.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.collectiveFund.title}
            </h2>
            <p>
              {t.collectiveFund.content}{" "}
              <a 
                href="https://suite-beta.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline"
              >
                {t.collectiveFund.suiteAI}
              </a>{" "}
              {t.collectiveFund.contentEnd}
            </p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.thirdParty.title}
            </h2>
            <p className="mb-3">{t.thirdParty.intro}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              {t.thirdParty.items.map((item, index) => (
                <li key={index}><strong>{item.label}</strong> {item.text}</li>
              ))}
            </ul>
            <p className="mt-3">{t.thirdParty.note}</p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.dataSecurity.title}
            </h2>
            <p>{t.dataSecurity.content}</p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.cookies.title}
            </h2>
            <p>{t.cookies.content}</p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.yourRights.title}
            </h2>
            <p className="mb-3">{t.yourRights.intro}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              {t.yourRights.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.changes.title}
            </h2>
            <p>{t.changes.content}</p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              {t.contactUs.title}
            </h2>
            <p>
              {t.contactUs.content}{" "}
              <a 
                href="mailto:xmrtsolutions@gmail.com?subject=Privacy Policy Inquiry"
                className="text-primary hover:text-primary/80 underline"
              >
                xmrtsolutions@gmail.com
              </a>
            </p>
          </section>

          <section className="pt-4 border-t border-border">
            <p className="text-xs">{t.lastUpdated}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
