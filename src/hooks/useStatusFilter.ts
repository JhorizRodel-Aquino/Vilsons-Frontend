import { useEffect, useState } from "react";
import { statusItems } from "../config/statusConfig";

export default function useStatusFilter(activeStatusOnly: boolean = false) {
    const statusArr = Object.values(statusItems).map(item => item.label);
    const options = activeStatusOnly ? statusArr : ['All Status', ...statusArr];
    const [status, setStatus] = useState(options[0]);

    return {options, status, setStatus}
}