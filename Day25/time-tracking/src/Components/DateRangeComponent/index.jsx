import React from 'react';
import styles from './DateRangeComponent.module.scss';

export const DateRangeComponent = ({
  onDateRangeClick = () => {},
  dateRangeStatus = false,
  onChooseAboutDay = () => {},
  onExit = () => {},
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container} onClick={onDateRangeClick}>
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
      {dateRangeStatus && (
        <div className={styles.exit} onClick={onExit}>
          exit
        </div>
      )}
    </div>
  );
};
