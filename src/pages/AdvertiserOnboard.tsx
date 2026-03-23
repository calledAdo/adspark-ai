import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Welcome to **PaySpace**! 🚀 I'm your Campaign Agent. I'll help you set up a decentralized ad campaign on CKB in just a few steps.\n\nLet's start — **what product or service are you looking to advertise?**",
    timestamp: new Date(),
  },
];

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "Great! Let me understand your goals better. **What's your target monthly budget in CKB?** You can also specify in USD and I'll convert it.",
  budget:
    "Perfect. Now let's define your audience. **Which regions and demographics should we target?** For example: US, Europe, 18-35, tech-savvy.",
  audience:
    "Excellent targeting! Here's what I've configured for your campaign:\n\n```\n📋 Campaign Schema\n─────────────────\nProduct:    DeFi Wallet App\nBudget:     5,000 CKB/month\nRegions:    US, EU, Asia\nAudience:   18-35, crypto-native\nDuration:   30 days (auto-renew)\nBid Model:  CPC (Cost per Click)\nEscrow:     Time-Based Lease Cell\n```\n\nShall I proceed to **lock the escrow** and spawn your dedicated Buyer Agent? 🤖",
};

export default function AdvertiserOnboard() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [campaignReady, setCampaignReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const responseIndex = useRef(0);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const keys = Object.keys(MOCK_RESPONSES);
    const responseKey = keys[Math.min(responseIndex.current, keys.length - 1)];
    responseIndex.current++;

    setTimeout(() => {
      const response = MOCK_RESPONSES[responseKey];
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: new Date() },
      ]);
      setIsTyping(false);
      if (responseIndex.current >= keys.length) setCampaignReady(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center glow-cyan">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Create Campaign</h1>
            <p className="text-xs text-muted-foreground">AI-guided campaign setup • 1 Agent per Campaign</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30"
                    : "bg-muted border border-border"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-primary" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "glass text-foreground"
                    : "bg-primary/10 border border-primary/20 text-foreground"
                }`}
              >
                <MessageContent content={msg.content} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="glass rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary/60 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Campaign Ready Banner */}
      {campaignReady && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mb-3 rounded-xl gradient-border glass p-4 glow-cyan"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm font-medium">Campaign Schema Ready</p>
                <p className="text-xs text-muted-foreground">Approve to lock escrow & spawn your Buyer Agent</p>
              </div>
            </div>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Execute <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="px-6 pb-4 pt-2">
        <div className="flex gap-2 items-end glass rounded-2xl p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Describe your campaign..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none resize-none text-sm px-3 py-2 text-foreground placeholder:text-muted-foreground"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim()}
            className="h-9 w-9 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like rendering for bold and code blocks
  const parts = content.split(/(```[\s\S]*?```|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const code = part.replace(/```\n?/g, "");
          return (
            <pre key={i} className="mt-2 p-3 rounded-lg bg-background/60 font-mono text-xs overflow-x-auto whitespace-pre">
              {code}
            </pre>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
