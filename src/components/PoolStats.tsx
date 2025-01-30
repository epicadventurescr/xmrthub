import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const fetchPoolStats = async () => {
  const response = await fetch("https://supportxmr.com/api/pool/stats");
  return response.json();
};

export const PoolStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["poolStats"],
    queryFn: fetchPoolStats,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black/90 p-4 rounded-md text-blue-400 font-mono text-sm mt-4"
    >
      <h4 className="text-blue-500 mb-2">Pool Statistics</h4>
      <div className="grid grid-cols-2 gap-2">
        <div>Hashrate: {((data?.pool?.hashrate || 0) / 1000000).toFixed(2)} MH/s</div>
        <div>Miners: {data?.pool?.miners || 0}</div>
        <div>Blocks Found: {data?.pool?.totalBlocks || 0}</div>
        <div>Fee: {data?.config?.fee || 0}%</div>
      </div>
    </motion.div>
  );
};