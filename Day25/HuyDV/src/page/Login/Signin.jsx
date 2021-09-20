import React, { useEffect, useState } from 'react';
import { Container, Item, Row, TitleHeading, Wrap, WrapForm } from './style';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { getData } from '../../API/axiosClient';

const UseStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
    '& .MuiTextField-root': {
      backgroundColor: '#fff',
      width: '100%',
      marginBottom: '20px',
      '& span': {
        color: 'black',
        fontSize: '16px',
      },
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
    '& label.Mui-focused': {
      color: 'black',
      fontSize: '20px',
    },

    '& .MuiInputBase-root': {
      backgroundColor: '#fff',
      width: '100%',
    },
  },
  formControl: {
    marginBottom: '30px',
  },
  btnRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

const Signin = (props) => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    localStorage.getItem('user')
      ? history.replace('/home')
      : history.replace('/');
  }, [localStorage.getItem('user')]);

  useEffect(() => {
    getData('users')
      .then((res) => {
        const persons = res.data;
        setData(persons);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClickButtun = () => {
    data.forEach((item) => {
      if (item.username === username && item.password === password) {
        alert('đăng nhập thành công!');
        localStorage.setItem('user', 'huy');
        history.push('/home');
      } else {
        alert('sai tài khoản hoặc mật khẩu');
      }
    });
  };

  const classes = UseStyles();

  return (
    <Wrap>
      <Container>
        <WrapForm>
          <TitleHeading>Login</TitleHeading>
          <Row>
            <Item>
              <h3>Task yourself</h3>
              <p>Organize your work logically and efficiently</p>
            </Item>
            <Item bgColor="white">
              <form
                className={classes.root}
                method="get"
                action="#"
                noValidate
                autoComplete="off"
              >
                <div className={classes.formControl}>
                  <TextField
                    onChange={handleChangeUsername}
                    id="outlined-basic"
                    type="text"
                    label="Use Name"
                    variant="outlined"
                    value={username}
                  />
                  <TextField
                    onChange={handleChangePassword}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                  />
                </div>
                <div className={classes.btnRight}>
                  <Button
                    onClick={() => {
                      handleClickButtun();
                    }}
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    login
                  </Button>
                </div>
              </form>
            </Item>
          </Row>
        </WrapForm>
      </Container>
    </Wrap>
  );
};

export default Signin;
