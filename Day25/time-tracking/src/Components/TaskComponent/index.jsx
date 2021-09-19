import moment from 'moment';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaTags } from 'react-icons/fa';
import { MenuTask } from '../MenuTask';
import styles from './TaskComponent.module.scss';

export const TaskComponent = ({
  taskJob = {},
  tagAction = [],
  onChooseYes,
}) => {
  const [actionDelete, setActionDelete] = useState(false);

  const handleActionDelete = () => {
    setActionDelete(!actionDelete);
  };

  const startTime = moment(taskJob.start_time).format('h:mm');
  const endTime =
    taskJob.end_time.length > 0
      ? `- ${moment(taskJob.end_time).format('h:mm')}`
      : '';
  const actions = taskJob.tags.map((item) => tagAction[item - 1]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{taskJob.description}</div>

      <div className={styles.detail}>
        <div className={styles.action}>
          <FaTags />
          <span>
            {actions?.map((item, index) => {
              return <span key={index}>{item?.name} </span>;
            })}
          </span>
        </div>

        <div className={styles.date}>
          {startTime} {endTime}
        </div>

        <div className={styles.mins}>{taskJob.time_spent}</div>

        <div className={styles.listIcon}>
          <BsThreeDotsVertical onClick={handleActionDelete} />
          {actionDelete ? (
            <MenuTask
              taskJob={taskJob}
              onChooseYes={onChooseYes}
              onChooseNo={handleActionDelete}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
