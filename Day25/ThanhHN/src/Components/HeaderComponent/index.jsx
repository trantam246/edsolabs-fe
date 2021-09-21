import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { FaPlayCircle, FaTags } from 'react-icons/fa';
import { IoStopCircleSharp } from 'react-icons/io5';
import { HEADER_TIMER } from '../../constants';
import { ClockTimer } from '../../Containers/ClockTimer';
import { ListTaskComponent } from '../ListTaskComponent';
import styles from './HeaderComponent.module.scss';

export const HeaderComponent = ({
  showTaskAction = false,
  taskAction = [],
  appPlay = false,
  valueDescription = '',
  onShowTask = () => {},
  type = HEADER_TIMER,
  onPlayApp = () => {},
  onChangeInput = () => {},
  onStop = () => {},
  onAddTag,
  onHandleTimeSpend,
}) => {
  return (
    <div className={`${styles.wrapper} ${styles[type]}`}>
      {type === HEADER_TIMER ? (
        <TextField
          name="username"
          variant="outlined"
          type="text"
          fullWidth
          value={valueDescription}
          onChange={onChangeInput}
        />
      ) : (
        <TextField
          name="username"
          variant="outlined"
          type="text"
          fullWidth
          defaultValue="Productivity Report"
        />
      )}

      <div className={styles.headerDetail}>
        <div className={styles.iconTag}>
          <FaTags onClick={onShowTask} />
          {showTaskAction && (
            <ListTaskComponent onAddTag={onAddTag} tasks={taskAction} />
          )}
        </div>

        <div className={styles.time}>
          {appPlay ? (
            <ClockTimer onHandleTimeSpend={onHandleTimeSpend} />
          ) : (
            '00:00:00'
          )}
        </div>

        <div className={styles.audioIcon}>
          {appPlay === false ? (
            <FaPlayCircle onClick={onPlayApp} />
          ) : (
            <div className={styles.stop} onClick={onStop}>
              <IoStopCircleSharp />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
