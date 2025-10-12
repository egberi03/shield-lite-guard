import { useState } from "react";
import { Shield, ArrowLeft, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Scanner = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{
    type: "safe" | "danger" | "warning";
    title: string;
    description: string;
    confidence: number;
  } | null>(null);

  const scanMessage = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message to scan");
      return;
    }

    setScanning(true);
    setResult(null);

    // Simulate AI scanning
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Demo logic: detect phishing keywords
    const lowerMessage = message.toLowerCase();
    const phishingKeywords = ["urgent", "verify", "account blocked", "click here", "suspended", "prize", "winner"];
    const hasPhishing = phishingKeywords.some(keyword => lowerMessage.includes(keyword));

    if (hasPhishing) {
      setResult({
        type: "danger",
        title: "Phishing Detected",
        description: "This message contains suspicious content typical of phishing attempts. Do not click any links or share personal information.",
        confidence: 92,
      });
      toast.error("⚠️ Phishing threat detected!");
    } else {
      setResult({
        type: "safe",
        title: "Message is Safe",
        description: "No suspicious content detected. This message appears to be legitimate.",
        confidence: 95,
      });
      toast.success("✓ Message is safe");
    }

    setScanning(false);
  };

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
            <h1 className="text-xl font-bold">Message Scanner</h1>
            <p className="text-sm opacity-90">AI-powered phishing detection</p>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Scanning Status */}
        {scanning && (
          <Card className="p-6 text-center bg-primary/5 border-primary/20 shadow-shield">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
            <h3 className="text-lg font-semibold mb-2">Analyzing Message...</h3>
            <p className="text-sm text-muted-foreground">
              AI is checking for phishing patterns
            </p>
          </Card>
        )}

        {/* Result Display */}
        {result && !scanning && (
          <Card
            className={`p-6 ${
              result.type === "danger"
                ? "bg-destructive/10 border-destructive/30 shadow-danger"
                : result.type === "warning"
                ? "bg-warning/10 border-warning/30"
                : "bg-success/10 border-success/30"
            }`}
          >
            <div className="flex items-start gap-4">
              {result.type === "danger" && (
                <div className="w-12 h-12 bg-gradient-danger rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
                </div>
              )}
              {result.type === "safe" && (
                <div className="w-12 h-12 bg-gradient-safe rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-success-foreground" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">{result.title}</h3>
                <p className="text-sm mb-3">{result.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-background/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        result.type === "danger"
                          ? "bg-destructive"
                          : result.type === "warning"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{result.confidence}%</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Input Card */}
        <Card className="p-6 shadow-card">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Paste Message to Scan
            </label>
            <Textarea
              placeholder="Paste your SMS, WhatsApp, or email message here..."
              className="min-h-[200px] resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={scanning}
            />
          </div>
          
          <Button
            className="w-full bg-gradient-shield shadow-shield"
            size="lg"
            onClick={scanMessage}
            disabled={scanning || !message.trim()}
          >
            {scanning ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Scan Message
              </>
            )}
          </Button>
        </Card>

        {/* Examples */}
        <Card className="p-6 shadow-card">
          <h3 className="font-semibold mb-3">Try These Examples</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full text-left justify-start h-auto py-3 px-4"
              onClick={() => setMessage("Hello, your account has been suspended. Click here to verify immediately!")}
            >
              <span className="text-sm">Suspicious: Account suspension warning</span>
            </Button>
            <Button
              variant="outline"
              className="w-full text-left justify-start h-auto py-3 px-4"
              onClick={() => setMessage("Hi, are we still meeting for lunch tomorrow at 2pm?")}
            >
              <span className="text-sm">Safe: Regular conversation</span>
            </Button>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-primary/5 border-primary/20 shadow-card">
          <div className="flex gap-3">
            <Shield className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-1">How it works</h4>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes message patterns, URLs, and language to detect phishing attempts in real-time.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Scanner;
