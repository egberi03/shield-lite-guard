import { ArrowLeft, CheckCircle, AlertTriangle, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const History = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const scanHistory = [
    { id: 1, type: "whatsapp", content: "Hi, are we still meeting tomorrow?", result: "safe", time: "2 min ago", confidence: 98 },
    { id: 2, type: "sms", content: "URGENT: Your account has been suspended...", result: "danger", time: "1 hour ago", confidence: 92 },
    { id: 3, type: "email", content: "Payment confirmation for your order", result: "safe", time: "3 hours ago", confidence: 95 },
    { id: 4, type: "sms", content: "Congratulations! You've won a prize...", result: "danger", time: "5 hours ago", confidence: 89 },
    { id: 5, type: "whatsapp", content: "Thanks for the update", result: "safe", time: "Yesterday", confidence: 99 },
    { id: 6, type: "sms", content: "Click here to verify your account", result: "danger", time: "Yesterday", confidence: 94 },
  ];

  const filteredHistory = filter === "all" 
    ? scanHistory 
    : scanHistory.filter(item => item.result === filter);

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
            <h1 className="text-xl font-bold">Scan History</h1>
            <p className="text-sm opacity-90">{filteredHistory.length} scans recorded</p>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Search and Filter */}
        <Card className="p-4 shadow-card">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search history..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-gradient-shield" : ""}
              >
                All
              </Button>
              <Button
                variant={filter === "safe" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("safe")}
                className={filter === "safe" ? "bg-gradient-safe" : ""}
              >
                Safe
              </Button>
              <Button
                variant={filter === "danger" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("danger")}
                className={filter === "danger" ? "bg-gradient-danger" : ""}
              >
                Threats
              </Button>
            </div>
          </div>
        </Card>

        {/* History List */}
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <Card
              key={item.id}
              className={`p-4 shadow-card cursor-pointer hover:shadow-lg transition-shadow ${
                item.result === "danger" ? "border-destructive/30" : "border-success/30"
              }`}
            >
              <div className="flex gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.result === "danger"
                      ? "bg-destructive/10"
                      : "bg-success/10"
                  }`}
                >
                  {item.result === "danger" ? (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-xs text-muted-foreground uppercase">
                      {item.type}
                    </p>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm font-medium mb-2 truncate">
                    {item.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium ${
                        item.result === "danger" ? "text-destructive" : "text-success"
                      }`}
                    >
                      {item.result === "danger" ? "Phishing Detected" : "Safe"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <Card className="p-12 text-center shadow-card">
            <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Results</h3>
            <p className="text-sm text-muted-foreground">
              No scan history found for this filter
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default History;
