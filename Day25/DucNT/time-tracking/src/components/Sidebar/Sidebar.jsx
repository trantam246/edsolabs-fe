import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../style/aside.scss'
import Swal from 'sweetalert2'
import axios from 'axios'
function Sidebar () {
  const [data, setData] = useState(() => {
    axios
      .get(`${process.env.REACT_APP_USERS}`)
      .then(res => res.data)
      .then(e => {
        setData(e)
      })
  })
  const history = useHistory()
  function logOut () {
    Swal.fire({
      title: 'Do you want to exit??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.isConfirmed) {
        history.push('/')
        localStorage.clear()
      }
    })
  }
  return (
    <div className='aside'>
      <div className='header-aside'>
        {typeof data === 'object' ? (
          <>
            <div className='header-aside--avatar'>
              <img src={data[0].avatar} style={{ borderRadius: '50%' }} />
            </div>
            <div className='header-aside--fullname'>{data[0].fullname}</div>
          </>
        ) : (
          ''
        )}
      </div>

      <div className='content-aside'>
        <ul className='content-aside--timer'>
          <i className='far fa-clock'></i>
          <li>
            <Link to='/timer'>
              <h4>Timer</h4>
            </Link>
          </li>
        </ul>

        <ul className='content-aside--report'>
          <i className='fas fa-chart-bar'></i>
          <li>
            <Link to='/report'>
              <h4>Report</h4>
            </Link>
          </li>
        </ul>
        <ul className='content-aside--logout'>
          <i className='fas fa-sign-out-alt'></i>
          <li>
            <h4 onClick={logOut}>Logout</h4>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
