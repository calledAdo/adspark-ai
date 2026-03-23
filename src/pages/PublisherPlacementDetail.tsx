import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ArrowLeft, Eye, DollarSign, TrendingUp, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PUBLISHER_PLACEMENTS: Record<string, {
  name: string;
  format: string;
  status: string;
  revenue: number;
  fillRate: number;
  impressions: number;
  dailyData: { day: string; impressions: number; revenue: number }[];
  snippet: string;
}> = {
  "header-banner": {
    name: "Header Banner",
    format: "728x90 Leaderboard",
    status: "booked",
    revenue: 245,
    fillRate: 92,
    impressions: 28500,
    dailyData: [
      { day: "Mon", impressions: 3200, revenue: 30 },
      { day: "Tue", impressions: 4100, revenue: 38 },
      { day: "Wed", impressions: 4500, revenue: 42 },
      { day: "Thu", impressions: 3800, revenue: 32 },
      { day: "Fri", impressions: 5200, revenue: 45 },
      { day: "Sat", impressions: 4200, revenue: 35 },
      { day: "Sun", impressions: 3500, revenue: 23 },
    ],
    snippet: `<!-- PaySpace Ad Slot: header-banner -->
<div id="payspace-header-banner"
  data-ps-slot="header-banner"
  data-ps-publisher="SA-0x9b2c"
  data-ps-format="728x90">
</div>
<script src="https://cdn.payspace.network/v1/loader.js"
  async defer></script>`,
  },
  "sidebar-300x250": {
    name: "Sidebar 300x250",
    format: "300x250 Medium Rectangle",
    status: "booked",
    revenue: 180,
    fillRate: 88,
    impressions: 21200,
    dailyData: [
      { day: "Mon", impressions: 2500, revenue: 22 },
      { day: "Tue", impressions: 3100, revenue: 28 },
      { day: "Wed", impressions: 3400, revenue: 30 },
      { day: "Thu", impressions: 2800, revenue: 24 },
      { day: "Fri", impressions: 3800, revenue: 32 },
      { day: "Sat", impressions: 3000, revenue: 25 },
      { day: "Sun", impressions: 2600, revenue: 19 },
    ],
    snippet: `<!-- PaySpace Ad Slot: sidebar-300x250 -->
<div id="payspace-sidebar"
  data-ps-slot="sidebar-300x250"
  data-ps-publisher="SA-0x9b2c"
  data-ps-format="300x250">
</div>
<script src="https://cdn.payspace.network/v1/loader.js"
  async defer></script>`,
  },
  "footer-leaderboard": {
    name: "Footer Leaderboard",
    format: "728x90 Leaderboard",
    status: "available",
    revenue: 0,
    fillRate: 0,
    impressions: 0,
    dailyData: [
      { day: "Mon", impressions: 0, revenue: 0 },
      { day: "Tue", impressions: 0, revenue: 0 },
      { day: "Wed", impressions: 0, revenue: 0 },
      { day: "Thu", impressions: 0, revenue: 0 },
      { day: "Fri", impressions: 0, revenue: 0 },
      { day: "Sat", impressions: 0, revenue: 0 },
      { day: "Sun", impressions: 0, revenue: 0 },
    ],
    snippet: `<!-- PaySpace Ad Slot: footer-leaderboard -->
<div id="payspace-footer"
  data-ps-slot="footer-leaderboard"
  data-ps-publisher="SA-0x9b2c"
  data-ps-format="728x90">
</div>
<script src="https://cdn.payspace.network/v1/loader.js"
  async defer></script>`,
  },
  "in-content-native": {
    name: "In-Content Native",
    format: "Native In-Feed",
    status: "booked",
    revenue: 310,
    fillRate: 95,
    impressions: 35800,
    dailyData: [
      { day: "Mon", impressions: 4200, revenue: 38 },
      { day: "Tue", impressions: 5100, revenue: 46 },
      { day: "Wed", impressions: 5600, revenue: 52 },
      { day: "Thu", impressions: 4800, revenue: 42 },
      { day: "Fri", impressions: 6200, revenue: 55 },
      { day: "Sat", impressions: 5200, revenue: 45 },
      { day: "Sun", impressions: 4700, revenue: 32 },
    ],
    snippet: `<!-- PaySpace Ad Slot: in-content-native -->
<div id="payspace-native"
  data-ps-slot="in-content-native"
  data-ps-publisher="SA-0x9b2c"
  data-ps-format="native">
</div>
<script src="https://cdn.payspace.network/v1/loader.js"
  async defer></script>`,
  },
};

export default function PublisherPlacementDetail() {
  const { placementId } = useParams();
  const placement = PUBLISHER_PLACEMENTS[placementId || ""];
  const [showSnippet, setShowSnippet] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!placement) {
    return (
      <div className="p-6">
        <Link to="/publisher/dashboard" className="text-accent hover:underline text-sm flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Inventory
        </Link>
        <p className="mt-4 text-muted-foreground">Placement not found.</p>
      </div>
    );
  }

  const copySnippet = () => {
    navigator.clipboard.writeText(placement.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const metrics = [
    { label: "Impressions", value: placement.impressions.toLocaleString(), icon: Eye, color: "text-primary" },
    { label: "Revenue", value: `${placement.revenue} CKB`, icon: DollarSign, color: "text-accent" },
    { label: "Fill Rate", value: `${placement.fillRate}%`, icon: TrendingUp, color: "text-success" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <Link to="/publisher/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{placement.name}</h1>
          <p className="text-sm text-muted-foreground">
            {placement.format}
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              placement.status === "booked"
                ? "bg-success/10 text-success border border-success/20"
                : "bg-muted text-muted-foreground border border-border"
            }`}>
              {placement.status}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{m.label}</span>
              <m.icon className={`h-4 w-4 ${m.color}`} />
            </div>
            <p className="text-2xl font-bold">{m.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-xl p-5">
        <h2 className="text-sm font-medium mb-4 text-muted-foreground">Daily Performance</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={placement.dailyData}>
              <defs>
                <linearGradient id="pubGradPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(270, 60%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(270, 60%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(230, 25%, 12%)", border: "1px solid hsl(230, 20%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)", fontSize: 12 }} />
              <Area type="monotone" dataKey="impressions" stroke="hsl(270, 60%, 60%)" fill="url(#pubGradPurple)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Snippet Section */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-medium">Integration Snippet</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSnippet(!showSnippet)}
            className="border-primary/30 text-primary hover:bg-primary/10 text-xs"
          >
            {showSnippet ? "Hide" : "Show"} Code
          </Button>
        </div>
        {showSnippet && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <pre className="bg-background/60 rounded-lg p-4 text-xs font-mono overflow-x-auto text-muted-foreground leading-relaxed">
              {placement.snippet}
            </pre>
            <Button
              size="sm"
              onClick={copySnippet}
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
            >
              {copied ? "Copied!" : "Copy Snippet"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
