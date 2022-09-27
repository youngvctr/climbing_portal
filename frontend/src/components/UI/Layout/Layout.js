import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  return (
    <>
      <Header />
      <Container sx={{ backgroundColor: '#8AAAE5' }} component="main">
        <Box
          sx={{
            paddingY: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
          component="section"
        >
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
