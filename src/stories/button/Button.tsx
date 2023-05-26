import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

import ArrowInCircleIcon from '../../assets/icons/arrow-in-circle.svg';

export interface ButtonProps {
  primary?: boolean;
  label: string;
  size?: 'large' | 'small';
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
          primary ? 'bg-grass' : 'bg-lightGray',
          `normal-case ${className}`,
          'w-max text-lg text-darkest font-normal',
          size === 'large' ? 'px-6 py-4' : 'px-4 py-2',
        ].join(' '),
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      {label}
    </MUIButton>
  );
}

Button.defaultProps = {
  primary: true,
  size: 'large',
  noIcon: false,
  icon: ArrowInCircleIcon,
  onClick: undefined,
};

export default Button;
