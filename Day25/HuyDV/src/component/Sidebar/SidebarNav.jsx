import React, { useEffect, useState } from 'react'
import { Sidebar, SidebarHeader, LinkSidebar, LinkHeader } from './style';


// import icon
import { WiTime9 } from 'react-icons/wi';
import { FaRegChartBar } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';

import { Avatar } from '@material-ui/core';
import { getData } from '../../API/axiosClient';
// import { Link } from 'react-router-dom';

const SidebarNav = ({ setTimeWord1, clearUser }) => {
    const [openNav, setOpenNav] = useState(true);
    const [users, setUsers] = useState([])

    useEffect(() => {
        getData('users')
            .then(res => {
                const persons = res.data;
                setUsers(persons);
            }).catch(error => console.log(error));
    }, [])

    const handleClick = () => {
        setOpenNav(!openNav);
    }

    // return <SidebarHeader key={index} open={openNav} className="sidebar__header">
    //             <LinkHeader LinkHeader onClick={handleClick} > <Avatar alt="Remy Sharp" src={item.avatar} /></LinkHeader >
    //             <span>{item.fullname}</span>
    //         </SidebarHeader >
    const imgUser = users.map((item, index) => {
        return <SidebarHeader key={index} open={openNav} className="sidebar__header">
            <LinkHeader LinkHeader onClick={handleClick} > <Avatar alt="Remy Sharp" src={item.avatar} /></LinkHeader >
            <span>{item.fullname}</span>
        </SidebarHeader >
    })
    return (
        <Sidebar open={openNav}>
            {
                [imgUser]
            }
            <ul>
                <li>
                    <LinkSidebar onClick={() => setTimeWord1('timework')} open={openNav} >
                        <WiTime9 />
                        <span>Timer</span>
                    </LinkSidebar>
                </li>
                <li>
                    <LinkSidebar onClick={() => setTimeWord1('report')} open={openNav} >
                        <FaRegChartBar />
                        <span>Report</span>
                    </LinkSidebar>
                </li>
                <li>
                    <LinkSidebar onClick={() => clearUser()} open={openNav}>
                        <HiOutlineLogout />
                        <span>Logout</span>
                    </LinkSidebar>
                </li>
            </ul>
        </Sidebar>
    )
}

export default SidebarNav
