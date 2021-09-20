import React, { useState, useEffect } from "react"
import HeaderTimer from "./HeaderTimer"
import MainTimer from "./MainTimer"
import taskApi from "../../api/taskApi"
import tagApi from "../../api/tagApi"

const TimerPage = (props) => {
  const [task, setTask] = useState([])
  const [tag, setTag] = useState([])

  const fetchTag = () => {
    try {
      tagApi.getTag().then((res) => setTag(res))
    } catch (error) {
      throw error
    }
  }

  const fetchTask = () => {
    try {
      taskApi.getTask().then((res) => {
        setTask(res)
      })
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchTask()
    fetchTag()
  }, [])

  const formatTask = task?.map((o) => ({
    ...o,
    tags_desc: tag
      ?.filter((t) => o.tags?.includes(t.id))
      .map((n) => n.name)
      .join(", "),
  }))

  const newTask = {
    id: "",
    description: "",
    start_time: null,
    end_time: null,
    time_spent: null,
    tags: [],
    status: 0,
  }

  const handleLoadTask = (newTask) => {
    setTask([...task, newTask])
    fetchTask()
  }
  const handleFilterDays = (days) => {
    setTimeout(() => {
      setTask(task)
    }, 3000)
    setTask(days)
  }

  return (
    <>
      <HeaderTimer
        tags={tag}
        newTask={newTask}
        tasks={task}
        onLoadTask={handleLoadTask}
      />
      <MainTimer tasks={formatTask} tag={tag} onFilterDays={handleFilterDays} />
    </>
  )
}

export default TimerPage
