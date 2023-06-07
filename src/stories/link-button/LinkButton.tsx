import { Box, Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

import ArrowInCircleIcon from '../../assets/icons/arrow-in-circle.svg';

type SizeType = 'large' | 'small';

export interface LinkButtonProps {
  label: string;
  size?: SizeType;
  noIcon?: boolean;
  iconClassName?: string;
  icon?: string; // svg imported
  onClick?: () => void;
}

export function LinkButton<C extends React.ElementType>({
  size,
  label,
  noIcon,
  iconClassName,
  className,
  icon,
  ...props
}: MUIButtonProps<C, { component?: C }> & LinkButtonProps) {
  return (
    <MUIButton
      disableElevation
      size={size}
      startIcon={!noIcon ? <img className={iconClassName} src={icon} alt="button-icon" /> : undefined}
      className={twMerge(
        [
          'w-max text-lg text-darkest font-normal',
          size === 'large' ? 'px-6 py-4' : 'px-4 py-2',
          `bg-transparent hover:bg-transparent normal-case ${className}`,
        ].join(' '),
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      <Box
        className="border-grass border-b-2"
        sx={{
          borderBottomStyle: 'solid',
        }}>
        {label}
      </Box>
    </MUIButton>
  );
}

LinkButton.defaultProps = {
  size: 'large' as SizeType,
  noIcon: false,
  icon: ArrowInCircleIcon,
  iconClassName: '',
  onClick: undefined,
};

export default LinkButton;
