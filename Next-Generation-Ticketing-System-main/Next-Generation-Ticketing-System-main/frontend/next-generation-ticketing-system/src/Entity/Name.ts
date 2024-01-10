import User from "./User";

class Name {
  nameId: number;
  firstName: string;
  lastName: string;
  user: User;

  constructor(nameId: number, firstName: string, lastName: string, user: User) {
    this.nameId = nameId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.user = user;
  }
}

export default Name;
