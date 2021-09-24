import React, { useState, useEffect } from "react"
import userApi from "../api/userApi"
import studentApi from "../api/studentApi"
const Context = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
  user: [],
  students: [],
  onSearch: (name, gender, age) => {},
  name: "",
  gender: "",
  age: "",
  isSearch: false,
})

export const ContextProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const [students, setStudents] = useState()
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [isSearch, setIsSearch] = useState(false)

  const fetchUser = async () => {
    try {
      await userApi.getUser().then((user) => setUser(user))
    } catch (e) {
      throw e
    }
  }

  const fetchStudent = async () => {
    try {
      await studentApi.getStudents().then((student) => setStudents(student))
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    fetchStudent()
  }, [])

  useEffect(() => {
    const storedLogin = localStorage.getItem("user")
    if (storedLogin === "ok") {
      setIsLoggedIn(true)
    }
  }, [])
  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
  }

  const handleLogin = () => {
    localStorage.setItem("user", "ok")
    setIsLoggedIn(true)
  }

  const handleSearch = (name, gender, age) => {
    setName(name)
    setGender(gender)
    setAge(age)
    setIsSearch(true)
  }
  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        onLogout: handleLogout,
        onLogin: handleLogin,
        onSearch: handleSearch,
        user,
        students,
        name,
        gender,
        age,
        isSearch,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default Context
