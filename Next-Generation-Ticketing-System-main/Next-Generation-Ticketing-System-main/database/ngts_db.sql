DROP DATABASE IF EXISTS `ngts_db`;

CREATE DATABASE `ngts_db`;

use `ngts_db`;

ALTER DATABASE ngts_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `name` (
  `name_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_id` int NOT NULL UNIQUE,
  PRIMARY KEY (`name_id`),
  CONSTRAINT `FK_NAME_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `phone` (
  `phone_id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(45) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`phone_id`),
  CONSTRAINT `FK_PHONE_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `auth` (
  `auth_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`auth_id`),
  CONSTRAINT `FK_AUTH_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `driver` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `driver_license_no` varchar(45) NOT NULL,
  `driver_license_exp` date NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`driver_id`),
  CONSTRAINT `FK_DRIVER_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `bus` (
  `bus_id` int NOT NULL AUTO_INCREMENT,
  `bus_no` varchar(512) NOT NULL,
  `bus_type` varchar(64) NOT NULL,
  `bus_capacity` int NOT NULL,
  PRIMARY KEY (`bus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `district` (
  `dist_id` int NOT NULL AUTO_INCREMENT,
  `dist_name` varchar(45) NOT NULL,
  PRIMARY KEY (`dist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `route` (
  `route_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`route_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `route_district` (
  `route_district_id` int NOT NULL AUTO_INCREMENT,
  `route_id` int NOT NULL,
  `dist_id` int NOT NULL,
  `dist_order` int NOT NULL,
  PRIMARY KEY (`route_district_id`),
  CONSTRAINT `FK_ROUTE_DISTRICT_1` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`),
  CONSTRAINT `FK_ROUTE_DISTRICT_2` FOREIGN KEY (`dist_id`) REFERENCES `district` (`dist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `bus_schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `bus_id` int NOT NULL,
  `route_id` int NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `driver_id` int NOT NULL,
  PRIMARY KEY (`schedule_id`),
  CONSTRAINT `FK_BUS_SCHEDULE_1` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id`),
  CONSTRAINT `FK_BUS_SCHEDULE_2` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`),
  CONSTRAINT `FK_BUS_SCHEDULE_3` FOREIGN KEY (`driver_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `ticket` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `purchase_date` datetime NOT NULL,
  `schedule_id` int NOT NULL,
  `user_id` int NOT NULL,
  `refunded` boolean NOT NULL,
  PRIMARY KEY (`ticket_id`),
  CONSTRAINT `FK_TICKET_1` FOREIGN KEY (`schedule_id`) REFERENCES `bus_schedule` (`schedule_id`),
  CONSTRAINT `FK_TICKET_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `ticket_address` (
  `ticket_address_id` int NOT NULL AUTO_INCREMENT,
  `source` int NOT NULL,
  `destination` int NOT NULL,
  `ticket_id` int NOT NULL,
  PRIMARY KEY (`ticket_address_id`),
  CONSTRAINT `FK_TICKET_ADDRESS_1` FOREIGN KEY (`source`) REFERENCES `district` (`dist_id`),
  CONSTRAINT `FK_TICKET_ADDRESS_2` FOREIGN KEY (`source`) REFERENCES `district` (`dist_id`),
  CONSTRAINT `FK_TICKET_ADDRESS_3` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `seat` (
  `seat_id` int NOT NULL AUTO_INCREMENT,
  `seat_no` varchar(45) NOT NULL,
  `schedule_id` int NOT NULL,
  `ticket_id` int DEFAULT NULL,
  PRIMARY KEY (`seat_id`),
  CONSTRAINT `FK_SEAT_1` FOREIGN KEY (`schedule_id`) REFERENCES `bus_schedule` (`schedule_id`),
  CONSTRAINT `FK_SEAT_2` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `driver_review` (
  `d_review_id` int NOT NULL AUTO_INCREMENT,
  `review_point` decimal(2,1) NOT NULL,
  `review_text` varchar(1024) NOT NULL,
  `review_date` datetime NOT NULL,
  `reviewer_id` int NOT NULL,
  `driver_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  PRIMARY KEY (`d_review_id`),
  CONSTRAINT `FK_D_REVIEW_1` FOREIGN KEY (`reviewer_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_D_REVIEW_2` FOREIGN KEY (`driver_id`) REFERENCES `user` (`user_id` ),
  CONSTRAINT `FK_D_REVIEW_3` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id` )
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `bus_review` (
  `b_review_id` int NOT NULL AUTO_INCREMENT,
  `review_point` decimal(2,1) NOT NULL,
  `review_text` varchar(1024) NOT NULL,
  `review_date` datetime NOT NULL,
  `reviewer_id` int NOT NULL,
  `bus_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  PRIMARY KEY (`b_review_id`),
  CONSTRAINT `FK_B_REVIEW_1` FOREIGN KEY (`reviewer_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_B_REVIEW_2` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id` ),
  CONSTRAINT `FK_B_REVIEW_3` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id` )
) ENGINE=InnoDB AUTO_INCREMENT=1;
