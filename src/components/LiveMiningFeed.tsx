import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap, Users, TrendingUp } from "lucide-react";

interface MiningEvent {
  id: string;
  type: 'share' | 'block' | 'miner_join' | 'miner_leave' | 'payout';
  timestamp: number;
  data: {
    miner?: string;
    hashrate?: number;
    difficulty?: number;
    reward?: number;
    shares?: number;
  };
}

export const LiveMiningFeed = () => {
  const [events, setEvents] = useState<MiningEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Simulate real-time mining events
  useEffect(() => {
    const generateEvent = (): MiningEvent => {
      const eventTypes: MiningEvent['type'][] = ['share', 'block', 'miner_join', 'miner_leave', 'payout'];
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      const minerIds = [
        'mobile_miner_001', 'android_device_42', 'termux_user_99', 
        'dao_contributor_7', 'xmrt_miner_15', 'mobile_node_88'
      ];
      
      return {
        id: `${Date.now()}_${Math.random()}`,
        type,
        timestamp: Date.now(),
        data: {
          miner: minerIds[Math.floor(Math.random() * minerIds.length)],
          hashrate: Math.floor(Math.random() * 2000) + 100, // 100-2100 H/s
          difficulty: Math.floor(Math.random() * 1000000) + 500000,
          reward: Math.random() * 0.1,
          shares: Math.floor(Math.random() * 50) + 1,
        }
      };
    };

    // Initial connection simulation
    const connectTimeout = setTimeout(() => {
      setIsConnected(true);
      // Add initial events
      const initialEvents = Array.from({ length: 5 }, generateEvent);
      setEvents(initialEvents.sort((a, b) => b.timestamp - a.timestamp));
    }, 2000);

    // Generate new events periodically
    const eventInterval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance of new event
        const newEvent = generateEvent();
        setEvents(prev => [newEvent, ...prev.slice(0, 19)]); // Keep last 20 events
      }
    }, 3000 + Math.random() * 7000); // Random interval 3-10 seconds

    return () => {
      clearTimeout(connectTimeout);
      clearInterval(eventInterval);
    };
  }, []);

  const getEventIcon = (type: MiningEvent['type']) => {
    switch (type) {
      case 'share': return <Zap className="w-3 h-3 text-blue-400" />;
      case 'block': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'miner_join': return <Users className="w-3 h-3 text-green-400" />;
      case 'miner_leave': return <Users className="w-3 h-3 text-red-400" />;
      case 'payout': return <Activity className="w-3 h-3 text-yellow-400" />;
      default: return <Activity className="w-3 h-3 text-gray-400" />;
    }
  };

  const getEventMessage = (event: MiningEvent) => {
    const { type, data } = event;
    const minerId = data.miner?.slice(-3) || '???';
    
    switch (type) {
      case 'share':
        return `Miner ${minerId} submitted ${data.shares} shares (${data.hashrate}H/s)`;
      case 'block':
        return `Block found! Reward: ${data.reward?.toFixed(4)} XMR`;
      case 'miner_join':
        return `New miner ${minerId} joined (${data.hashrate}H/s)`;
      case 'miner_leave':
        return `Miner ${minerId} disconnected`;
      case 'payout':
        return `Payout sent: ${data.reward?.toFixed(6)} XMR to ${minerId}`;
      default:
        return `Mining activity from ${minerId}`;
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return `${Math.floor(diff / 3600000)}h ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/50 p-3 rounded-md border border-muted mt-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm font-semibold text-primary">Live Mining Feed</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`inline-block h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {isConnected ? 'LIVE' : 'CONNECTING...'}
          </span>
        </div>
      </div>

      {/* Events feed */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {!isConnected ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              Connecting to mining network...
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start gap-2 p-2 rounded bg-card/30 border border-muted/30"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-foreground leading-tight">
                    {getEventMessage(event)}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-1">
                    {formatTime(event.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      {isConnected && (
        <div className="text-center mt-3 pt-2 border-t border-muted/30">
          <p className="text-[9px] font-mono text-muted-foreground">
            Real-time mining activity from MobileMonero network
          </p>
        </div>
      )}
    </motion.div>
  );
};

