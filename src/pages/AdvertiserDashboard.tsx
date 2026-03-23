import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import {
  TrendingUp, Eye, MousePointerClick, DollarSign, Globe2, ExternalLink,
} from "lucide-react";
import { AgentChatFab } from "@/components/AgentChatFab";

const impressionData = [
  { day: "Mon", impressions: 12400, clicks: 320 },
  { day: "Tue", impressions: 15200, clicks: 410 },
  { day: "Wed", impressions: 18100, clicks: 520 },
  { day: "Thu", impressions: 14300, clicks: 380 },
  { day: "Fri", impressions: 21000, clicks: 680 },
  { day: "Sat", impressions: 19500, clicks: 590 },
  { day: "Sun", impressions: 16800, clicks: 470 },
];

const geoData = [
  { name: "US", value: 42 },
  { name: "EU", value: 28 },
  { name: "Asia", value: 20 },
  { name: "Other", value: 10 },
];

const GEO_COLORS = [
  "hsl(185, 80%, 55%)",
  "hsl(270, 60%, 60%)",
  "hsl(150, 60%, 50%)",
  "hsl(40, 90%, 55%)",
];

const budgetData = [
  { day: "Mon", spent: 120 },
  { day: "Tue", spent: 180 },
  { day: "Wed", spent: 210 },
  { day: "Thu", spent: 150 },
  { day: "Fri", spent: 290 },
  { day: "Sat", spent: 240 },
  { day: "Sun", spent: 195 },
];

const metrics = [
  { label: "Impressions", value: "117.3K", change: "+12.4%", icon: Eye, color: "text-primary" },
  { label: "Clicks", value: "3,370", change: "+8.2%", icon: MousePointerClick, color: "text-accent" },
  { label: "CTR", value: "2.87%", change: "+0.3%", icon: TrendingUp, color: "text-success" },
  { label: "Spent", value: "1,385 CKB", change: "27.7%", icon: DollarSign, color: "text-warning" },
];

const placements = [
  { id: "header-banner-techblog", name: "Header Banner", publisher: "TechBlog.io", spent: 520, impressions: "45.2K", ctr: "2.96%", status: "active" },
  { id: "sidebar-cryptonews", name: "Sidebar 300x250", publisher: "CryptoNews Daily", spent: 380, impressions: "32.1K", ctr: "2.77%", status: "active" },
  { id: "in-content-defiworld", name: "In-Content Native", publisher: "DeFi World", spent: 485, impressions: "40.0K", ctr: "2.85%", status: "active" },
];

export default function AdvertiserDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-24">
      <div>
        <h1 className="text-2xl font-bold">Campaign Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">DeFi Wallet App • Buyer Agent <span className="text-primary font-mono">AG-0x7f3a</span></p>
      </div>

      {/* Metric Cards */}
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
            <p className={`text-xs mt-1 ${m.label === "Spent" ? "text-warning" : "text-success"}`}>
              {m.change} vs last week
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-xl p-5">
          <h2 className="text-sm font-medium mb-4 text-muted-foreground">Impressions & Clicks</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impressionData}>
                <defs>
                  <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(185, 80%, 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(185, 80%, 55%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(270, 60%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(270, 60%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(230, 25%, 12%)", border: "1px solid hsl(230, 20%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)", fontSize: 12 }} />
                <Area type="monotone" dataKey="impressions" stroke="hsl(185, 80%, 55%)" fill="url(#gradCyan)" strokeWidth={2} />
                <Area type="monotone" dataKey="clicks" stroke="hsl(270, 60%, 60%)" fill="url(#gradPurple)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-medium mb-4 text-muted-foreground flex items-center gap-2">
            <Globe2 className="h-4 w-4" /> Geo Distribution
          </h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={geoData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                  {geoData.map((_, i) => <Cell key={i} fill={GEO_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(230, 25%, 12%)", border: "1px solid hsl(230, 20%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {geoData.map((g, i) => (
              <div key={g.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: GEO_COLORS[i] }} />
                {g.name} {g.value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Placements + Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Placements */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-medium mb-4 text-muted-foreground">Active Placements</h2>
          <div className="space-y-3">
            {placements.map((p) => (
              <Link
                key={p.id}
                to={`/advertiser/placement/${p.id}`}
                className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/30 hover:border-primary/40 transition-colors group cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.publisher}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{p.impressions} imp</p>
                    <p className="text-xs text-warning">{p.spent} CKB</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-medium mb-4 text-muted-foreground">Daily Spend (CKB)</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(230, 25%, 12%)", border: "1px solid hsl(230, 20%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)", fontSize: 12 }} />
                <Bar dataKey="spent" fill="hsl(185, 80%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Floating Agent Chat */}
      <AgentChatFab
        agentName="Buyer Agent"
        agentId="AG-0x7f3a"
        agentType="buyer"
        initialMessage="Campaign performing well. CTR is up 0.3% this week. I've auto-optimized bid prices for the EU region where CPC was 15% above target. Ready for instructions."
      />
    </div>
  );
}
