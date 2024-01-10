class Driver {
  driverId: number;
  driverLicenseNo: string;
  driverLicenseExp: Date;
  userId: number;

  constructor(
    driverId: number,
    driverLicenseNo: string,
    driverLicenseExp: Date,
    userId: number
  ) {
    this.driverId = driverId;
    this.driverLicenseNo = driverLicenseNo;
    this.driverLicenseExp = driverLicenseExp;
    this.userId = userId;
  }
}

export default Driver;
