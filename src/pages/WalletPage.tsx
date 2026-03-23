import { Wallet, Lock, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WalletPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Wallet & Escrow</h1>
      <p className="text-sm text-muted-foreground">CKB-Auth integration • JoyID / MetaMask</p>

      <div className="glass rounded-xl p-6 text-center glow-cyan">
        <Wallet className="h-10 w-10 text-primary mx-auto mb-3" />
        <h2 className="text-lg font-semibold mb-1">Connect Your Wallet</h2>
        <p className="text-sm text-muted-foreground mb-4">Link your CKB wallet to manage escrow and lease cells</p>
        <div className="flex gap-3 justify-center">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">JoyID</Button>
          <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10">MetaMask</Button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Active Lease Cells</h3>
        {[
          { id: "LC-0x3fa1", type: "Time-Based Lease", amount: "5,000 CKB", expires: "28 days", status: "Active" },
          { id: "VL-0x8d2b", type: "Vault Lock", amount: "2,500 CKB", expires: "14 days", status: "Active" },
        ].map((cell) => (
          <div key={cell.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {cell.type.includes("Lease") ? (
                <Clock className="h-5 w-5 text-primary" />
              ) : (
                <Lock className="h-5 w-5 text-accent" />
              )}
              <div>
                <p className="text-sm font-mono">{cell.id}</p>
                <p className="text-xs text-muted-foreground">{cell.type} • {cell.expires} remaining</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{cell.amount}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
                {cell.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
