import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userApi from '../../api/userApi';
import { saveToken } from '../../app/slices';
import { LoginComponent } from '../../Components/LoginComponent';

export const Login = () => {
  const [inputValue, setInputValue] = useState({ username: '', password: '' });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (inputValue.username === 'admin' && inputValue.password === 'demo') {
      userApi.login(inputValue).then((res) => {
        dispatch(saveToken(res.data[0].avatar));
        localStorage.setItem('token', res.data[0].avatar);
        alert('Đăng nhập thành công <3');
      });
    } else {
      alert('Sai tài khoản mật khẩu !');
    }
  };

  return (
    <LoginComponent
      onLogin={handleLogin}
      inputValue={inputValue}
      onChange={handleChange}
    />
  );
};
