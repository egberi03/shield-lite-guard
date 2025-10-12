import { useState } from "react";
import { Shield, Languages, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const languages = [
    { id: "english", name: "English", native: "English" },
    { id: "french", name: "French", native: "Français" },
    { id: "swahili", name: "Swahili", native: "Kiswahili" },
    { id: "yoruba", name: "Yoruba", native: "Yorùbá" },
    { id: "hausa", name: "Hausa", native: "Hausa" },
    { id: "amharic", name: "Amharic", native: "አማርኛ" },
    { id: "arabic", name: "Arabic", native: "العربية" },
  ];

  const features = [
    {
      title: "Real-time Protection",
      description: "Scan SMS, WhatsApp, and email messages instantly",
      icon: Shield,
    },
    {
      title: "Works Offline",
      description: "AI protection for up to 72 hours without internet",
      icon: Shield,
    },
    {
      title: "Multi-language Support",
      description: "Understands local languages and cultural context",
      icon: Languages,
    },
  ];

  const handleComplete = () => {
    localStorage.setItem("onboarding_complete", "true");
    localStorage.setItem("selected_language", selectedLanguage);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {step === 0 && (
            <>
              {/* Welcome Screen */}
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto bg-gradient-shield rounded-full flex items-center justify-center shadow-shield animate-pulse-slow">
                    <Shield className="w-12 h-12 text-primary-foreground" />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-4xl font-bold mb-2">ShieldLite AI</h1>
                  <p className="text-lg text-muted-foreground">
                    Your Guardian Against Phishing
                  </p>
                </div>

                <Card className="p-6 text-left shadow-card">
                  <p className="text-muted-foreground mb-4">
                    Protect yourself from mobile money fraud with AI-powered message scanning.
                  </p>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{feature.title}</h3>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Button
                  size="lg"
                  className="w-full bg-gradient-shield shadow-shield"
                  onClick={() => setStep(1)}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              {/* Language Selection */}
              <div className="space-y-6">
                <div className="text-center">
                  <Languages className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-3xl font-bold mb-2">Choose Your Language</h2>
                  <p className="text-muted-foreground">
                    Select your preferred language for the app
                  </p>
                </div>

                <Card className="p-4 shadow-card">
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setSelectedLanguage(lang.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          selectedLanguage === lang.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="font-semibold">{lang.name}</p>
                            <p className="text-sm text-muted-foreground">{lang.native}</p>
                          </div>
                          {selectedLanguage === lang.id && (
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep(0)}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-shield shadow-shield"
                    onClick={handleComplete}
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="pb-8">
        <div className="max-w-md mx-auto px-4">
          <div className="flex gap-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  step >= i ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
