import { Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';
import {
  validateUsername,
  validatePassword,
  validateName,
  validateEmail,
  validatePhone,
} from '../../utils/authValidator';
import config from '../../config';

export default function SignUp() {
  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput(validateUsername);
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);
  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput(validatePassword);
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(validateName);
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);
  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput(validatePhone);

  const passwordMatchingIsValid = password === confirmPassword;

  const { isLoading, error, sendRequest: signUpRequest } = useHttp();

  const signUpHandler = (event) => {
    event.preventDefault();

    if (
      !usernameIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid ||
      !nameIsValid ||
      !emailIsValid ||
      !phoneIsValid
    ) {
      return;
    }

    let validatePhone = phone;
    if (!validatePhone.includes('-')) {
      const first = validatePhone.substring(0, 3);
      let second = validatePhone.substring(3, 7);
      let last = validatePhone.substring(7, 11);
      if (validatePhone.length === 10) {
        second = validatePhone.substring(3, 6);
        last = validatePhone.substring(6, 10);
      }
      validatePhone = `${first}-${second}-${last}`;
    }

    const joinData = {
      username: username.toLowerCase(),
      password: password.toLowerCase(),
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      phone: validatePhone,
    };

    const reqeustConfig = {
      url: config.api.signUp,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: joinData,
    };
    const signUpCallback = () => {
      alert('????????? ?????????????????????. ????????? ??? ??????????????????.');
    };
    signUpRequest(reqeustConfig, signUpCallback);
  };

  return (
    <form onSubmit={signUpHandler}>
      <Card sx={{ width: 400 }} className="flex justify-start flex-col">
        <TextField
          label="username"
          margin="dense"
          helperText={!usernameIsValid && '?????? ?????? ?????? - ?????? 2???, ?????? 10???'}
          value={username}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          error={usernameHasError}
          required
        />
        <TextField
          type="password"
          label="password"
          margin="dense"
          helperText={!passwordIsValid && '??????, ??????, ???????????? ?????? - ?????? 4???, ?????? 15???'}
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordHasError}
          required
        />
        <TextField
          type="password"
          label="confirm password"
          margin="dense"
          helperText={
            (!confirmPasswordIsValid && '??????, ??????, ???????????? ?????? - ?????? 4???, ?????? 15???') ||
            (!passwordMatchingIsValid && '???????????? ?????????')
          }
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          error={confirmPasswordHasError || !passwordMatchingIsValid}
          required
        />
        <TextField
          label="Name"
          margin="dense"
          helperText={!nameIsValid && '?????? 2???, ?????? 10???'}
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          error={nameHasError}
          required
        />
        <TextField
          label="Email"
          margin="dense"
          helperText={!emailIsValid && '@ ??????'}
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailHasError}
          required
        />
        <TextField
          label="Phone Number"
          margin="dense"
          helperText={!phoneIsValid && '010-1234-5678 ?????? 01012345678'}
          value={phone}
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          error={phoneHasError}
          required
        />
        <LoadingButton type="submit" variant="contained" size="large" sx={{ marginY: 2 }} loading={isLoading}>
          ??????
        </LoadingButton>
      </Card>
    </form>
  );
}
