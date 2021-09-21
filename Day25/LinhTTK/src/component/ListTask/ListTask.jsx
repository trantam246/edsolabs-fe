import { ListTaskDate, TitleListTaskDate } from './style';
import Task from '../Task/Task';

const ListTask = ({
  searchDate,
  processDayGroup,
  size,
  handleClickListsDelete,
  LsTask,
  LsTag,
}) => {
  const newDate = new Date();
  const dateToday =
    newDate.getFullYear() +
    '-0' +
    (newDate.getMonth() + 1) +
    '-' +
    newDate.getDate();

  const handleClickListsDeletes = (value) => {
    handleClickListsDelete(value);
  };

  const sortOuput = processDayGroup(LsTask).sort((a, b) => {
    a = new Date(a.date);
    b = new Date(b.date);
    return b - a;
  });

  // eslint-disable-next-line array-callback-return
  const listTask = sortOuput.map((item, index) => {
    if (size > index++) {
      return (
        <ListTaskDate key={index}>
          <TitleListTaskDate>
            {item.date.split(' ')[0] === dateToday
              ? `Today`
              : item.date.split(' ')[0]}
          </TitleListTaskDate>
          <Task
            dayTask={item.tasks}
            handleClickListsDelete={handleClickListsDeletes}
            LsTag={LsTag}
          />
        </ListTaskDate>
      );
    }
  });

  const GetListTask = () => {
    if (searchDate && searchDate !== 'NaN-0NaN-0NaN') {
      if (searchDate !== '') {
        // eslint-disable-next-line array-callback-return
        const list = sortOuput.map((item, index) => {
          const date = item.date.split(' ')[0];
          if (size > index++) {
            if (date === searchDate) {
              return (
                <ListTaskDate key={index}>
                  <TitleListTaskDate>
                    {item.date.split(' ')[0] === dateToday
                      ? `Today`
                      : item.date.split(' ')[0]}
                  </TitleListTaskDate>
                  <Task
                    dayTask={item.tasks}
                    handleClickListsDelete={handleClickListsDeletes}
                    LsTag={LsTag}
                  />
                </ListTaskDate>
              );
            }
          }
        });
        return list;
      } else {
        return listTask;
      }
    } else {
      return listTask;
    }
  };
  return <GetListTask />;
};

export default ListTask;
