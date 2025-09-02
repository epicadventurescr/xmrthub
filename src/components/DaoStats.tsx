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

  const daoHashrate = (data?.wallet?.hash || 0) / 1000000;
  const daoWorkers = data?.wallet?.identifierStats ? Object.keys(data.wallet.identifierStats).length : 0;
  const poolHashrate = ((data?.pool?.pool?.hashrate || 0) / 1000000).toFixed(1);

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
      <div className="flex flex-wrap items-center justify-center gap-4 text-center">
        <div className="text-primary">
          DAO: <span className="text-foreground">{daoHashrate.toFixed(2)} MH/s</span>
        </div>
        <div className="text-primary">
          Workers: <span className="text-foreground">{daoWorkers}</span>
        </div>
        <div className="text-primary">
          Pool: <span className="text-foreground">{poolHashrate} MH/s</span>
        </div>
      </div>
    </motion.div>
  );
};