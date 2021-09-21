import React, { useState } from 'react';
import styles from './NavBarComponent.module.scss';
import { WiTime9 } from 'react-icons/wi';
import { FaRegChartBar } from 'react-icons/fa';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NavBarComponent = ({ onLogout = () => {} }) => {
  const avatar = localStorage.getItem('token');
  return (
    <Grid item xs={2}>
      <div className={styles.wrapper}>
        <div className={styles.userWrapper}>
          <img src={`${avatar}`} alt="avatar" />
          <p>{process.env.REACT_APP_MY_NAME}</p>
        </div>

        <div className={styles.listItem}>
          <div className={styles.itemNav}>
            <div className={styles.iconTime}>
              <WiTime9 />
            </div>

            <Link to="/timer">
              <p>Timer</p>
            </Link>
          </div>

          <div className={styles.itemNav}>
            <div className={styles.iconChart}>
              <FaRegChartBar />
            </div>
            <Link to="/Report">
              <p>Report</p>
            </Link>
          </div>

          <div className={styles.itemNav}>
            <div className={styles.iconLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </div>

            <p onClick={onLogout}>Logout</p>
          </div>
        </div>
      </div>
    </Grid>
  );
};
