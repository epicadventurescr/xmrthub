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
    title: "MaticDapps",
    subtitle: "Build your dApp in 3 steps",
    steps: [
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
                  className="text-green-500 hover:text-green-400 underline"
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
            <div className="relative font-mono bg-black/90 text-green-500 p-3 rounded-md">
              <code className="block">pkg install python</code>
            </div>
            <p className="text-xs text-green-400/80 italic">Note: Press Y when prompted. This may take a few minutes to complete.</p>
          </div>
        ),
        command: "pkg install python",
      },
      {
        title: "Install MaticDapp",
        description: "Copy and run this command",
        content: (
          <div className="relative font-mono bg-black/90 text-green-500 p-3 rounded-md">
            <code className="block whitespace-pre-wrap">curl -L https://gist.github.com/DevGruGold/56cb10f2c66c1f48b070398051433c51/raw/ -o install_maticdapp_v2.py && python3 install_maticdapp_v2.py</code>
          </div>
        ),
        command: "curl -L https://gist.github.com/DevGruGold/56cb10f2c66c1f48b070398051433c51/raw/ -o install_maticdapp_v2.py && python3 install_maticdapp_v2.py",
      },
    ],
    back: "Back",
    next: "Next Step",
    copyCommand: "Copy Command",
    copied: "Copied!",
    copiedDesc: "Command copied to clipboard",
    contactSupport: "Contact Support"
  },
  es: {
    title: "MaticDapps",
    subtitle: "Construye tu dApp en 3 pasos",
    steps: [
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
                  className="text-green-500 hover:text-green-400 underline"
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
            <div className="relative font-mono bg-black/90 text-green-500 p-3 rounded-md">
              <code className="block">pkg install python</code>
            </div>
            <p className="text-xs text-green-400/80 italic">Nota: Presiona Y cuando se te solicite. Esto puede tardar unos minutos.</p>
          </div>
        ),
        command: "pkg install python",
      },
      {
        title: "Instalar MaticDapp",
        description: "Copia y ejecuta este comando",
        content: (
          <div className="relative font-mono bg-black/90 text-green-500 p-3 rounded-md">
            <code className="block whitespace-pre-wrap">curl -L https://gist.github.com/DevGruGold/56cb10f2c66c1f48b070398051433c51/raw/ -o install_maticdapp_v2.py && python3 install_maticdapp_v2.py</code>
          </div>
        ),
        command: "curl -L https://gist.github.com/DevGruGold/56cb10f2c66c1f48b070398051433c51/raw/ -o install_maticdapp_v2.py && python3 install_maticdapp_v2.py",
      },
    ],
    back: "Atrás",
    next: "Siguiente",
    copyCommand: "Copiar Comando",
    copied: "¡Copiado!",
    copiedDesc: "Comando copiado al portapapeles",
    contactSupport: "Contactar Soporte"
  }
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState<"en" | "es">("en");
  const { toast } = useToast();
  const t = translations[language];

  const handleNext = () => {
    if (currentStep < t.steps.length - 1) {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex justify-end mb-4">
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
          <h1 className="text-2xl font-bold font-['Press_Start_2P'] text-green-500 mb-2">
            {t.title}
          </h1>
          <p className="text-sm font-mono text-green-400">
            {t.subtitle}
          </p>
        </motion.div>

        <StepIndicator currentStep={currentStep} totalSteps={t.steps.length} />

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {t.steps.map((step, index) => (
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
                      className="mt-2 font-mono text-xs bg-green-500/20 border-green-500/50 hover:bg-green-500/30"
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
            className="font-mono text-sm bg-transparent border-green-500/50 hover:bg-green-500/20"
          >
            {t.back}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === t.steps.length - 1}
            className="font-mono text-sm bg-green-500 hover:bg-green-600"
          >
            {t.next}
          </Button>
        </div>

        <footer className="mt-8 pt-4 border-t border-green-500/20">
          <a
            href="mailto:xmrtsolutions@gmail.com"
            className="font-['Press_Start_2P'] text-xs text-green-400 hover:text-green-300 transition-colors"
          >
            {t.contactSupport}
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;