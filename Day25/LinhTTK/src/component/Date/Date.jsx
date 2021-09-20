import React, { useState } from 'react';
import { Wrap, Content, WrapButton } from './style';
import { Button } from '@material-ui/core';
import ListTask from '../ListTask/ListTask';
import RunTask from '../RunTask/RunTask';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const TimerWork = ({
  handleLoadMore,
  size,
  handleClickListsDelete,
  handleClickList,
  LsTask,
  LsTag,
}) => {
  const [play, setPlay] = useState(false);
  const [isOn, setIsOn] = useState(true);
  const [searchDate, setSearchDate] = useState(null);

  const processDayGroup = (input) => {
    const output = [];
    input.forEach((item) => {
      const index = output.findIndex((_item) => {
        return (
          new Date(_item.date).toDateString() ===
          new Date(item.start_time).toDateString()
        );
      });
      if (index === -1) {
        const newItem = {
          date: item.start_time,
          tasks: [],
        };
        output.push(newItem);
        output[output.length - 1].tasks.push(item);
      } else {
        output[index].tasks.push(item);
      }
    });
    return output;
  };
  const handleClickPlay = () => {
    setPlay(!play);
  };

  const handleClickLists = (value) => {
    handleClickList(value);
  };

  const handleClickListsDeletes = (value) => {
    handleClickListsDelete(value);
  };
  const handleLoadMores = () => {
    handleLoadMore(size + 2);
    if (size + 2 >= processDayGroup(LsTask).length) {
      setIsOn(false);
    }
  };

  const [selectedDate, handleDateChange] = useState(null);
  const handleClickDate = (value) => {
    if (value) {
      const dataValue = `${value.getFullYear()}-${
        Number(value.getMonth() + 1) >= 10
          ? value.getMonth() + 1
          : '0' + (value.getMonth() + 1)
      }-${
        Number(value.getDate()) >= 10 ? value.getDate() : '0' + value.getDate()
      }`;
      handleDateChange(value);
      setSearchDate(dataValue);
    } else {
      setSearchDate('');
      handleDateChange(value);
    }
  };

  return (
    <Wrap>
      <RunTask
        handleClickList={handleClickLists}
        LsTask={LsTask}
        handleClickPlay={handleClickPlay}
        play={play}
        LsTag={LsTag}
      />
      <Content>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              inputVariant="outlined"
              format="MM/dd/yyyy"
              value={selectedDate}
              maxDate={new Date()}
              placeholder="20/09/2021"
              onChange={handleClickDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>

        <ListTask
          searchDate={searchDate}
          processDayGroup={processDayGroup}
          size={size}
          handleClickListsDelete={handleClickListsDeletes}
          LsTask={LsTask}
          LsTag={LsTag}
        />

        <WrapButton>
          {isOn ? (
            <Button
              variant="contained"
              onClick={() => {
                handleLoadMores();
              }}
              disableElevation
            >
              Load more
            </Button>
          ) : null}
        </WrapButton>
      </Content>
    </Wrap>
  );
};

export default TimerWork;
