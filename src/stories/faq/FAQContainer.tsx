import { Box, Container, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type FAQContainerProps = {
  className?: string;
  boxClassName?: string;
  title?: string;
};
export function FAQContainer({
  className,
  title = 'Frequently Asked Questions',
  boxClassName,
  children,
}: FAQContainerProps & PropsWithChildren) {
  return (
    <Container
      maxWidth="md"
      sx={{
        minWidth: {
          lg: 345,
        },
      }}
      className={twMerge(`mx-0 px-0 ${className}`)}>
      <Box
        className={twMerge(`border-solid border-4 border-grass overflow-hidden bg-white ${boxClassName}`)}
        sx={{
          borderTopLeftRadius: '40px',
        }}>
        <Box
          className="p-6 border-b border-lightGray bg-white"
          sx={{
            borderBottomStyle: 'solid',
          }}>
          <Typography variant="h2" className="text-darkest text-2xl font-medium">
            {title}
          </Typography>
        </Box>
        {children}
      </Box>
    </Container>
  );
}

FAQContainer.defaultProps = {
  className: '',
  boxClassName: '',
  title: 'Frequently Asked Questions',
};

export default FAQContainer;
