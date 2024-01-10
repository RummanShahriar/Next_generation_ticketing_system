class User {
  userId: number;
  email: string;
  address: string;
  password?: string;

  constructor(
    userId: number,
    email: string,
    address: string,
    password?: string
  ) {
    this.userId = userId;
    this.email = email;
    this.address = address;
    this.password = password;
  }
}
export default User;
