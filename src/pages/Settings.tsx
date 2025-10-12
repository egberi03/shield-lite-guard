import { ArrowLeft, Languages, Bell, Shield, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: "Language",
      items: [
        { label: "App Language", value: "English", icon: Languages, action: () => {} },
      ],
    },
    {
      title: "Notifications",
      items: [
        { label: "Threat Alerts", toggle: true, icon: Bell },
        { label: "Voice Alerts", toggle: true, icon: Bell },
        { label: "Daily Summary", toggle: false, icon: Bell },
      ],
    },
    {
      title: "Security",
      items: [
        { label: "Auto-scan Messages", toggle: true, icon: Shield },
        { label: "Offline Mode", toggle: true, icon: Shield },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background pb-20">
      {/* Header */}
      <header className="bg-gradient-shield text-primary-foreground p-4 shadow-shield">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-white/20"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Settings</h1>
            <p className="text-sm opacity-90">Customize your protection</p>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {settingsSections.map((section, index) => (
          <Card key={index} className="p-6 shadow-card">
            <h3 className="font-semibold mb-4">{section.title}</h3>
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.toggle !== undefined ? (
                    <Switch defaultChecked={item.toggle} />
                  ) : (
                    <Button variant="ghost" size="sm" onClick={item.action}>
                      {item.value}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* App Info */}
        <Card className="p-6 shadow-card">
          <h3 className="font-semibold mb-4">About</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">AI Model</span>
              <span className="text-sm font-medium">ShieldLite v2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <span className="text-sm font-medium">Today</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {}}
          >
            <Info className="w-5 h-5 mr-3" />
            Help & Support
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => {}}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Clear All Data
          </Button>
        </div>

        {/* Footer Info */}
        <Card className="p-6 bg-primary/5 border-primary/20 shadow-card">
          <div className="flex gap-3">
            <Shield className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-1">Protected by ShieldLite AI</h4>
              <p className="text-xs text-muted-foreground">
                Safeguarding Africa's digital economy with AI-powered phishing detection
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
