import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Layers, DollarSign, TrendingUp, CheckCircle2 } from "lucide-react";

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
  { id: "header-banner", status: "booked", revenue: 245, fillRate: 92 },
  { id: "sidebar-300x250", status: "booked", revenue: 180, fillRate: 88 },
  { id: "footer-leaderboard", status: "available", revenue: 0, fillRate: 0 },
  { id: "in-content-native", status: "booked", revenue: 310, fillRate: 95 },
];

const metrics = [
  { label: "Total Revenue", value: "735 CKB", icon: DollarSign, color: "text-primary" },
  { label: "Fill Rate", value: "68.8%", icon: TrendingUp, color: "text-success" },
  { label: "Active Slots", value: "3 / 4", icon: Layers, color: "text-accent" },
  { label: "Verified", value: "Yes", icon: CheckCircle2, color: "text-success" },
];

export default function PublisherDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Inventory Hub</h1>
        <p className="text-sm text-muted-foreground mt-1">Seller Agent <span className="text-accent font-mono">SA-0x9b2c</span></p>
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
                <Tooltip
                  contentStyle={{
                    background: "hsl(230, 25%, 12%)",
                    border: "1px solid hsl(230, 20%, 20%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 93%)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(270, 60%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-medium mb-4 text-muted-foreground">Ad Slot Status</h2>
          <div className="space-y-3">
            {slots.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/30">
                <div>
                  <p className="text-sm font-mono">{slot.id}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Fill rate: {slot.fillRate}%
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      slot.status === "booked"
                        ? "bg-success/10 text-success border border-success/20"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {slot.status}
                  </span>
                  {slot.revenue > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">{slot.revenue} CKB</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
