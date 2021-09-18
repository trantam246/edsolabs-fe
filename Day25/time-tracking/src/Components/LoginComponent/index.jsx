import { Button, TextField } from '@material-ui/core';
import React from 'react';
import styles from './LoginComponent.module.scss';

export const LoginComponent = ({
  onLogin = () => {},
  onChange = () => {},
  inputValue = { username: '', password: '' },
}) => {
  return (
    <form className={styles.wrapper}>
      <div className={styles.header}>Login</div>

      <div className={styles.inputWrapper}>
        <p>Username:</p>
        <TextField
          name="username"
          variant="outlined"
          type="text"
          fullWidth
          value={inputValue.username}
          onChange={onChange}
        />
      </div>

      <div className={styles.inputWrapper}>
        <p>Password:</p>
        <TextField
          name="password"
          variant="outlined"
          type="password"
          fullWidth
          value={inputValue.password}
          onChange={onChange}
        />
      </div>

      <div className={styles.btn}>
        <Button type="button" variant="contained" onClick={onLogin}>
          Login
        </Button>
      </div>
    </form>
  );
};
