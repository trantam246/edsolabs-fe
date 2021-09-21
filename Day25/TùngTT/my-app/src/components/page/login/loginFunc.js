import React, {  useState, useEffect } from "react";

export const LoginFunction = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(data => data.json())
      .then(result => {
        setUser(result)
        console.log(result)
      })
  },[])
  return (
    user
  )
}
