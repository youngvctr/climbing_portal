import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/auth';

export default function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const signInClickHanlder = () => navigate('/login');
  const signUpClickHanlder = () => navigate('/signup');
  const signOutClickHandler = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

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
          {!isAuthenticated && (
            <Button onClick={signInClickHanlder} sx={{ color: 'white' }}>
              로그인
            </Button>
          )}
          {!isAuthenticated && (
            <Button onClick={signUpClickHanlder} sx={{ color: 'white' }}>
              가입
            </Button>
          )}
          {isAuthenticated && (
            <Button onClick={signOutClickHandler} sx={{ color: 'white' }}>
              로그아웃
            </Button>
          )}
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
