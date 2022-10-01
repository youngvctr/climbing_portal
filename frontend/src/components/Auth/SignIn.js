import { Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useInput from '../../hooks/use-input';
import { validateUsername, validatePassword } from '../../utils/authValidator';
import useHttp from '../../hooks/use-http';
import config from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  });

  const {
    value: username,
    isValid: usernameIsValid,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput(validateUsername);
  const {
    value: password,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  const { isLoading, error, sendRequest: signInRequest } = useHttp();

  const signInHandler = (event) => {
    event.preventDefault();

    if (!usernameIsValid || !passwordIsValid) {
      return;
    }

    const reqeustConfig = {
      url: config.api.signIn,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { username, password },
    };
    const signUpCallback = () => {
      alert('로그인 완료'); // 페이지 이동 추후 구현
      dispatch(authActions.login());
    };
    signInRequest(reqeustConfig, signUpCallback);
  };

  return (
    <form onSubmit={signInHandler}>
      <Card sx={{ width: 400 }} className="flex justify-start flex-col">
        <TextField
          label="username"
          margin="dense"
          helperText={!usernameIsValid && '영문 또는 숫자 - 최소 2자, 최대 10자'}
          value={username}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          required
        />
        <TextField
          type="password"
          label="password"
          margin="dense"
          helperText={!passwordIsValid && '영문, 숫자, 특수문자 조합 - 최소 4자, 최대 15자'}
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          required
        />
        <LoadingButton type="submit" variant="outlined" size="large" sx={{ marginY: 2 }} loading={isLoading}>
          로그인
        </LoadingButton>
      </Card>
    </form>
  );
}
