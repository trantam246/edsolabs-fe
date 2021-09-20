import React from 'react';
import DateFilter from './DateFilter';
import TasksList from './TasksList';
import Main from '../UI/Main'


export default function MainTimer(props) {
    const handleFilterDays = (days) => {
        props.onFilterDays(days)
    }

    const handleDeleteTask = (newTasks) => {
        props.onDeleted(newTasks)
    }

    const handleStart = (newTasks) => {
        props.onStart(newTasks)
    }

    return (
        <Main>
            <DateFilter
                tasks={props.tasks}
                onFilterDays={handleFilterDays} />
            <TasksList
                tasks={props.tasks}
                onDeleted={handleDeleteTask}
                onStart={handleStart}
            />
        </Main>
    );
}
