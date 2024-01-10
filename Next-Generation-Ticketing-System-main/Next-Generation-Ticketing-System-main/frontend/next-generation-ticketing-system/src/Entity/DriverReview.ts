import User from "./User";
import Ticket from "./Ticket";

class DriverReview {
  dReviewId: number;
  reviewPoint: number;
  reviewText: string;
  reviewDate: Date;
  reviewer: User;
  driver: User;
  ticket: Ticket;

  constructor(
    dReviewId: number,
    reviewPoint: number,
    reviewText: string,
    reviewDate: Date,
    reviewer: User,
    driver: User,
    ticket: Ticket
  ) {
    this.dReviewId = dReviewId;
    this.reviewPoint = reviewPoint;
    this.reviewText = reviewText;
    this.reviewDate = reviewDate;
    this.reviewer = reviewer;
    this.driver = driver;
    this.ticket = ticket;
  }
}

export default DriverReview;
