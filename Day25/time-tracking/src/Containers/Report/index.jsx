import moment from 'moment';
import React, { useEffect, useState } from 'react';
import dataApi from '../../api/dataApi';
import { ReportComponent } from '../../Components/ReportComponent';
import {
  GET_CURRENT_WEEK,
  GET_LAST_WEEK,
  GET_THIS_MONTH,
  GET_LAST_MONTH,
  PROCESS_DAY_GROUP,
  REPORT_SLICE_DAY,
  GET_DATE_RANGE,
} from '../../constants';

export const Report = () => {
  const [DateStatus, showDateStatus] = useState(false);
  const [dates, setDates] = useState({ id: 1, name: 'Today' });
  const [groupDay, setGroupDay] = useState([]);
  const [dateRangeStatus, setDateRangeStatus] = useState(false);
  const [aboutDays, setAboutDays] = useState({ startDate: '', endDate: '' });

  const days = [
    { id: 1, name: 'Today' },
    { id: 2, name: 'Yesterday' },
    { id: 3, name: 'This week' },
    { id: 4, name: 'Last week' },
    { id: 5, name: 'This month' },
    { id: 6, name: 'Last month' },
  ];

  const handleStatus = () => {
    showDateStatus(!DateStatus);
  };

  const handleDateRangeClick = () => {
    setDateRangeStatus(true);
  };

  const handleExitDateRange = () => {
    setDateRangeStatus(false);
  };

  const handleChooseAboutDay = (e) => {
    setAboutDays({ ...aboutDays, [e.target.name]: e.target.value });
    if (e.target.name === 'endDate') {
      setDateRangeStatus(false);
    }
  };

  useEffect(() => {
    const rangeDate = GET_DATE_RANGE(
      aboutDays.startDate,
      aboutDays.endDate,
      'days',
    );

    dataApi.getTasks().then((res) => {
      const dayList = PROCESS_DAY_GROUP(res.data).sort((a, b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return b - a;
      });
      const arrDateRange = dayList.filter((item) => {
        return rangeDate.includes(moment(item.date).format('YYYY-MM-DD'));
      });

      setGroupDay(arrDateRange);
      setDates({
        id: 7,
        name: `From ${aboutDays.startDate} to ${aboutDays.endDate}`,
      });
    });
  }, [aboutDays.startDate, aboutDays.endDate]);

  useEffect(() => {
    dataApi.getTasks().then((res) => {
      const dayList = PROCESS_DAY_GROUP(res.data).sort((a, b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return b - a;
      });
      const arrThisWeek = dayList.filter((item) => {
        return GET_CURRENT_WEEK().includes(
          moment(item.date).format('YYYY-MM-DD'),
        );
      });
      setGroupDay(arrThisWeek);
      setDates({
        id: 3,
        name: 'This week',
      });
    });
  }, []);

  const handleChooseDate = (date) => {
    setDates(date);
    dataApi.getTasks().then((res) => {
      const dayList = PROCESS_DAY_GROUP(res.data).sort((a, b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return b - a;
      });

      if (
        date.name === 'Today' &&
        dayList.slice(0, 1)[0].date.slice(0, 10) ===
          moment().format('YYYY-MM-DD')
      ) {
        setGroupDay(dayList.slice(0, 1));
      }

      if (
        date.name === 'Yesterday' &&
        dayList.slice(1, 2)[0].date.slice(0, 10) === REPORT_SLICE_DAY(1)
      ) {
        setGroupDay(dayList.slice(1, 2));
      }

      if (date.name === 'This week') {
        const arrThisWeek = dayList.filter((item) => {
          return GET_CURRENT_WEEK().includes(
            moment(item.date).format('YYYY-MM-DD'),
          );
        });
        setGroupDay(arrThisWeek);
      }

      if (date.name === 'Last week') {
        const arrLastWeek = dayList.filter((item) => {
          return GET_LAST_WEEK().includes(
            moment(item.date).format('YYYY-MM-DD'),
          );
        });
        setGroupDay(arrLastWeek);
      }

      if (date.name === 'This month') {
        const arrThisMonth = dayList.filter((item) => {
          return GET_THIS_MONTH().includes(
            moment(item.date).format('YYYY-MM-DD'),
          );
        });
        setGroupDay(arrThisMonth);
      }

      if (date.name === 'Last month') {
        const arrLastMonth = dayList.filter((item) => {
          return GET_LAST_MONTH().includes(
            moment(item.date).format('YYYY-MM-DD'),
          );
        });
        setGroupDay(arrLastMonth);
      }
    });
  };

  const objectValue = { online: 0, meeting: 0, training: 0, coding: 0 };
  groupDay.forEach((item) => {
    item?.tasks.forEach((item) => {
      const timeArr = item.time_spent.split(' ');
      const minutes = Number(timeArr[0] / item.tags.length);
      item.tags.forEach((item) => {
        if (item === 1) {
          objectValue.online += minutes;
        }
        if (item === 2) {
          objectValue.meeting += minutes;
        }

        if (item === 3) {
          objectValue.training += minutes;
        }

        if (item === 4) {
          objectValue.coding += minutes;
        }
      });
    });
  });

  const sumMinutes =
    objectValue.online +
    objectValue.meeting +
    objectValue.training +
    objectValue.coding;

  const objectPercent = {
    online: (objectValue.online / sumMinutes) * 100,
    meeting: (objectValue.meeting / sumMinutes) * 100,
    training: (objectValue.training / sumMinutes) * 100,
    coding: (objectValue.coding / sumMinutes) * 100,
  };

  return (
    <ReportComponent
      objectValue={objectValue}
      DateStatus={DateStatus}
      onShowDate={handleStatus}
      days={days}
      dayChoose={dates}
      onChooseDate={handleChooseDate}
      objectPercent={objectPercent}
      sumMinutes={sumMinutes}
      onDateRangeClick={handleDateRangeClick}
      dateRangeStatus={dateRangeStatus}
      onChooseAboutDay={handleChooseAboutDay}
      onExit={handleExitDateRange}
    />
  );
};
