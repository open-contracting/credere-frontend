import { Typography } from '@mui/material';
import { twMerge } from 'tailwind-merge';

type TileTypeType = 'page' | 'section';

export type TitleProps = {
  label: string;
  type?: 'page' | 'section' | 'subsection';
  className?: string;
};

type VariantType = 'h1' | 'h2';
export function Title({ label, type = 'section', className }: TitleProps) {
  let variant: VariantType = 'h2';
  let fontSizeClass = 'text-2xl font-medium';
  if (type === 'page') {
    variant = 'h1';
    fontSizeClass = 'text-3xl';
  }
  return (
    <Typography variant={variant} className={twMerge(`text-darkest font-bold mb-4 ${fontSizeClass} ${className}`)}>
      {label}
    </Typography>
  );
}

Title.defaultProps = {
  type: 'section' as TileTypeType,
  className: '',
};

export default Title;
