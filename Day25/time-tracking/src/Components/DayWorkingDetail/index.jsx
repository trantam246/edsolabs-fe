import moment from 'moment';
import React from 'react';
import { TaskComponent } from '../TaskComponent';
import styles from './DayWorkingDetail.module.scss';

export const DayWorkingDetail = ({
  dayGroupItem = {},
  tagAction,
  onChooseYes,
}) => {
  let date = moment(dayGroupItem.date)
    .format('DD MM YYYY')
    .split(' ')
    .join('/');

  if (date === moment().format('DD MM YYYY').split(' ').join('/')) {
    date = 'Today';
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{date}</div>

      <div className={styles.listTask}>
        {dayGroupItem?.tasks?.map((item, index) => {
          return (
            <TaskComponent
              onChooseYes={onChooseYes}
              taskJob={item}
              key={index}
              tagAction={tagAction}
            />
          );
        })}
      </div>
    </div>
  );
};
