import React from 'react';
import DateFilter from './DateFilter';
import TasksList from './TasksList';
import Main from '../UI/Main'


export default function MainTimer(props) {
    const handleFilterDays = (days) => {
        props.onFilterDays(days)
    }
    return (
        <Main>
            <DateFilter tasks={props.tasks} onFilterDays={handleFilterDays} />
            <TasksList tasks={props.tasks}  />
        </Main>
    );
}
