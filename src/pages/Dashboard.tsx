import { Shield, Scan, History, Settings, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { label: "Messages Scanned", value: "1,247", icon: Scan, color: "text-primary" },
    { label: "Threats Blocked", value: "23", icon: AlertTriangle, color: "text-destructive" },
    { label: "Safe Messages", value: "1,224", icon: CheckCircle, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background pb-20">
      {/* Header */}
      <header className="bg-gradient-shield text-primary-foreground p-6 shadow-shield">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">ShieldLite AI</h1>
              <p className="text-sm opacity-90">Your Protection Guardian</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-white/20"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 text-center shadow-card">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Main Action Card */}
        <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-success/5 shadow-shield border-2 border-primary/20">
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-shield rounded-full flex items-center justify-center animate-pulse-slow shadow-shield">
              <Shield className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Protection Active</h2>
          <p className="text-muted-foreground mb-6">
            All your messages are being monitored in real-time
          </p>
          <Button
            size="lg"
            className="w-full bg-gradient-shield shadow-shield hover:opacity-90 transition-opacity"
            onClick={() => navigate("/scanner")}
          >
            <Scan className="w-5 h-5 mr-2" />
            Scan New Message
          </Button>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Scans</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/history")}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">WhatsApp Message</p>
                <p className="text-xs text-muted-foreground">Safe • 2 min ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">SMS Message</p>
                <p className="text-xs text-muted-foreground">Phishing Detected • 1 hour ago</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20 shadow-card">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-1">Security Tip</h4>
              <p className="text-sm text-muted-foreground">
                Never share your PIN or password via SMS, even if the message looks official.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <Button variant="ghost" className="flex-col h-auto py-2" onClick={() => navigate("/dashboard")}>
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xs mt-1 text-primary font-medium">Home</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2" onClick={() => navigate("/scanner")}>
            <Scan className="w-6 h-6" />
            <span className="text-xs mt-1">Scan</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2" onClick={() => navigate("/history")}>
            <History className="w-6 h-6" />
            <span className="text-xs mt-1">History</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
