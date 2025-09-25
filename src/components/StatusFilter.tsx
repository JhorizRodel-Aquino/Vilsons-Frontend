import { useEffect, useState } from "react";
import { statusItems } from "../config/statusConfig";
import Dropdown from "./Dropdown";

function StatusFilter() {
  const statusArr = Object.values(statusItems).map(item => item.label);
  const options = ['All Status', ...statusArr];
  const [status, setStatus] = useState(options[0]);

  useEffect(() => console.log(status), [status]) 

  return (
    <Dropdown options={options} value={status} setValue={setStatus} />
  );
}

export default StatusFilter;