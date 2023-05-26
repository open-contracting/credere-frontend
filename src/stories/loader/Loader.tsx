import { Box, CircularProgress, Container } from '@mui/material';

export function Loader() {
  return (
    <Container sx={{ height: '95vh' }}>
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
        <CircularProgress className="text-grass" />
      </Box>
    </Container>
  );
}

export default Loader;
