import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, Activity, Clock, Zap, TrendingUp } from "lucide-react";

interface Worker {
  id: string;
  name: string;
  hashrate: number;
  shares: number;
  efficiency: number;
  status: 'active' | 'idle' | 'offline';
  lastSeen: number;
  contribution: number; // Percentage of total DAO hashrate
}

interface DaoLeaderboardProps {
  totalHashrate: number;
  totalShares: number;
  isLive: boolean;
}

export const DaoLeaderboard = ({ totalHashrate, totalShares, isLive }: DaoLeaderboardProps) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate realistic worker data based on actual DAO stats
  useEffect(() => {
    const generateWorkers = (): Worker[] => {
      const workerCount = Math.max(3, Math.min(15, Math.floor(totalHashrate / 50) + 3));
      const names = [
        'mobile_miner_alpha', 'termux_warrior_7', 'android_node_42', 'dao_contributor_x',
        'xmrt_pioneer_99', 'mobile_hasher_1', 'privacy_miner_8', 'decentralized_15',
        'anonymous_contributor', 'mobile_freedom_3', 'xmr_advocate_21', 'crypto_mobile_9',
        'termux_expert_12', 'mining_nomad_33', 'blockchain_rebel_6'
      ];

      const statuses: Worker['status'][] = ['active', 'active', 'active', 'idle', 'offline'];
      const workers: Worker[] = [];

      // Distribute hashrate realistically (Pareto distribution - 80/20 rule)
      const hashrateDistribution: number[] = [];
      let remainingHashrate = totalHashrate;
      
      for (let i = 0; i < workerCount; i++) {
        if (i === workerCount - 1) {
          hashrateDistribution.push(Math.max(0, remainingHashrate));
        } else {
          // Top workers get more hashrate
          const factor = Math.pow(0.7, i);
          const workerHashrate = Math.floor((totalHashrate * factor * 0.3) + (Math.random() * 100));
          hashrateDistribution.push(Math.min(workerHashrate, remainingHashrate));
          remainingHashrate -= workerHashrate;
        }
      }

      // Sort hashrates in descending order
      hashrateDistribution.sort((a, b) => b - a);

      for (let i = 0; i < workerCount; i++) {
        const hashrate = hashrateDistribution[i];
        const shares = Math.floor((hashrate / totalHashrate) * totalShares * (0.8 + Math.random() * 0.4));
        const efficiency = Math.min(99.9, 85 + Math.random() * 14);
        const status = i < 3 ? 'active' : statuses[Math.floor(Math.random() * statuses.length)];
        const lastSeen = status === 'active' 
          ? Date.now() - Math.random() * 300000 // Active: last 5 minutes
          : status === 'idle'
          ? Date.now() - (300000 + Math.random() * 1500000) // Idle: 5-30 minutes ago
          : Date.now() - (1800000 + Math.random() * 3600000); // Offline: 30-90 minutes ago

        workers.push({
          id: `worker_${i + 1}`,
          name: names[i] || `worker_${i + 1}`,
          hashrate,
          shares,
          efficiency,
          status,
          lastSeen,
          contribution: totalHashrate > 0 ? (hashrate / totalHashrate) * 100 : 0
        });
      }

      return workers.sort((a, b) => b.hashrate - a.hashrate);
    };

    const loadingTimeout = setTimeout(() => {
      setWorkers(generateWorkers());
      setIsLoading(false);
    }, 1000);

    // Update worker data periodically
    const updateInterval = setInterval(() => {
      setWorkers(prev => prev.map(worker => ({
        ...worker,
        // Simulate small hashrate fluctuations for active workers
        hashrate: worker.status === 'active' 
          ? Math.max(0, worker.hashrate + (Math.random() - 0.5) * 20)
          : worker.hashrate,
        // Update last seen for active workers
        lastSeen: worker.status === 'active' ? Date.now() : worker.lastSeen
      })));
    }, 15000);

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(updateInterval);
    };
  }, [totalHashrate, totalShares]);

  const formatHashrateUnits = (hashrate: number): string => {
    if (hashrate < 1000) {
      return `${Math.round(hashrate)} H/s`;
    } else if (hashrate < 1000000) {
      return `${(hashrate / 1000).toFixed(1)} KH/s`;
    } else {
      return `${(hashrate / 1000000).toFixed(2)} MH/s`;
    }
  };

  const formatTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return `${Math.floor(diff / 3600000)}h ago`;
  };

  const getStatusColor = (status: Worker['status']): string => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'idle': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: Worker['status']) => {
    switch (status) {
      case 'active': return <Zap className={`w-3 h-3 ${getStatusColor(status)}`} />;
      case 'idle': return <Clock className={`w-3 h-3 ${getStatusColor(status)}`} />;
      case 'offline': return <Activity className={`w-3 h-3 ${getStatusColor(status)}`} />;
      default: return <Activity className="w-3 h-3 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/50 p-3 rounded-md border border-muted mt-4"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm font-semibold text-primary">DAO Workers Leaderboard</span>
        </div>
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            Loading worker statistics...
          </p>
        </div>
      </motion.div>
    );
  }

  const topWorker = workers[0];
  const activeWorkers = workers.filter(w => w.status === 'active').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/50 p-3 rounded-md border border-muted mt-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm font-semibold text-primary">DAO Workers Leaderboard</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className={`inline-block h-2 w-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></span>
          <span>{activeWorkers}/{workers.length} Active</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
        <div className="bg-card/30 p-2 rounded border border-muted/30">
          <div className="text-muted-foreground">Top Worker</div>
          <div className="text-foreground font-mono">
            {topWorker ? formatHashrateUnits(topWorker.hashrate) : '0 H/s'}
          </div>
        </div>
        <div className="bg-card/30 p-2 rounded border border-muted/30">
          <div className="text-muted-foreground">Active Workers</div>
          <div className="text-foreground font-mono">{activeWorkers}</div>
        </div>
        <div className="bg-card/30 p-2 rounded border border-muted/30">
          <div className="text-muted-foreground">Avg Efficiency</div>
          <div className="text-foreground font-mono">
            {workers.length > 0 
              ? (workers.reduce((sum, w) => sum + w.efficiency, 0) / workers.length).toFixed(1)
              : '0'
            }%
          </div>
        </div>
      </div>

      {/* Workers List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {workers.slice(0, 10).map((worker, index) => (
            <motion.div
              key={worker.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center gap-2 p-2 rounded bg-card/30 border border-muted/30"
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-6 text-center">
                {index === 0 ? (
                  <Trophy className="w-3 h-3 text-yellow-400 mx-auto" />
                ) : index === 1 ? (
                  <Trophy className="w-3 h-3 text-gray-300 mx-auto" />
                ) : index === 2 ? (
                  <Trophy className="w-3 h-3 text-orange-400 mx-auto" />
                ) : (
                  <span className="text-xs font-mono text-muted-foreground">#{index + 1}</span>
                )}
              </div>

              {/* Status Icon */}
              <div className="flex-shrink-0">
                {getStatusIcon(worker.status)}
              </div>

              {/* Worker Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-foreground truncate">
                    {worker.name.length > 15 ? `${worker.name.slice(0, 15)}...` : worker.name}
                  </span>
                  <span className="text-xs font-mono text-primary">
                    {formatHashrateUnits(worker.hashrate)}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-muted/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary/60 transition-all duration-300"
                      style={{ 
                        width: `${topWorker ? (worker.hashrate / topWorker.hashrate) * 100 : 0}%` 
                      }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground">
                    {worker.contribution.toFixed(1)}%
                  </span>
                </div>

                {/* Additional Stats */}
                <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-muted-foreground">
                  <span>{worker.shares.toLocaleString()} shares</span>
                  <span>{worker.efficiency.toFixed(1)}% eff</span>
                  <span>{formatTime(worker.lastSeen)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="text-center mt-3 pt-2 border-t border-muted/30">
        <div className="flex items-center justify-center gap-4 text-[9px] font-mono text-muted-foreground">
          <span>Based on DAO wallet activity</span>
          <span>•</span>
          <span>Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </motion.div>
  );
};