import './App.css';
import React, { useState } from 'react'
import HeaderTask from './Components/Header/HeaderTask';
import TableTask from './Components/Main/TableTask';


export default function App() {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
  // console.log(users)
  const handleSubmit = (newUser) => {
    const updateUsers = [...users, newUser];
    setUsers(updateUsers);
    localStorage.setItem('users', JSON.stringify(updateUsers));
  }
  const handleDelete = (id) => {
    // console.log(id)
    const updateUsers = users.filter((user) => {
      return user.id !== id;
    });
    setUsers(updateUsers);
    localStorage.setItem('users', JSON.stringify(updateUsers));
  }
  const handleUpdate = (updatedUser) => {
    const updatedUsers = users.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      }
      return user;
    })
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
  return (
    <div className="container-main">
      <HeaderTask handleSubmit={handleSubmit} ></HeaderTask>
      <TableTask users={users} handleDelete={handleDelete} handleUpdate={handleUpdate}></TableTask>
    </div>
  )
}

