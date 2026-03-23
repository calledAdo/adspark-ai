import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Layers, DollarSign, TrendingUp, CheckCircle2, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentChatFab } from "@/components/AgentChatFab";

const revenueData = [
  { day: "Mon", revenue: 85 },
  { day: "Tue", revenue: 120 },
  { day: "Wed", revenue: 95 },
  { day: "Thu", revenue: 140 },
  { day: "Fri", revenue: 175 },
  { day: "Sat", revenue: 160 },
  { day: "Sun", revenue: 130 },
];

const slots = [
  { id: "header-banner", name: "Header Banner", status: "booked", revenue: 245, fillRate: 92, format: "728x90" },
  { id: "sidebar-300x250", name: "Sidebar 300x250", status: "booked", revenue: 180, fillRate: 88, format: "300x250" },
  { id: "footer-leaderboard", name: "Footer Leaderboard", status: "available", revenue: 0, fillRate: 0, format: "728x90" },
  { id: "in-content-native", name: "In-Content Native", status: "booked", revenue: 310, fillRate: 95, format: "Native" },
];

const metrics = [
  { label: "Total Revenue", value: "735 CKB", icon: DollarSign, color: "text-primary" },
  { label: "Fill Rate", value: "68.8%", icon: TrendingUp, color: "text-success" },
  { label: "Active Slots", value: "3 / 4", icon: Layers, color: "text-accent" },
  { label: "Verified", value: "Yes", icon: CheckCircle2, color: "text-success" },
];

export default function PublisherDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">Seller Agent <span className="text-accent font-mono">SA-0x9b2c</span></p>
        </div>
        <Link to="/publisher/new-placement">
          <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4" /> New Placement
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{m.label}</span>
              <m.icon className={`h-4 w-4 ${m.color}`} />
            </div>
            <p className="text-2xl font-bold">{m.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-medium mb-4 text-muted-foreground">Daily Revenue (CKB)</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(230, 25%, 12%)", border: "1px solid hsl(230, 20%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)", fontSize: 12 }} />
                <Bar dataKey="revenue" fill="hsl(270, 60%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">Ad Placements</h2>
            <span className="text-xs text-muted-foreground">{slots.length} slots</span>
          </div>
          <div className="space-y-3">
            {slots.map((slot) => (
              <Link
                key={slot.id}
                to={`/publisher/placement/${slot.id}`}
                className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/30 hover:border-accent/40 transition-colors group cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">{slot.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{slot.format} • Fill: {slot.fillRate}%</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      slot.status === "booked"
                        ? "bg-success/10 text-success border border-success/20"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}>
                      {slot.status}
                    </span>
                    {slot.revenue > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">{slot.revenue} CKB</p>
                    )}
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Agent Chat */}
      <AgentChatFab
        agentName="Seller Agent"
        agentId="SA-0x9b2c"
        agentType="seller"
        initialMessage="Your inventory is performing well today. 3 out of 4 slots are booked. I'm monitoring incoming bid requests — two new advertisers are competing for your header-banner slot. Need anything?"
      />
    </div>
  );
}
