import { useEffect, useState } from "react";
import { getBranches } from "../services/branchService";

export default function useBranchOptions(pollInterval = 200) {
  const [branchOptions, setBranchOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    let intervalId: number; // <-- use number for browser

    const tryLoadBranches = () => {
      const branches = getBranches();
      if (branches?.length) {
        setBranchOptions(branches);
        clearInterval(intervalId); // stop polling once loaded
      }
    };

    tryLoadBranches(); // try once immediately
    intervalId = window.setInterval(tryLoadBranches, pollInterval); // browser-friendly

    return () => clearInterval(intervalId);
  }, [pollInterval]);

  return { branchOptions };
}
