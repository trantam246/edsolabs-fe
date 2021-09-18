import React from 'react';
import { DateOfReportComponent } from '../DateofReportComponent';
import { DateRangeComponent } from '../DateRangeComponent';
import { TaskToChooseComponent } from '../TaskToChooseComponent';
import styles from './ListTaskComponent.module.scss';

export const ListTaskComponent = ({
  tasks = [],
  onAddTag,
  type = '',
  dateRangeStatus,
  onChooseDate,
  onDateRangeClick,
  onChooseAboutDay,
}) => {
  return (
    <div className={styles.wrapper}>
      {type === 'report' ? (
        <>
          {tasks.map((item) => {
            return (
              <DateOfReportComponent
                key={item.id}
                date={item}
                onChooseDate={onChooseDate}
              />
            );
          })}
          <DateRangeComponent
            onDateRangeClick={onDateRangeClick}
            dateRangeStatus={dateRangeStatus}
            onChooseAboutDay={onChooseAboutDay}
          />
        </>
      ) : (
        tasks.map((item) => {
          return (
            <TaskToChooseComponent
              onAddTag={onAddTag}
              key={item.id}
              id={item.id}
              title={item.name}
            />
          );
        })
      )}
    </div>
  );
};
