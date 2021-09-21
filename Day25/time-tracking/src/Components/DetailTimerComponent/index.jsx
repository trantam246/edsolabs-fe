import { Button } from '@material-ui/core';
import React from 'react';
import { FILTER_DATE, GROUP_5_DAY } from '../../constants';
import { DayWorkingDetail } from '../DayWorkingDetail';
import styles from './DetailTimerComponent.module.scss';

export const DetailTimerComponent = ({
  dayGroupTask = [],
  moreTaskStatus = false,
  dateFilter = '',
  tagAction,
  onLoadMore = () => {},
  onFilter = () => {},
  onChooseYes,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dateFilter}>
        Date filter <input type="date" onChange={onFilter} />
      </div>

      <div className={styles.listDay}>
        {dateFilter.length > 0
          ? FILTER_DATE(dayGroupTask, dateFilter).map((item, index) => (
              <DayWorkingDetail
                dayGroupItem={item}
                key={index}
                tagAction={tagAction}
                onChooseYes={onChooseYes}
              />
            ))
          : (moreTaskStatus
              ? dayGroupTask
              : GROUP_5_DAY([...dayGroupTask])
            ).map((item, index) => (
              <DayWorkingDetail
                dayGroupItem={item}
                key={index}
                tagAction={tagAction}
                onChooseYes={onChooseYes}
              />
            ))}
      </div>

      <div className={styles.btn}>
        <Button type="button" variant="contained" onClick={onLoadMore}>
          {moreTaskStatus ? 'Hide Away' : 'Load more'}
        </Button>
      </div>
    </div>
  );
};
