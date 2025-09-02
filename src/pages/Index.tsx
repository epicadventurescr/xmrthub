import { useState } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { StepCard } from "@/components/StepCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PoolStats } from "@/components/PoolStats";
import { DaoStats } from "@/components/DaoStats";

const translations = {
  en: {
    title: "MobileMonero",
    subtitle: "Private cryptocurrency mining made simple",
    mobileSteps: [
      {
        title: "Install Termux",
        description: "Get Termux from Google Play Store",
        content: (
          <div className="space-y-2 text-muted-foreground font-mono">
            <ol className="list-decimal list-inside space-y-1">
              <li>Open Google Play Store</li>
              <li>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.termux" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
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
            <div className="relative font-mono bg-card/80 text-primary p-3 rounded-md border">
              <code className="block">pkg install python</code>
            </div>
            <p className="text-xs text-muted-foreground italic">Note: Press Y when prompted. This may take a few minutes to complete.</p>
          </div>
        ),
        command: "pkg install python",
      },
      {
        title: "Join MobileMonero",
        description: "Copy and run this command",
        content: (
          <div className="relative font-mono bg-card/80 text-primary p-3 rounded-md border">
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
          <div className="space-y-2 text-muted-foreground font-mono">
            <ol className="list-decimal list-inside space-y-1">
              <li>
                <a 
                  href="https://xmrig.com/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  Click here to download XMRig
                </a>
              </li>
            </ol>
          </div>
        ),
        command: ""
      },
      {
        title: "Configure XMRig",
        description: "Edit the config.json file",
        content: (
          <div className="space-y-2">
            <div className="relative font-mono bg-card/80 text-primary p-3 rounded-md border space-y-4">
              <div>
                <p className="mb-2">Pool URL:</p>
                <code className="block bg-muted p-2 rounded">pool.supportxmr.com:3333</code>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 font-mono text-xs border-primary/50 hover:bg-primary/10"
                  onClick={() => navigator.clipboard.writeText("pool.supportxmr.com:3333")}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Pool URL
                </Button>
              </div>
              <div>
                <p className="mb-2">Wallet Address:</p>
                <code className="block bg-muted p-2 rounded break-all">46UxNFuGM2E3UwmZWWJicaRPoRwqwW4byQkaTHkX8yPcVihp91qAVtSFipWUGJJUyTXgzSqxzDQtNLf2bsp2DX2qCCgC5mg</code>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 font-mono text-xs border-primary/50 hover:bg-primary/10"
                  onClick={() => navigator.clipboard.writeText("46UxNFuGM2E3UwmZWWJicaRPoRwqwW4byQkaTHkX8yPcVihp91qAVtSFipWUGJJUyTXgzSqxzDQtNLf2bsp2DX2qCCgC5mg")}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Wallet Address
                </Button>
              </div>
            </div>
          </div>
        ),
        command: ""
      },
      {
        title: "Launch XMRig",
        description: "Start mining",
        content: (
          <div className="relative font-mono bg-card/80 text-primary p-3 rounded-md border">
            <p>Launch the mining application to begin</p>
          </div>
        ),
        command: ""
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
    title: "MobileMonero",
    subtitle: "Minería de criptomonedas privadas simplificada",
    mobileSteps: [
      {
        title: "Instalar Termux",
        description: "Obtén Termux de Google Play Store",
        content: (
          <div className="space-y-2 text-muted-foreground font-mono">
            <ol className="list-decimal list-inside space-y-1">
              <li>Abre Google Play Store</li>
              <li>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.termux" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
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
            <div className="relative font-mono bg-card/80 text-primary p-3 rounded-md border">
              <code className="block">pkg install python</code>
            </div>
            <p className="text-xs text-muted-foreground italic">Nota: Presiona Y cuando se te solicite. Esto puede tardar unos minutos.</p>
          </div>
        ),
        command: "pkg install python",
      },
      {
        title: "Unirse a MobileMonero",
        description: "Copia y ejecuta este comando",
        content: (
          <div className="relative font-mono bg-card/80 text-primary p-3 rounded-md border">
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
          <div className="space-y-2 text-muted-foreground font-mono">
            <ol className="list-decimal list-inside space-y-1">
              <li>
                <a 
                  href="https://xmrig.com/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  Haz clic aquí para descargar XMRig
                </a>
              </li>
            </ol>
          </div>
        ),
        command: ""
      },
      {
        title: "Configurar XMRig",
        description: "Edita el archivo config.json",
        content: (
          <div className="space-y-2">
            <div className="relative font-mono bg-card/80 text-primary p-3 rounded-md border space-y-4">
              <div>
                <p className="mb-2">URL del Pool:</p>
                <code className="block bg-muted p-2 rounded">pool.supportxmr.com:3333</code>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 font-mono text-xs border-primary/50 hover:bg-primary/10"
                  onClick={() => navigator.clipboard.writeText("pool.supportxmr.com:3333")}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copiar URL del Pool
                </Button>
              </div>
              <div>
                <p className="mb-2">Dirección de la Billetera:</p>
                <code className="block bg-muted p-2 rounded break-all">46UxNFuGM2E3UwmZWWJicaRPoRwqwW4byQkaTHkX8yPcVihp91qAVtSFipWUGJJUyTXgzSqxzDQtNLf2bsp2DX2qCCgC5mg</code>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 font-mono text-xs border-primary/50 hover:bg-primary/10"
                  onClick={() => navigator.clipboard.writeText("46UxNFuGM2E3UwmZWWJicaRPoRwqwW4byQkaTHkX8yPcVihp91qAVtSFipWUGJJUyTXgzSqxzDQtNLf2bsp2DX2qCCgC5mg")}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copiar Dirección
                </Button>
              </div>
            </div>
          </div>
        ),
        command: ""
      },
      {
        title: "Iniciar XMRig",
        description: "Comienza a minar",
        content: (
          <div className="relative font-mono bg-card/80 text-primary p-3 rounded-md border">
            <p>Inicia la aplicación de minería para comenzar</p>
          </div>
        ),
        command: ""
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary text-foreground">
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
          <h1 className="text-2xl font-bold font-['Press_Start_2P'] text-primary mb-2">
            {t.title}
          </h1>
          <p className="text-sm font-mono text-muted-foreground">
            {t.subtitle}
          </p>
        </motion.div>

        <DaoStats />

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
                      className="mt-2 font-mono text-xs border-primary/50 hover:bg-primary/10"
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
            className="font-mono text-sm border-primary/50 hover:bg-primary/10"
          >
            {t.back}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="font-mono text-sm bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {t.next}
          </Button>
        </div>

        <footer className="mt-8 pt-4 border-t border-border">
          <div className="flex flex-col items-center space-y-4">
            <a
              href="mailto:xmrtsolutions@gmail.com?subject=MobileMonero Support Request&body=Hi%20MobileMonero%20team%2C%0A%0AI%20need%20help%20with%3A%0A%0A[Please%20describe%20your%20issue%20here]"
              className="font-['Press_Start_2P'] text-xs text-primary hover:text-primary/80 transition-colors"
            >
              {t.contactSupport}
            </a>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
              <a
                href="https://xmrtdao.streamlit.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
              >
                Register Your Sessions
              </a>
              <a
                href="https://xmrt.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
              >
                Learn More about XMRT DAO
              </a>
              <a
                href="https://xmrtdao.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
              >
                View Live Mining
              </a>
            </div>
            <a
              href="mailto:xmrtsolutions@gmail.com?subject=Subscribe to MobileMonero Updates"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
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
