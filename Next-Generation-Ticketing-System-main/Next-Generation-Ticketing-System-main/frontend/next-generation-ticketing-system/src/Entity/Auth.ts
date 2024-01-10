class Auth {
  authId: number;
  userId: number;
  type: string;

  constructor(authId: number, userId: number, type: string) {
    this.authId = authId;
    this.userId = userId;
    this.type = type;
  }
}

export default Auth;
