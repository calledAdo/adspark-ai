import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ArrowLeft, Code2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  hasSnippet?: boolean;
  snippet?: string;
}

const INITIAL: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hey! I'm your Seller Agent 🤖 I'll help you create a new ad placement for your site.\n\n**What type of ad slot do you want to add?** For example:\n- Banner (728x90)\n- Medium Rectangle (300x250)\n- Native In-Feed\n- Sidebar Skyscraper (160x600)",
  },
];

const MOCK_FLOW: { trigger: string; response: Message }[] = [
  {
    trigger: "default",
    response: {
      id: "r1",
      role: "assistant",
      content: "Great choice! **Where on your page do you want this placement?** (e.g., header, sidebar, between blog paragraphs, footer)",
    },
  },
  {
    trigger: "location",
    response: {
      id: "r2",
      role: "assistant",
      content:
        "Perfect. I've configured your new placement. Here's the integration snippet — just paste it into your HTML where you want the ad to appear.\n\nThe snippet will automatically fetch available campaigns from the PaySpace network and render the highest-bidding creative.",
      hasSnippet: true,
      snippet: `<!-- PaySpace Ad Slot: new-placement -->
<div id="payspace-new-slot"
  data-ps-slot="custom-placement"
  data-ps-publisher="SA-0x9b2c"
  data-ps-format="300x250"
  data-ps-auto-refresh="30">
</div>
<script src="https://cdn.payspace.network/v1/loader.js"
  async defer></script>

<!-- Optional: Listen for ad events -->
<script>
  window.PaySpace?.on('impression', (e) => {
    console.log('Ad served:', e.campaignId);
  });
</script>`,
    },
  },
];

export default function PublisherNewPlacement() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const responseIndex = useRef(0);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    const idx = Math.min(responseIndex.current, MOCK_FLOW.length - 1);
    responseIndex.current++;

    setTimeout(() => {
      const resp = MOCK_FLOW[idx].response;
      setMessages((prev) => [...prev, { ...resp, id: Date.now().toString() }]);
      setIsTyping(false);
    }, 1200);
  };

  const copySnippet = (snippet: string, msgId: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Link to="/publisher/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center glow-purple">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">New Placement</h1>
            <p className="text-xs text-muted-foreground">Chat with your Seller Agent to set up a new ad slot</p>
          </div>
        </div>
      </div>

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
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant"
                  ? "bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30"
                  : "bg-muted border border-border"
              }`}>
                {msg.role === "assistant" ? <Bot className="h-4 w-4 text-accent" /> : <User className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "assistant" ? "glass text-foreground" : "bg-accent/10 border border-accent/20 text-foreground"
              }`}>
                <SimpleMarkdown content={msg.content} />
                {msg.hasSnippet && msg.snippet && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary">Integration Code</span>
                    </div>
                    <pre className="bg-background/60 rounded-lg p-3 text-xs font-mono overflow-x-auto text-muted-foreground leading-relaxed">
                      {msg.snippet}
                    </pre>
                    <Button
                      size="sm"
                      onClick={() => copySnippet(msg.snippet!, msg.id)}
                      className="mt-2 gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
                    >
                      {copiedId === msg.id ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy Snippet</>}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center">
              <Bot className="h-4 w-4 text-accent" />
            </div>
            <div className="glass rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="px-6 pb-4 pt-2">
        <div className="flex gap-2 items-end glass rounded-2xl p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Describe your placement..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none resize-none text-sm px-3 py-2 text-foreground placeholder:text-muted-foreground"
          />
          <Button size="icon" onClick={sendMessage} disabled={!input.trim()} className="h-9 w-9 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-30">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function SimpleMarkdown({ content }: { content: string }) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-accent">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
