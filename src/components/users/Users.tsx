import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { userStore } from "./Users.store";
import { Table } from "react-bootstrap";

export const Users = () => {
  useEffect(() => {
    userStore.loadUsers();
  }, []);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя пользователя</th>
            <th>Школа</th>
            <th>Команда</th>
          </tr>
        </thead>
        <tbody>
          {userStore.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.school}</td>
              <td>
                {user.teamName} ({user.shortTeamName})
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default observer(Users);
