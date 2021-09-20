import React, { useEffect, useState } from 'react';
// styled
import { Wrap } from './style';
//component
import Sidebar from '../../component/Sidebar/SidebarNav';
import TimerWork from '../../component/TimerWork/TimerWork';
import Report from '../../component/Chart/Report';
import { useHistory } from 'react-router';
import { getData } from '../../API/axiosClient';

const Home = () => {
  const [swCompo, setswCompo] = useState('timework');
  const [listTask, setListTask] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [resetRender, setResetRender] = useState(true);
  const [size, setSize] = useState(5);

  const handleLoadMore = (value) => {
    setSize(value);
    setResetRender(!resetRender);
  };

  const change = (item) => {
    setswCompo(item);
  };

  const clearUser = () => {
    localStorage.removeItem('user');
    history.push('/');
  };
  // lấy dữ liệu
  useEffect(() => {
    getData('tags')
      .then((res) => {
        const tags = res.data;
        setListTag(tags);
      })
      .catch((error) => console.log(error));

    getData(`tasks`)
      .then((res) => {
        const tasks = res.data;
        setListTask(tasks);
      })
      .catch((error) => console.log(error));
  }, [resetRender]);

  const handleClickList = (value) => {
    if (value.length > 0) {
      setResetRender(!resetRender);
    }
  };

  const handleClickListsDeletes = (value) => {
    if (value.length > 0) {
      setResetRender(!resetRender);
    }
  };

  const SwitchComponent = (LsTask, LsTag) => {
    switch (swCompo) {
      case 'timework':
        return (
          <TimerWork
            size={size}
            handleLoadMore={handleLoadMore}
            handleClickListsDelete={handleClickListsDeletes}
            handleClickList={handleClickList}
            LsTask={LsTask}
            LsTag={LsTag}
          />
        );
      case 'report':
        return <Report LsTask={LsTask} LsTag={LsTag} />;
      default:
        return <TimerWork />;
    }
  };

  let history = useHistory();
  useEffect(() => {
    localStorage.getItem('user')
      ? history.replace('/home')
      : history.replace('/');
  }, [localStorage.getItem('user')]);

  return (
    <Wrap>
      <Sidebar setTimeWord1={change} clearUser={clearUser} />
      {SwitchComponent(listTask, listTag)}
    </Wrap>
  );
};

export default Home;
