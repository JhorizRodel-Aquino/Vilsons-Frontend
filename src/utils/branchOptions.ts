import decodeToken from "./decodeToken";

export default function getBranches() {
const decoded = decodeToken()
const branches = decoded?.UserInfo?.branches;
const branchOptions = branches?.map(branchItem => ({ value: branchItem.branchId, label: branchItem.branchName }));

return branchOptions
}
