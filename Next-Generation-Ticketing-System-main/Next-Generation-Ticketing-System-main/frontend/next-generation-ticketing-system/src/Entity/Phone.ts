class Phone {
  phoneId: number;
  phoneNumber: string;
  user: number;

  constructor(phoneNumber: string, user: number, phoneId: number) {
    this.phoneId = phoneId;
    this.phoneNumber = phoneNumber;
    this.user = user;
  }
}

export default Phone;
