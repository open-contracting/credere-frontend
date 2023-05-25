import { Button as MUIButton, ButtonProps as NUIButtonProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

import ArrowInCircleIcon from '../../assets/icons/arrow-in-circle.svg';

export type ButtonProps = {
  primary?: boolean;
  label: string;
  size?: 'large' | 'small';
  noIcon?: boolean;
  icon?: string; //svg imported
  onClick?: () => void;
};

export const Button = <C extends React.ElementType>({
  primary = true,
  size = 'large',
  label,
  noIcon = false,
  className,
  icon = ArrowInCircleIcon,
  ...props
}: NUIButtonProps<C, { component?: C }> & ButtonProps) => {
  return (
    <MUIButton
      disableElevation
      size={size}
      startIcon={!noIcon ? <img src={icon} alt="button-icon" /> : undefined}
      className={twMerge(
        [
          primary ? 'bg-grass' : 'bg-lightGray',
          `normal-case ${className}`,
          'w-max text-lg text-darkest font-normal',
          size == 'large' ? 'px-6 py-4' : 'px-4 py-2',
        ].join(' '),
      )}
      {...props}>
      {label}
    </MUIButton>
  );
};
