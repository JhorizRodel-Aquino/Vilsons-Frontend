import { useState, useEffect } from "react";
import decodeToken from "../utils/decodeToken";

export default function useGetBranches() {
  const [branches, setBranches] = useState<{ value: string; label: string }[] | undefined>(undefined);

  useEffect(() => {
    const decoded = decodeToken();
    const userBranches = decoded?.UserInfo?.branches || [];

    const branchOptions = userBranches.map((branchItem: any) => ({
      value: branchItem.branchId,
      label: branchItem.branchName,
    }));

    setBranches(branchOptions);
  }, []);

  return { branches };
}
