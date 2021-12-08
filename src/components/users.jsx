import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [number] = useState(users.length);

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user !== userId));
  };

  const renderPharse = (number) => {
    number = users.length;
    return number >= 2 && number <= 4
      ? " человека тусанут с тобой сегодня"
      : number === 1
      ? " человек тусанёт с тобой сегодня"
      : " человек тусанут с тобой сегодня";
  };

  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((qual) => (
            <h2 key={qual._id} className={`badge bg-${qual.color} m-1 fs-6`}>
              {qual.name}
            </h2>
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} /5</td>
        <td>
          <button
            className="btn bg-danger text-light"
            onClick={(userId) => handleDelete(user)}
          >
            delete
          </button>
        </td>
      </tr>
    ));
  };

  if (users.length === 0)
    return <h1 className="badge bg-danger fs-4">никто не тусанёт с тобой</h1>;

  return (
    <>
      <h1 className="badge bg-primary fs-4">
        {users.length}
        {renderPharse(number)}
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
