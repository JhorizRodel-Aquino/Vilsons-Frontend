import decodeToken from "./decodeToken";

let branchOptions: { value: string, label: string }[] | undefined;

export function decodeBranches() {
    const decoded = decodeToken()
    const branches = decoded?.UserInfo?.branches;
    branchOptions = branches?.map(branchItem => ({ value: branchItem.branchId, label: branchItem.branchName }));
    return branchOptions
}

export function getBranches() {
    if (branchOptions) return branchOptions
    else {
        return decodeBranches()
    }
}
