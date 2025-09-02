import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const DAO_WALLET = "46UxNFuGM2E3UwmZWWJicaRPoRwqwW4byQkaTHkX8yPcVihp91qAVtSFipWUGJJUyTXgzSqxzDQtNLf2bsp2DX2qCCgC5mg";

const fetchDaoStats = async () => {
  const [poolResponse, walletResponse] = await Promise.all([
    fetch("https://supportxmr.com/api/pool/stats"),
    fetch(`https://supportxmr.com/api/miner/${DAO_WALLET}/stats`)
  ]);
  
  if (!poolResponse.ok || !walletResponse.ok) {
    throw new Error('Failed to fetch DAO stats');
  }
  
  const [poolData, walletData] = await Promise.all([
    poolResponse.json(),
    walletResponse.json()
  ]);
  
  return { pool: poolData, wallet: walletData };
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
      className="bg-card/50 p-3 rounded-md text-muted-foreground font-mono text-xs mt-4 border border-muted"
    >
      <div className="flex flex-wrap items-center justify-center gap-4 text-center">
        <div className="text-primary">
          DAO: <span className="text-accent">{daoHashrate.toFixed(2)} MH/s</span>
        </div>
        <div className="text-primary">
          Workers: <span className="text-accent">{daoWorkers}</span>
        </div>
        <div className="text-primary">
          Pool: <span className="text-accent">{poolHashrate} MH/s</span>
        </div>
      </div>
    </motion.div>
  );
};