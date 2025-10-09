import React from "react";

interface RowDownIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const RowDownIcon: React.FC<RowDownIconProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
    >
      <path
        d="M1.41016 0.5H6.59082C7.03743 0.500227 7.26038 1.04311 6.94727 1.35645L4.35742 3.94629C4.16269 4.14102 3.84904 4.141 3.6543 3.94629L1.06445 1.35645C0.743612 1.0356 0.974209 0.500314 1.41016 0.5Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
};

export default RowDownIcon;
