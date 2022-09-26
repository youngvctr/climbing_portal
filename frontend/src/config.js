function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;

  if (value == null) {
    throw new Error(`Key '${key}' is undefiend`);
  }

  return value;
}

const apiHost = required('REACT_APP_API_HOST');

const config = {
  api: {
    signUp: `${apiHost}${required('REACT_APP_API_SIGNUP')}`,
    signIn: `${apiHost}${required('REACT_APP_API_SIGNIN')}`,
  },
};

export default config;
