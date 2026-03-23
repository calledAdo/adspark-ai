import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ArrowLeft, Eye, MousePointerClick, DollarSign, TrendingUp, Globe2 } from "lucide-react";

const PLACEMENTS_DATA: Record<string, {
  name: string;
  publisher: string;
  publisherDomain: string;
  type: string;
  status: string;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: string;
  dailyData: { day: string; impressions: number; clicks: number; spent: number }[];
}> = {
  "header-banner-techblog": {
    name: "Header Banner",
    publisher: "TechBlog.io",
    publisherDomain: "techblog.io",
    type: "728x90 Leaderboard",
    status: "active",
    spent: 520,
    impressions: 45200,
    clicks: 1340,
    ctr: "2.96%",
    dailyData: [
      { day: "Mon", impressions: 5200, clicks: 150, spent: 65 },
      { day: "Tue", impressions: 6800, clicks: 195, spent: 82 },
      { day: "Wed", impressions: 7100, clicks: 210, spent: 88 },
      { day: "Thu", impressions: 5900, clicks: 170, spent: 72 },
      { day: "Fri", impressions: 8200, clicks: 260, spent: 95 },
      { day: "Sat", impressions: 6400, clicks: 190, spent: 68 },
      { day: "Sun", impressions: 5600, clicks: 165, spent: 50 },
    ],
  },
  "sidebar-cryptonews": {
    name: "Sidebar 300x250",
    publisher: "CryptoNews Daily",
    publisherDomain: "cryptonews.daily",
    type: "300x250 Medium Rectangle",
    status: "active",
    spent: 380,
    impressions: 32100,
    clicks: 890,
    ctr: "2.77%",
    dailyData: [
      { day: "Mon", impressions: 3800, clicks: 100, spent: 45 },
      { day: "Tue", impressions: 4600, clicks: 130, spent: 55 },
      { day: "Wed", impressions: 5100, clicks: 145, spent: 62 },
      { day: "Thu", impressions: 4200, clicks: 115, spent: 50 },
      { day: "Fri", impressions: 5800, clicks: 170, spent: 68 },
      { day: "Sat", impressions: 4800, clicks: 135, spent: 55 },
      { day: "Sun", impressions: 3800, clicks: 95, spent: 45 },
    ],
  },
  "in-content-defiworld": {
    name: "In-Content Native",
    publisher: "DeFi World",
    publisherDomain: "defiworld.xyz",
    type: "Native In-Feed",
    status: "active",
    spent: 485,
    impressions: 40000,
    clicks: 1140,
    ctr: "2.85%",
    dailyData: [
      { day: "Mon", impressions: 4800, clicks: 130, spent: 58 },
      { day: "Tue", impressions: 5900, clicks: 170, spent: 72 },
      { day: "Wed", impressions: 6200, clicks: 180, spent: 78 },
      { day: "Thu", impressions: 5100, clicks: 145, spent: 62 },
      { day: "Fri", impressions: 7000, clicks: 210, spent: 88 },
      { day: "Sat", impressions: 6000, clicks: 170, spent: 72 },
      { day: "Sun", impressions: 5000, clicks: 135, spent: 55 },
    ],
  },
};

export default function AdvertiserPlacementDetail() {
  const { placementId } = useParams();
  const placement = PLACEMENTS_DATA[placementId || ""];

  if (!placement) {
    return (
      <div className="p-6">
        <Link to="/advertiser/dashboard" className="text-primary hover:underline text-sm flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <p className="mt-4 text-muted-foreground">Placement not found.</p>
      </div>
    );
  }

  const metrics = [
    { label: "Impressions", value: placement.impressions.toLocaleString(), icon: Eye, color: "text-primary" },
    { label: "Clicks", value: placement.clicks.toLocaleString(), icon: MousePointerClick, color: "text-accent" },
    { label: "CTR", value: placement.ctr, icon: TrendingUp, color: "text-success" },
    { label: "Spent", value: `${placement.spent} CKB`, icon: DollarSign, color: "text-warning" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <Link to="/advertiser/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{placement.name}</h1>
          <p className="text-sm text-muted-foreground">
            <Globe2 className="h-3.5 w-3.5 inline mr-1" />
            {placement.publisher} — <span className="font-mono text-xs">{placement.publisherDomain}</span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
              {placement.status}
            </span>
          </p>
        </div>
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
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={placement.dailyData}>
              <defs>
                <linearGradient id="placementGradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(185, 80%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(185, 80%, 55%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="placementGradPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(270, 60%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(270, 60%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(230, 25%, 12%)",
                  border: "1px solid hsl(230, 20%, 20%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 93%)",
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="impressions" stroke="hsl(185, 80%, 55%)" fill="url(#placementGradCyan)" strokeWidth={2} />
              <Area type="monotone" dataKey="clicks" stroke="hsl(270, 60%, 60%)" fill="url(#placementGradPurple)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-medium mb-3 text-muted-foreground">Publisher Details</h2>
          <div className="space-y-3">
            {[
              { label: "Publisher", value: placement.publisher },
              { label: "Domain", value: placement.publisherDomain },
              { label: "Ad Format", value: placement.type },
              { label: "Bid Model", value: "CPC (Cost per Click)" },
              { label: "Escrow Type", value: "Time-Based Lease Cell" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-mono text-xs">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-medium mb-3 text-muted-foreground">Daily Spend (CKB)</h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={placement.dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Area type="monotone" dataKey="spent" stroke="hsl(40, 90%, 55%)" fill="hsl(40, 90%, 55%)" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
