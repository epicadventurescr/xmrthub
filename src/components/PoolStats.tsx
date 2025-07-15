
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const fetchPoolStats = async () => {
  const response = await fetch("https://supportxmr.com/api/pool/stats");
  if (!response.ok) {
    throw new Error('Failed to fetch pool stats');
  }
  return response.json();
};

export const PoolStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["poolStats"],
    queryFn: fetchPoolStats,
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
    retry: 3,
  });

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card p-4 rounded-md text-primary font-mono text-sm mt-4 border"
      >
        Loading pool statistics...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card p-4 rounded-md text-destructive font-mono text-sm mt-4 border"
      >
        Error loading pool statistics. Please try again later.
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card p-4 rounded-md text-primary font-mono text-sm mt-4 border"
    >
      <h4 className="text-primary font-bold mb-2">Pool Statistics</h4>
      <div className="grid grid-cols-2 gap-2 text-muted-foreground">
        <div>Hashrate: {((data?.pool?.hashrate || 0) / 1000000).toFixed(2)} MH/s</div>
        <div>Miners: {data?.pool?.miners || 0}</div>
        <div>Blocks Found: {data?.pool?.totalBlocks || 0}</div>
        <div>Fee: {data?.config?.fee || 0}%</div>
      </div>
    </motion.div>
  );
};
