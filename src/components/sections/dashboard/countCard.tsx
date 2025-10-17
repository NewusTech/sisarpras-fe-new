import CountCardLines from "@/assets/countCardLines";
import React from "react";

const CountCard = ({ title, numOf }: { title: string; numOf: number }) => {
  return (
    <div className="flex justify-between gap-5 bg-white rounded-xl shadow-md items-center relative overflow-hidden p-6 w-full">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold ">{title}</h2>
        <p className="text-primary font-semibold text-3xl">{numOf}</p>
      </div>
      <div className="absolute right-0">
        <CountCardLines />
      </div>
    </div>
  );
};

export default CountCard;
