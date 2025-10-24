import { Dot } from "lucide-react";
import React from "react";

interface ConditionLegendProps {
  value: number | undefined;
  label: string;
  color: string;
}
const ConditionLegend = ({ value, label, color }: ConditionLegendProps) => {
  return (
    <div className="flex items-center gap-1 sm:text-base text-sm">
      <Dot strokeWidth={18} className={color} />
      <span className="w-[6.5rem] sm:w-auto">{label}</span>
      <span className="text-nowrap">: {value ?? "-"}</span>
    </div>
  );
};

export default ConditionLegend;
