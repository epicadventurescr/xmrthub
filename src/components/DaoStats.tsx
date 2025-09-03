import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const DAO_WALLET = "46UxNFuGM2E3UwmZWWJicaRPoRwqwW4byQkaTHkX8yPcVihp91qAVtSFipWUGJJUyTXgzSqxzDQtNLf2bsp2DX2qCCgC5mg";

const fetchDaoStats = async () => {
  const endpoints = {
    pool: "https://supportxmr.com/api/pool/stats",
    wallet: `https://supportxmr.com/api/miner/${DAO_WALLET}/stats`,
  };

  const proxies = [
    { label: "direct", type: "json" as const, wrap: (u: string) => u },
    { label: "allorigins", type: "json" as const, wrap: (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}` },
    { label: "isomorphic-git", type: "json" as const, wrap: (u: string) => `https://cors.isomorphic-git.org/${u}` },
    { label: "jina", type: "text" as const, wrap: (u: string) => `https://r.jina.ai/http://${u.replace(/^https?:\/\//, "")}` },
  ];

  async function get(url: string, type: "json" | "text") {
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (type === "json") return res.json();
    const text = await res.text();
    return JSON.parse(text);
  }

  let poolData: any | undefined;
  let walletData: any | undefined;
  let source = "mock";

  for (const p of proxies) {
    try {
      const [pool, wallet] = await Promise.all([
        get(p.wrap(endpoints.pool), p.type),
        get(p.wrap(endpoints.wallet), p.type),
      ]);
      poolData = pool;
      walletData = wallet;
      source = p.label;
      break;
    } catch (_e) {
      // try next proxy
    }
  }

  if (!poolData || !walletData) {
    return {
      pool: { pool: { hashrate: 0, miners: 0 } },
      wallet: { hash: 0, identifierStats: {} },
      source: "mock",
    };
  }

  return { pool: poolData, wallet: walletData, source };
};

export const DaoStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["daoStats"],
    queryFn: fetchDaoStats,
    refetchInterval: 30000,
    staleTime: 10000,
    retry: 3,
  });

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card/50 p-3 rounded-md text-primary font-mono text-xs mt-4 border border-muted"
      >
        Loading DAO statistics...
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
        Error loading DAO statistics
      </motion.div>
    );
  }

  // Helper functions
  const formatXMR = (amount: number) => (amount / 1000000000000).toFixed(6);
  const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString();
  const formatHashrate = (hash: number) => (hash / 1000000).toFixed(2);

  // Parse API data correctly based on SupportXMR API structure
  const daoHashrate = formatHashrate(data?.wallet?.hash || 0);
  const poolHashrate = formatHashrate(data?.pool?.pool_statistics?.hashRate || 0);
  const poolMiners = data?.pool?.pool_statistics?.miners || 0;
  
  // Historical wallet data
  const totalHashes = data?.wallet?.totalHashes || 0;
  const validShares = data?.wallet?.validShares || 0;
  const invalidShares = data?.wallet?.invalidShares || 0;
  const amtPaid = data?.wallet?.amtPaid || 0;
  const amtDue = data?.wallet?.amtDue || 0;
  const txnCount = data?.wallet?.txnCount || 0;
  const lastHash = data?.wallet?.lastHash || 0;

  console.log('DAO Stats Debug:', { 
    walletData: data?.wallet, 
    poolData: data?.pool?.pool_statistics,
    source: (data as any)?.source 
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card p-3 rounded-md text-foreground font-mono text-xs mt-4 border"
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className={`inline-block h-2 w-2 rounded-full ${((data as any)?.source && (data as any).source !== 'mock') ? 'bg-primary' : 'bg-muted'}`}></span>
        <span className="text-[10px] uppercase tracking-wide">{((data as any)?.source && (data as any).source !== 'mock') ? 'Live data' : 'Offline'}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 text-center mb-2">
        <div className="text-primary">
          DAO: <span className="text-foreground">{daoHashrate} MH/s</span>
        </div>
        <div className="text-primary">
          Pool: <span className="text-foreground">{poolHashrate} MH/s</span>
        </div>
        <div className="text-primary">
          Miners: <span className="text-foreground">{poolMiners}</span>
        </div>
      </div>
      
      {/* Historical wallet data */}
      <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-muted/30 pt-2">
        <div className="text-muted-foreground">
          Total Hashes: <span className="text-foreground">{totalHashes.toLocaleString()}</span>
        </div>
        <div className="text-muted-foreground">
          Valid Shares: <span className="text-foreground">{validShares.toLocaleString()}</span>
        </div>
        <div className="text-muted-foreground">
          Invalid Shares: <span className="text-foreground">{invalidShares}</span>
        </div>
        <div className="text-muted-foreground">
          Transactions: <span className="text-foreground">{txnCount}</span>
        </div>
        <div className="text-muted-foreground">
          XMR Paid: <span className="text-foreground">{formatXMR(amtPaid)}</span>
        </div>
        <div className="text-muted-foreground">
          XMR Due: <span className="text-foreground">{formatXMR(amtDue)}</span>
        </div>
        {lastHash > 0 && (
          <div className="col-span-2 text-muted-foreground text-center">
            Last Seen: <span className="text-foreground">{formatDate(lastHash)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};