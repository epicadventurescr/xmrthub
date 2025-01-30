import { useState } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { StepCard } from "@/components/StepCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const translations = {
  en: {
    title: "XMRT DAO Initiative",
    subtitle: "Join the future of decentralized finance",
    mobileSteps: [
      {
        title: "Install Termux",
        description: "Get Termux from Google Play Store",
        content: (
          <div className="space-y-2 text-gray-600 font-mono">
            <ol className="list-decimal list-inside space-y-1">
              <li>Open Google Play Store</li>
              <li>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.termux" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline"
                >
                  Click here to install Termux
                </a>
              </li>
              <li>Open Termux</li>
            </ol>
          </div>
        ),
      },
      {
        title: "Install Python",
        description: "Copy and run this command (press Y when prompted)",
        content: (
          <div className="space-y-2">
            <div className="relative font-mono bg-black/90 text-blue-500 p-3 rounded-md">
              <code className="block">pkg install python</code>
            </div>
            <p className="text-xs text-blue-400/80 italic">Note: Press Y when prompted. This may take a few minutes to complete.</p>
          </div>
        ),
        command: "pkg install python",
      },
      {
        title: "Join XMRT DAO",
        description: "Copy and run this command",
        content: (
          <div className="relative font-mono bg-black/90 text-blue-500 p-3 rounded-md">
            <code className="block whitespace-pre-wrap">curl -o signup.py -L https://gist.githubusercontent.com/DevGruGold/dc22c5bf983663e36394af8565218d82/raw/ && python3 signup.py</code>
          </div>
        ),
        command: "curl -o signup.py -L https://gist.githubusercontent.com/DevGruGold/dc22c5bf983663e36394af8565218d82/raw/ && python3 signup.py",
      },
    ],
    pcSteps: [
      {
        title: "Download XMRig",
        description: "Get the latest version of XMRig",
        content: (
          <div className="space-y-2 text-gray-600 font-mono">
            <ol className="list-decimal list-inside space-y-1">
              <li>
                <a 
                  href="https://xmrig.com/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline"
                >
                  Click here to download XMRig
                </a>
              </li>
            </ol>
          </div>
        ),
      },
      {
        title: "Configure XMRig",
        description: "Edit the config.json file",
        content: (
          <div className="space-y-2">
            <div className="relative font-mono bg-black/90 text-blue-500 p-3 rounded-md">
              <p>Open config.json in a text editor and update:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Pool settings</li>
                <li>Wallet address</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: "Launch XMRig",
        description: "Start mining",
        content: (
          <div className="relative font-mono bg-black/90 text-blue-500 p-3 rounded-md">
            <p>Launch the mining application to begin</p>
          </div>
        ),
      },
    ],
    back: "Back",
    next: "Next Step",
    copyCommand: "Copy Command",
    copied: "Copied!",
    copiedDesc: "Command copied to clipboard",
    contactSupport: "Contact Support",
    subscribe: "Subscribe to Updates",
    platform: {
      mobile: "Mobile",
      pc: "PC"
    }
  },
  es: {
    title: "Iniciativa XMRT DAO",
    subtitle: "Únete al futuro de las finanzas descentralizadas",
    mobileSteps: [
      {
        title: "Instalar Termux",
        description: "Obtén Termux de Google Play Store",
        content: (
          <div className="space-y-2 text-gray-600 font-mono">
            <ol className="list-decimal list-inside space-y-1">
              <li>Abre Google Play Store</li>
              <li>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.termux" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline"
                >
                  Haz clic aquí para instalar Termux
                </a>
              </li>
              <li>Abre Termux</li>
            </ol>
          </div>
        ),
      },
      {
        title: "Instalar Python",
        description: "Copia y ejecuta este comando (presiona Y cuando se te solicite)",
        content: (
          <div className="space-y-2">
            <div className="relative font-mono bg-black/90 text-blue-500 p-3 rounded-md">
              <code className="block">pkg install python</code>
            </div>
            <p className="text-xs text-blue-400/80 italic">Nota: Presiona Y cuando se te solicite. Esto puede tardar unos minutos.</p>
          </div>
        ),
        command: "pkg install python",
      },
      {
        title: "Unirse a XMRT DAO",
        description: "Copia y ejecuta este comando",
        content: (
          <div className="relative font-mono bg-black/90 text-blue-500 p-3 rounded-md">
            <code className="block whitespace-pre-wrap">curl -o signup.py -L https://gist.githubusercontent.com/DevGruGold/dc22c5bf983663e36394af8565218d82/raw/ && python3 signup.py</code>
          </div>
        ),
        command: "curl -o signup.py -L https://gist.githubusercontent.com/DevGruGold/dc22c5bf983663e36394af8565218d82/raw/ && python3 signup.py",
      },
    ],
    pcSteps: [
      {
        title: "Descargar XMRig",
        description: "Obtén la última versión de XMRig",
        content: (
          <div className="space-y-2 text-gray-600 font-mono">
            <ol className="list-decimal list-inside space-y-1">
              <li>
                <a 
                  href="https://xmrig.com/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline"
                >
                  Haz clic aquí para descargar XMRig
                </a>
              </li>
            </ol>
          </div>
        ),
      },
      {
        title: "Configurar XMRig",
        description: "Edita el archivo config.json",
        content: (
          <div className="space-y-2">
            <div className="relative font-mono bg-black/90 text-blue-500 p-3 rounded-md">
              <p>Abre config.json en un editor de texto y actualiza:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Configuración del pool</li>
                <li>Dirección de la billetera</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: "Iniciar XMRig",
        description: "Comienza a minar",
        content: (
          <div className="relative font-mono bg-black/90 text-blue-500 p-3 rounded-md">
            <p>Inicia la aplicación de minería para comenzar</p>
          </div>
        ),
      },
    ],
    back: "Atrás",
    next: "Siguiente",
    copyCommand: "Copiar Comando",
    copied: "¡Copiado!",
    copiedDesc: "Comando copiado al portapapeles",
    contactSupport: "Contactar Soporte",
    subscribe: "Suscribirse a Actualizaciones",
    platform: {
      mobile: "Móvil",
      pc: "PC"
    }
  }
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [platform, setPlatform] = useState<"mobile" | "pc">("mobile");
  const { toast } = useToast();
  const t = translations[language];

  const steps = platform === "mobile" ? t.mobileSteps : t.pcSteps;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({
      title: t.copied,
      description: t.copiedDesc,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono">{t.platform.mobile}</span>
            <Switch
              checked={platform === "pc"}
              onCheckedChange={(checked) => setPlatform(checked ? "pc" : "mobile")}
            />
            <span className="text-sm font-mono">{t.platform.pc}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono">EN</span>
            <Switch
              checked={language === "es"}
              onCheckedChange={(checked) => setLanguage(checked ? "es" : "en")}
            />
            <span className="text-sm font-mono">ES</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold font-['Press_Start_2P'] text-blue-300 mb-2">
            {t.title}
          </h1>
          <p className="text-sm font-mono text-blue-200">
            {t.subtitle}
          </p>
        </motion.div>

        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {steps.map((step, index) => (
              <div key={index} className={index !== currentStep ? "hidden" : ""}>
                <StepCard
                  title={step.title}
                  description={step.description}
                  isActive={index === currentStep}
                >
                  {step.content}
                  {step.command && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 font-mono text-xs bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30"
                      onClick={() => handleCopy(step.command!)}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      {t.copyCommand}
                    </Button>
                  )}
                </StepCard>
              </div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="font-mono text-sm bg-transparent border-blue-500/50 hover:bg-blue-500/20"
          >
            {t.back}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="font-mono text-sm bg-blue-500 hover:bg-blue-600"
          >
            {t.next}
          </Button>
        </div>

        <footer className="mt-8 pt-4 border-t border-blue-500/20">
          <div className="flex flex-col items-center space-y-4">
            <a
              href="mailto:xmrtsolutions@gmail.com"
              className="font-['Press_Start_2P'] text-xs text-blue-300 hover:text-blue-200 transition-colors"
            >
              {t.contactSupport}
            </a>
            <a
              href="mailto:xmrtsolutions@gmail.com?subject=Subscribe to XMRT DAO Updates"
              className="text-xs text-blue-300 hover:text-blue-200 transition-colors"
            >
              {t.subscribe}
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
