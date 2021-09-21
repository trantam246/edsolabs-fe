import React, { useEffect, useState } from 'react';
import { Sidebar, SidebarHeader, LinkSidebar, LinkHeader } from './style';
import { WiTime9 } from 'react-icons/wi';
import { FaRegChartBar } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';

import { Avatar } from '@material-ui/core';
import { getData } from '../../api/axiosClient';

const NavBar = {
  margin: '20px',
};
const SidebarNav = ({ setTimeWord1, clearUser }) => {
  const [openNav, setOpenNav] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData('users')
      .then((res) => {
        const persons = res.data;
        setUsers(persons);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = () => {
    setOpenNav(!openNav);
  };

  const imgUser = users.map((item, index) => {
    return (
      <SidebarHeader key={index} open={openNav} className="sidebar__header">
        <LinkHeader LinkHeader onClick={handleClick}>
          {' '}
          <Avatar alt="Remy Sharp" src={item.avatar} />
        </LinkHeader>
        <span>{item.fullname}</span>
      </SidebarHeader>
    );
  });

  return (
    <Sidebar open={openNav}>
      {[imgUser]}
      <div style={NavBar}>
        <div>
          <LinkSidebar onClick={() => setTimeWord1('timework')} open={openNav}>
            <WiTime9 />
            <span>Timer</span>
          </LinkSidebar>
        </div>
        <div>
          <LinkSidebar onClick={() => setTimeWord1('report')} open={openNav}>
            <FaRegChartBar />
            <span>Report</span>
          </LinkSidebar>
        </div>
        <div>
          <LinkSidebar onClick={() => clearUser()} open={openNav}>
            <HiOutlineLogout />
            <span>Logout</span>
          </LinkSidebar>
        </div>
      </div>
    </Sidebar>
  );
};

export default SidebarNav;
