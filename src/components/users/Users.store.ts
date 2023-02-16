import { makeAutoObservable } from "mobx";

interface UserEntity {
  id: number;
  username: string;
  password: string;
  city: string;
  school: string;
  teamName: string;
  shortTeamName: string;
}

class UsersStore {
  users: UserEntity[] = [];

  constructor() {
    makeAutoObservable(this);

    this.loadUsers();
  }

  public async loadUsers() {
    // const response = await fetch("/api/users");
    // this.users = await response.json();
  }
}

export const userStore = new UsersStore();
