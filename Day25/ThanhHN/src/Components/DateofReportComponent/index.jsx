import React from 'react';
import styles from './DateOfReportComponent.module.scss';

export const DateOfReportComponent = ({ date, onChooseDate = () => {} }) => {
  const handleChooseDate = () => {
    onChooseDate(date);
  };
  return (
    <div className={styles.wrapper} onClick={handleChooseDate}>
      {date.name}
    </div>
  );
};
