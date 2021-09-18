import React from 'react';
import styles from './DateRangeComponent.module.scss';

export const DateRangeComponent = ({
  onDateRangeClick = () => {},
  dateRangeStatus = false,
  onChooseAboutDay = () => {},
}) => {
  return (
    <div className={styles.wrapper} onClick={onDateRangeClick}>
      <span>Date range</span>
      {dateRangeStatus && (
        <div className={styles.dateRange}>
          <div className={styles.startDate}>
            start date{' '}
            <input type="date" name="startDate" onChange={onChooseAboutDay} />
          </div>

          <div className={styles.endDate}>
            end date{' '}
            <input type="date" name="endDate" onChange={onChooseAboutDay} />
          </div>
        </div>
      )}
    </div>
  );
};
