"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export function ActivityTimeline({ activity }: any) {
  if (!activity?.transfers?.length) {
    return <div className="text-white/50 text-center py-8">No recent activity</div>;
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {activity.transfers.slice(0, 20).map((tx: any, i: number) => {
        const isSent = tx.from?.toLowerCase() === activity.transfers[0]?.from?.toLowerCase();
        
        return (
          <div key={i} className="p-3 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {isSent ? (
                  <ArrowUpRight className="w-4 h-4 text-red-400" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4 text-green-400" />
                )}
                <div>
                  <div className="text-white text-sm font-medium">
                    {tx.asset || tx.category || "Transfer"}
                  </div>
                  <div className="text-white/60 text-xs">
                    {isSent ? "Sent" : "Received"} • {tx.value?.toFixed(4) || "—"}
                  </div>
                </div>
              </div>
              <div className="text-white/40 text-xs">
                {tx.blockNum ? `Block ${tx.blockNum}` : "Pending"}
              </div>
            </div>
            {tx.hash && (
              <div className="text-white/40 text-xs mt-2 truncate font-mono">
                {tx.hash}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
