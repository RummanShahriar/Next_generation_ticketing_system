import District from "../District";

class TwoDistrict {
  source: District;
  destination: District;
  timestamp: Date;

  constructor(source: District, destination: District, timestamp: Date) {
    this.source = source;
    this.destination = destination;
    this.timestamp = timestamp;
  }
}

export default TwoDistrict;
