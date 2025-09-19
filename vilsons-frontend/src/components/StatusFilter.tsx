import { statusItems } from "../config/statusConfig";

function StatusFilter() {
  return (
    <div  className="filter-container">
    <select name="status" id="status">
      <option key='all' value="all">All Status</option>
      {Object.entries(statusItems).map(([stat, item]) => (
          <option key={stat} value={stat}>
          {item.label}
          </option>
      ))}
    </select></div>
  );
}

export default StatusFilter;