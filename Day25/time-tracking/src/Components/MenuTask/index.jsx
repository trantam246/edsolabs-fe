import React, { useState } from 'react';
import styles from './MenuTask.module.scss';
import { ConfirmComponent } from '../ConfirmComponent';

export const MenuTask = ({ onChooseYes, taskJob }) => {
  const [confirmStatus, setConfirmStatus] = useState(false);
  const handleDelete = () => {
    setConfirmStatus(!confirmStatus);
  };

  const handleOnchooseNo = () => {
    setConfirmStatus(false);
  };
  return (
    <div className={styles.wrapper}>
      <span onClick={handleDelete}>delete</span>
      {confirmStatus ? (
        <ConfirmComponent
          onChooseYes={onChooseYes}
          onChooseNo={handleOnchooseNo}
          taskJob={taskJob}
        />
      ) : (
        ''
      )}
    </div>
  );
};
