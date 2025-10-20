import type { SelectionOptions } from "../components/Selection";
import { statusItems } from "../config/statusConfig";
import decodeToken from "./decodeToken";

export default function getStatuses() {
const statusOptions = Object.entries(statusItems).map(item => ({value: item[0], label: item[1].label} as SelectionOptions));
return statusOptions
}
