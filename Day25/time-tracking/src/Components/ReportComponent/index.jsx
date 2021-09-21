import { Grid } from '@material-ui/core';
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { HEADER_REPORT } from '../../constants';
import { HeaderComponent } from '../HeaderComponent';
import { ListTaskComponent } from '../ListTaskComponent';
import styles from './ReportComponent.module.scss';

export const ReportComponent = ({
  DateStatus = false,
  dayChoose = {},
  objectPercent = 0,
  days = [],
  sumMinutes = 0,
  dateRangeStatus,
  onShowDate = () => {},
  onChooseDate = () => {},
  onDateRangeClick,
  onChooseAboutDay,
  onExit,
}) => {
  return (
    <Grid item xs={10}>
      <div className={styles.wrapper}>
        <HeaderComponent type={HEADER_REPORT} />
        <div className={styles.header}>
          <div className={styles.name}>
            {dayChoose.name}: {sumMinutes} minutes
          </div>
          <div className={styles.timeCheck}>
            <span onClick={onShowDate}>{dayChoose.name}</span>{' '}
            <RiArrowDropDownFill onClick={onShowDate} />
            {DateStatus && (
              <ListTaskComponent
                type="report"
                tasks={days}
                onChooseDate={onChooseDate}
                onDateRangeClick={onDateRangeClick}
                dateRangeStatus={dateRangeStatus}
                onChooseAboutDay={onChooseAboutDay}
                onExit={onExit}
              />
            )}
          </div>
        </div>

        <Grid container className={styles.contentReport}>
          <Grid item lg={4}>
            <Pie
              width={100}
              height={100}
              data={{
                labels: ['online', 'meeting', 'training', 'coding'],
                datasets: [
                  {
                    label: 'My First Dataset',
                    data: [
                      objectPercent.online,
                      objectPercent.meeting,
                      objectPercent.training,
                      objectPercent.coding,
                    ],
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)',
                      '#198754',
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
            ></Pie>
          </Grid>

          <Grid item lg={8}>
            <Bar
              width={100}
              height={60}
              data={{
                labels: ['online', 'meeting', 'training', 'coding'],
                datasets: [
                  {
                    axis: 'y',
                    label: 'My First Dataset',
                    data: [
                      objectPercent.online,
                      objectPercent.meeting,
                      objectPercent.training,
                      objectPercent.coding,
                    ],
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)',
                      '#198754',
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                indexAxis: 'y',
              }}
            ></Bar>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
