import React from 'react';
import styles from './ConfirmComponent.module.scss';

export const ConfirmComponent = ({
  onChooseNo = () => {},
  onChooseYes = () => {},
  taskJob = {},
}) => {
  const handleChooseYes = () => {
    onChooseYes(taskJob.id);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Confirmation</div>
      <div className={styles.title}>Are you sure delete this item ?</div>
      <div className={styles.btns}>
        <span onClick={onChooseNo}>No</span>
        <span onClick={handleChooseYes}>Yes</span>
      </div>
    </div>
  );
};
