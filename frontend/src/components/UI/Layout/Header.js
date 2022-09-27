import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';

export default function Header() {
  const navigate = useNavigate();

  const signInClickHanlder = () => navigate('/login');
  const signUpClickHanlder = () => navigate('/signup');

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Climbing
        </Typography>
        <Box>
          <Button onClick={signInClickHanlder} sx={{ color: 'white' }}>
            로그인
          </Button>
          <Button onClick={signUpClickHanlder} sx={{ color: 'white' }}>
            가입
          </Button>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
