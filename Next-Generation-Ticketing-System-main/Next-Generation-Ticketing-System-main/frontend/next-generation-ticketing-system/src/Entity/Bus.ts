class Bus {
  busId: number;
  busNo: string;
  busType: string;
  busCapacity: number;

  constructor(
    busId: number,
    busNo: string,
    busType: string,
    busCapacity: number
  ) {
    this.busId = busId;
    this.busNo = busNo;
    this.busType = busType;
    this.busCapacity = busCapacity;
  }
}

export default Bus;
