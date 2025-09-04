import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const DAO_WALLET = "46UxNFuGM2E3UwmZWWJicaRPoRwqwW4byQkaTHkX8yPcVihp91qAVtSFipWUGJJUyTXgzSqxzDQtNLf2bsp2DX2qCCgC5mg";

interface MiningStats {
  poolHashrate: number;
  daoHashrate: number;
  miners: number;
  totalHashes: number;
  validShares: number;
  invalidShares: number;
  amtPaid: number;
  amtDue: number;
  txnCount: number;
  lastHash: number;
  source: string;
  isLive: boolean;
  networkDifficulty?: number;
  blockHeight?: number;
  lastBlockTime?: number;
}

const fetchDaoStats = async (): Promise<MiningStats> => {
  const endpoints = {
    pool: "https://supportxmr.com/api/pool/stats",
    wallet: `https://supportxmr.com/api/miner/${DAO_WALLET}/stats`,
    xmrtEcosystem: "https://xmrtnet-eliza.onrender.com/api/autonomous/status",
    moneroNetwork: "https://localmonero.co/blocks/api/stats",
  };

  // Enhanced proxy list with better CORS handling
  const proxies = [
    { label: "direct", type: "json" as const, wrap: (u: string) => u },
    { label: "cors-anywhere", type: "json" as const, wrap: (u: string) => `https://cors-anywhere.herokuapp.com/${u}` },
    { label: "allorigins", type: "json" as const, wrap: (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}` },
    { label: "corsproxy", type: "json" as const, wrap: (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}` },
    { label: "isomorphic-git", type: "json" as const, wrap: (u: string) => `https://cors.isomorphic-git.org/${u}` },
    { label: "jina", type: "text" as const, wrap: (u: string) => `https://r.jina.ai/http://${u.replace(/^https?:\/\//, "")}` },
  ];

  async function get(url: string, type: "json" | "text", timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const res = await fetch(url, { 
        headers: { 
          accept: "application/json",
          "User-Agent": "MobileMonero/1.0"
        },
        signal: controller.signal,
        mode: 'cors'
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (type === "json") return res.json();
      const text = await res.text();
      return JSON.parse(text);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  let poolData: any | undefined;
  let walletData: any | undefined;
  let networkData: any | undefined;
  let source = "mock";
  let isLive = false;

  // Try to fetch from multiple sources with fallbacks
  for (const p of proxies) {
    try {
      const promises = [
        get(p.wrap(endpoints.pool), p.type).catch(() => null),
        get(p.wrap(endpoints.wallet), p.type).catch(() => null),
        get(p.wrap(endpoints.moneroNetwork), p.type).catch(() => null),
      ];
      
      const [pool, wallet, network] = await Promise.all(promises);
      
      if (pool || wallet) {
        poolData = pool;
        walletData = wallet;
        networkData = network;
        source = p.label;
        isLive = true;
        break;
      }
    } catch (error) {
      console.log(`Proxy ${p.label} failed:`, error);
      // Continue to next proxy
    }
  }

  // Fallback to mock data with realistic values if all sources fail
  if (!poolData && !walletData) {
    const mockHashrate = Math.floor(Math.random() * 1000000) + 500000; // 0.5-1.5 MH/s
    const mockMiners = Math.floor(Math.random() * 100) + 50; // 50-150 miners
    
    return {
      poolHashrate: mockHashrate,
      daoHashrate: Math.floor(mockHashrate * 0.1), // DAO is ~10% of pool
      miners: mockMiners,
      totalHashes: Math.floor(Math.random() * 1000000000),
      validShares: Math.floor(Math.random() * 100000),
      invalidShares: Math.floor(Math.random() * 100),
      amtPaid: Math.floor(Math.random() * 1000000000000),
      amtDue: Math.floor(Math.random() * 100000000000),
      txnCount: Math.floor(Math.random() * 100),
      lastHash: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 3600),
      source: "mock",
      isLive: false,
      networkDifficulty: Math.floor(Math.random() * 1000000000000),
      blockHeight: 3000000 + Math.floor(Math.random() * 10000),
      lastBlockTime: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 120),
    };
  }

  // Parse real data
  const poolHashrate = poolData?.pool_statistics?.hashRate || poolData?.pool?.hashrate || 0;
  const miners = poolData?.pool_statistics?.miners || poolData?.pool?.miners || 0;
  const daoHashrate = walletData?.hash || 0;
  
  return {
    poolHashrate,
    daoHashrate,
    miners,
    totalHashes: walletData?.totalHashes || 0,
    validShares: walletData?.validShares || 0,
    invalidShares: walletData?.invalidShares || 0,
    amtPaid: walletData?.amtPaid || 0,
    amtDue: walletData?.amtDue || 0,
    txnCount: walletData?.txnCount || 0,
    lastHash: walletData?.lastHash || 0,
    source,
    isLive,
    networkDifficulty: networkData?.difficulty,
    blockHeight: networkData?.height,
    lastBlockTime: networkData?.last_block_timestamp,
  };
};

export const DaoStats = () => {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["daoStats", lastUpdate],
    queryFn: fetchDaoStats,
    refetchInterval: 15000, // Refresh every 15 seconds for more real-time feel
    staleTime: 5000, // Consider data stale after 5 seconds
    retry: 2,
    retryDelay: 1000,
  });

  // Auto-refresh every 30 seconds to simulate live feed
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card/50 p-3 rounded-md text-primary font-mono text-xs mt-4 border border-muted"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-wide">Connecting to mining network...</span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card/50 p-3 rounded-md text-destructive font-mono text-xs mt-4 border border-muted"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
          <span className="text-[10px] uppercase tracking-wide">Mining feed offline</span>
        </div>
        <div className="text-center">
          <button 
            onClick={() => refetch()} 
            className="text-[10px] underline hover:text-primary"
          >
            Retry Connection
          </button>
        </div>
      </motion.div>
    );
  }

  // Helper functions
  const formatXMR = (amount: number) => (amount / 1000000000000).toFixed(6);
  const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString();
  
  // Unit-aware hashrate formatting
  const formatHashrateUnits = (hashrate: number): string => {
    if (hashrate < 1000) {
      return `${Math.round(hashrate)} H/s`;
    } else if (hashrate < 1000000) {
      return `${(hashrate / 1000).toFixed(1)} KH/s`;
    } else {
      return `${(hashrate / 1000000).toFixed(2)} MH/s`;
    }
  };
  
  const formatTime = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const stats = data!;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card p-3 rounded-md text-foreground font-mono text-xs mt-4 border"
    >
      {/* Status indicator */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className={`inline-block h-2 w-2 rounded-full ${stats.isLive ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></span>
        <span className="text-[10px] uppercase tracking-wide">
          {stats.isLive ? 'Live Mining Feed' : 'Simulated Data'} • {stats.source}
        </span>
      </div>
      
      {/* Main stats */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-center mb-2">
        <div className="text-primary">
          DAO: <span className="text-foreground">{formatHashrateUnits(stats.daoHashrate)}</span>
        </div>
        <div className="text-primary">
          Pool: <span className="text-foreground">{formatHashrateUnits(stats.poolHashrate)}</span>
        </div>
        <div className="text-primary">
          Miners: <span className="text-foreground">{stats.miners}</span>
        </div>
      </div>
      
      {/* Network stats */}
      {(stats.networkDifficulty || stats.blockHeight) && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-center mb-2 text-[10px] text-muted-foreground">
          {stats.blockHeight && (
            <div>Block: <span className="text-foreground">{stats.blockHeight.toLocaleString()}</span></div>
          )}
          {stats.networkDifficulty && (
            <div>Difficulty: <span className="text-foreground">{(stats.networkDifficulty / 1000000000).toFixed(1)}G</span></div>
          )}
          {stats.lastBlockTime && (
            <div>Last Block: <span className="text-foreground">{formatTime(stats.lastBlockTime)}</span></div>
          )}
        </div>
      )}
      
      {/* Historical wallet data */}
      <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-muted/30 pt-2">
        <div className="text-muted-foreground">
          Total Hashes: <span className="text-foreground">{stats.totalHashes.toLocaleString()}</span>
        </div>
        <div className="text-muted-foreground">
          Valid Shares: <span className="text-foreground">{stats.validShares.toLocaleString()}</span>
        </div>
        <div className="text-muted-foreground">
          Invalid Shares: <span className="text-foreground">{stats.invalidShares}</span>
        </div>
        <div className="text-muted-foreground">
          Transactions: <span className="text-foreground">{stats.txnCount}</span>
        </div>
        <div className="text-muted-foreground">
          XMR Paid: <span className="text-foreground">{formatXMR(stats.amtPaid)}</span>
        </div>
        <div className="text-muted-foreground">
          XMR Due: <span className="text-foreground">{formatXMR(stats.amtDue)}</span>
        </div>
        {stats.lastHash > 0 && (
          <div className="col-span-2 text-muted-foreground text-center">
            Last Seen: <span className="text-foreground">{formatDate(stats.lastHash)}</span>
          </div>
        )}
      </div>
      
      {/* Live update indicator */}
      <div className="text-center mt-2 text-[9px] text-muted-foreground">
        Updated: {new Date().toLocaleTimeString()} • Auto-refresh: 15s
      </div>
    </motion.div>
  );
};

