import React, { useState, useEffect } from 'react'
import '../../style/login.scss'
import { TextField, Button, Divider, Box } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import CheckBox from '@material-ui/core/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import PersonAdd from '@material-ui/icons/PersonAdd'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import SendIcon from '@material-ui/icons/Send'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Container } from '@material-ui/core'

function Login (props) {
  const [error, setError] = useState(null)
  const [data, setData] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_USERS}`)
      .then(res => res.data)
      .then(e => {
        setData(e)
        // console.log(e)
      })
  }, [])

  function handleClickOnButton () {
    setError(null)
    if (username.trim() === '' || password.trim() === '') {
      setError(
        Swal.fire(
          'Oopps...!',
          'You must entered your username or password!',
          'info'
        )
      )
    } else if (username !== data[0].username || password !== data[0].password) {
      setError(
        Swal.fire(
          'Failed...!',
          'You entered wrong your username or password!',
          'error'
        )
      )
    } else {
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
      props.history.push('/timer')
    }
  }

  return (
    <div>
      <Container maxWidth='xs'>
        <div className='login'>
          <div className='icon'>
            <div className='icon-class'>
              <PersonAdd fontSize='large' />
            </div>
            <div className='text'>Login</div>
          </div>

          <div className='row m-2'>
            <Box className='text-user'>Username</Box>
            <Box className='form-input'>
              <PersonPinIcon className='iconic'></PersonPinIcon>

              <TextField
                className='p-2 user-info'
                id='user'
                type='text'
                value={username}
                placeholder='Username'
                variant='outlined'
                onChange={e => setUsername(e.target.value)}
                fullWidth
              />
            </Box>
            <Box className='text-user'>Password</Box>
            <Box className='form-input'>
              <LockOpenIcon className='iconic'></LockOpenIcon>
              <TextField
                className='p-2 user-info'
                id='password'
                type='password'
                value={password}
                placeholder='Password'
                variant='outlined'
                onChange={e => setPassword(e.target.value)}
                fullWidth
              />
            </Box>
            <FormControlLabel
              control={
                <CheckBox
                  icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                  checkedIcon={<CheckBoxIcon fontSize='small' />}
                  name='checkedI'
                />
              }
              label='Remember me'
            />
            <Button
              variant='contained'
              color='primary'
              endIcon={<SendIcon />}
              // disabled={loading}
              onClick={handleClickOnButton}
              fullWidth
            >
              Login
            </Button>
          </div>
          {/* { <div>{error}</div>} */}
          <Divider variant='middle' />
          {/* <p className="text-center">

         </p> */}
        </div>
      </Container>
    </div>
  )
}

export default Login
