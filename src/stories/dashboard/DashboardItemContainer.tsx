import { Box, Container, Typography } from '@mui/material';
import { twMerge } from 'tailwind-merge';

export type DashboardColor = 'default' | 'red';

type DashboardItemContainerProps = {
  className?: string;
  boxClassName?: string;
  value: string;
  description: string;
  color?: DashboardColor;
};

export function DashboardItemContainer({
  className,
  boxClassName,
  value,
  description,
  color = 'default',
}: DashboardItemContainerProps) {
  return (
    <Container className={twMerge(`mb-6 px-0 ${className}`)}>
      <Box
        className={twMerge([
          color === 'default' ? 'border-moodyBlue' : 'border-red',
          `px-6 py-4 border-solid border-2 overflow-hidden bg-white ${boxClassName}`,
        ])}
        sx={{
          borderTopLeftRadius: '20px',
          width: '230px',
          height: '110px',
        }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '38px',
          }}
          className={twMerge(`text-darkest font-medium mb-0 ${className}`)}>
          {value}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: '15px',
          }}
          className={twMerge(`text-darkest font-normal mb-0 ${className}`)}>
          {description}
        </Typography>
      </Box>
    </Container>
  );
}

DashboardItemContainer.defaultProps = {
  className: '',
  boxClassName: '',
  color: 'default' as DashboardColor,
};

export default DashboardItemContainer;
