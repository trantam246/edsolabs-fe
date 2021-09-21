import React, { useEffect, useState } from 'react';
import { Container, Item, Row, WrapForm, UseStyles, boder } from './style';

import TextField from '@material-ui/core/TextField';
import { Button, Card } from '@material-ui/core';
import { useHistory } from 'react-router';
import { getData } from '../../api/axiosClient';

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
      ? history.replace('/timer')
      : history.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        alert('Success');
        localStorage.setItem('user', 'linh');
        history.push('/timer');
      } else {
        alert('Fail');
      }
    });
  };

  const classes = UseStyles();

  return (
    <Card style={boder}>
      <Container>
        <WrapForm>
          <Row>
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
    </Card>
  );
};

export default Signin;
