import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  boxLogin: {
    width: 450,
    height: 450,
    margin: '170px auto',
    padding: 20,
    border: '1px solid #C4C4C4',
    borderRadius: 40,
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 5px ',
  },
  formInput: {
    width: '100%',
    '& .MuiInputBase-root': {
      borderRadius: 40,
      '&:hover': {
        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 10px ',
      },
      '&:focus': {
        border: 'none',
      },
    },
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    marginBottom: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: 600,
    margin: '10px 0 12px 0',
  },
  btn: {
    float: 'right',
    fontFamily: 'Glory',
    fontSize: 20,
    fontWeight: 600,
    width: 130,
    height: 50,
    margin: '45px',
    cursor: 'pointer',
    borderRadius: 40,
    transition: 'linear .3s',
    '&:hover': {
      backgroundColor: 'black',
      color: '#fff',
      transition: 'linear .3s',
      boxShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 30px ',
    },
  },
}));
export default function LoginPage() {
  const classes = useStyles();
  let history = useHistory();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;

  // get value in inputFORM
  const getValueForm = (valueInput) => {
    let name = valueInput.target.name;
    let value = valueInput.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  // handle FORMsubMit
  const handleFormSubMit = (event) => {
    const _URL = process.env.REACT_APP_URL;
    event.preventDefault();
    if (username === '' || password === '') {
      setSubmitted(true);
    } else {
      fetch(`${_URL}users`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw Error(res.status);
        })
        .then((result) => {
          result.map((item) => {
            if (username === item.username && password === item.password) {
              localStorage.setItem('accessToken', item.avatar);
              localStorage.setItem('fullname', item.fullname);
              history.push('/timer');
              return alert('đăng nhập thành công');
            } else {
              alert('sai rồi');
            }
          });
        })
        .catch((error) => {
          console.log(error);
          alert('sai');
        });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.boxLogin}>
        <h1 align="center" className={classes.title}>
          Login
        </h1>
        <form className={classes.form} onSubmit={handleFormSubMit}>
          <div>
            <div className={classes.label}>Username: </div>
            <TextField
              name="username"
              className={classes.formInput}
              type="text"
              variant="outlined"
              defaultValue={inputs.username}
              onChange={getValueForm}
            />
            {submitted && !username && (
              <div className="invalid-feedback">Username is required</div>
            )}
          </div>
          <div>
            <div className={classes.label}>Password: </div>
            <TextField
              name="password"
              className={classes.formInput}
              type="password"
              variant="outlined"
              defaultValue={inputs.password}
              onChange={getValueForm}
            />
            {submitted && !password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>
          <div>
            <button className={classes.btn} onClick={handleFormSubMit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
