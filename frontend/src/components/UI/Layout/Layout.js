import { Box, Container } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Container sx={{ backgroundColor: '#8AAAE5' }} component="main">
      <Box
        sx={{
          paddingY: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
        component="section"
      >
        {children}
      </Box>
    </Container>
  );
}
