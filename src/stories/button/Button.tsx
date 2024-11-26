import { Button as MUIButton, type ButtonProps as MUIButtonProps } from "@mui/material";
import { twMerge } from "tailwind-merge";

import ArrowInCircleIcon from "../../assets/icons/arrow-in-circle.svg";

type SizeType = "large" | "small";
export interface ButtonProps {
  primary?: boolean;
  label: string;
  size?: SizeType;
  noIcon?: boolean;
  icon?: string; // svg imported
  onClick?: () => void;
}

export function Button<C extends React.ElementType>({
  primary,
  size,
  label,
  noIcon,
  className,
  icon,
  ...props
}: MUIButtonProps<C, { component?: C }> & ButtonProps) {
  return (
    <MUIButton
      disableElevation
      size={size}
      startIcon={!noIcon ? <img src={icon} alt="button-icon" /> : undefined}
      className={twMerge(
        [
          primary ? "bg-grass" : "bg-lightGray hover:bg-softGray",
          "w-max text-lg text-darkest font-normal disabled:opacity-50",
          size === "large" ? "px-6 py-4" : "px-4 py-2",
          `normal-case ${className}`,
        ].join(" "),
      )}
      {...props}
    >
      {label}
    </MUIButton>
  );
}

Button.defaultProps = {
  primary: true,
  size: "large" as SizeType,
  noIcon: false,
  icon: ArrowInCircleIcon,
  onClick: undefined,
};

export default Button;
