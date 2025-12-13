import decodeToken from "../utils/decodeToken";

let cachedBranchOptions: { value: string, label: string }[] | undefined;

export function setBranches() {
    const decoded = decodeToken()
    const branches = decoded?.UserInfo?.branches;
    cachedBranchOptions = branches?.map(branchItem => ({ value: branchItem.branchId, label: branchItem.branchName }));
    return cachedBranchOptions
}

export function getBranches() {
    if (cachedBranchOptions) return cachedBranchOptions
    else {
        return setBranches()
    }
}
