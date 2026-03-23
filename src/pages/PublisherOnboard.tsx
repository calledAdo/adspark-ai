import { CheckCircle2, Globe, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublisherOnboard() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Publisher Onboarding</h1>
        <p className="text-sm text-muted-foreground mt-1">Verify your domain and start monetizing ad inventory</p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {[
          {
            step: 1,
            title: "Verify Domain Ownership",
            description: "Add a DNS TXT record or upload a verification file to prove you own the domain.",
            icon: Globe,
            done: false,
          },
          {
            step: 2,
            title: "Integrate PaySpace Snippet",
            description: "Add our lightweight HTML snippet to your pages. Your Seller Agent will guide you through it.",
            icon: Code2,
            done: false,
          },
          {
            step: 3,
            title: "Spawn Seller Agent",
            description: "Your dedicated Seller Agent will autonomously manage inventory, negotiate bids, and optimize fill rates.",
            icon: Sparkles,
            done: false,
          },
        ].map((s) => (
          <div key={s.step} className="glass rounded-xl p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
              {s.done ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <s.icon className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Step {s.step}: {s.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
            </div>
            <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
              Start
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
