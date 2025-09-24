import { statusItems } from "../config/statusConfig";
import Dropdown from "./Dropdown";

function StatusFilter() {
  return (
    <Dropdown>
      <option key='all' value="all" className="p-0 m-0">All Status</option>
        {Object.entries(statusItems).map(([stat, item]) => (
            <option key={stat} value={stat}>
            {item.label}
            </option>
        ))}
    </Dropdown>
  );
}

export default StatusFilter;