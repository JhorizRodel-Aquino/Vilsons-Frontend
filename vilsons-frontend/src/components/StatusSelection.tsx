import { statusItems } from "../config/statusConfig";

function StatusSelection() {
  return (
    <select name="status" id="status" className="filter-container">
    <option key='all' value="all">All Status</option>
    {Object.entries(statusItems).map(([stat, item]) => (
        <option key={stat} value={stat}>
        {item.label}
        </option>
    ))}
    </select>
  );
}

export default StatusSelection;