import { Box, Container, Typography } from '@mui/material';
import { twMerge } from 'tailwind-merge';

export type DashboardColor = 'default' | 'red';

type DashboardItemContainerProps = {
  className?: string;
  valueClassName?: string;
  boxClassName?: string;
  value: string | number;
  suffix?: string;
  description: string;
  color?: DashboardColor;
};

export function DashboardItemContainer({
  className,
  valueClassName,
  boxClassName,
  value,
  suffix,
  description,
  color = 'default',
}: DashboardItemContainerProps) {
  return (
    <Container className={twMerge(`mb-6 px-0 ${className}`)}>
      <Box
        className={twMerge([
          color === 'default' ? 'border-moodyBlue' : 'border-red',
          `px-6 py-4 flex flex-col justify-center border-solid border-2 overflow-hidden bg-white ${boxClassName}`,
        ])}
        sx={{
          borderTopLeftRadius: '20px',
          width: '230px',
          height: '110px',
        }}>
        <Typography variant="h2" className={twMerge(`text-darkest text-[35px] font-medium mb-0 ${valueClassName}`)}>
          {value}
          {suffix}
        </Typography>
        <Typography variant="h2" className={twMerge(`text-darkest text-[15px] font-normal mb-0 ${className}`)}>
          {description}
        </Typography>
      </Box>
    </Container>
  );
}

DashboardItemContainer.defaultProps = {
  className: '',
  valueClassName: '',
  boxClassName: '',
  suffix: '',
  color: 'default' as DashboardColor,
};

export default DashboardItemContainer;
