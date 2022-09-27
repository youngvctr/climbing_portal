const usernameRegexp = /^[A-za-z0-9]{2,10}$/;
const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&\s]{4,15}$/;
const nameRegexp = /^[a-zA-Zㄱ-ㅎ가-힣]{2,10}$/;
const emailRegexp =
  /^[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*@[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*.[a-zA-Z\s]{2,3}$/;
const phoneRegexp = /^\d{3}[-]?\d{3,4}[-]?\d{4}$/;

const validateUsername = (value) => usernameRegexp.test(value);
const validatePassword = (value) => passwordRegexp.test(value);
const validateName = (value) => nameRegexp.test(value);
const validateEmail = (value) => emailRegexp.test(value);
const validatePhone = (value) => phoneRegexp.test(value);

export { validateUsername, validatePassword, validateName, validateEmail, validatePhone };
