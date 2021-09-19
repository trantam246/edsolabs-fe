import React, { useState } from 'react';
import styles from './MenuTask.module.scss';
import { ConfirmComponent } from '../ConfirmComponent';

export const MenuTask = ({ onChooseYes, taskJob, onChooseNo }) => {
  const [confirmStatus, setConfirmStatus] = useState(false);
  const handleDelete = () => {
    setConfirmStatus(!confirmStatus);
  };

  return (
    <div className={styles.wrapper}>
      <span onClick={handleDelete}>delete</span>
      {confirmStatus ? (
        <ConfirmComponent
          onChooseYes={onChooseYes}
          onChooseNo={onChooseNo}
          taskJob={taskJob}
        />
      ) : (
        ''
      )}
    </div>
  );
};
