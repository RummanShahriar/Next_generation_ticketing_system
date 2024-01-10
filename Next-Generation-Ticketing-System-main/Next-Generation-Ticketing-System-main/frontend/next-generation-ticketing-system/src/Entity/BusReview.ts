import User from "./User";
import Bus from "./Bus";
import Ticket from "./Ticket";

class BusReview {
  bReviewId: number;
  reviewPoint: number;
  reviewText: string;
  reviewDate: Date;
  reviewer: User;
  bus: Bus;
  ticket: Ticket;

  constructor(
    bReviewId: number,
    reviewPoint: number,
    reviewText: string,
    reviewDate: Date,
    reviewer: User,
    bus: Bus,
    ticket: Ticket
  ) {
    this.bReviewId = bReviewId;
    this.reviewPoint = reviewPoint;
    this.reviewText = reviewText;
    this.reviewDate = reviewDate;
    this.reviewer = reviewer;
    this.bus = bus;
    this.ticket = ticket;
  }
}

export default BusReview;
