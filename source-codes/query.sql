DROP TABLE IF EXISTS customer CASCADE;
CREATE TABLE customer(
 customer_id INT PRIMARY KEY,
 first_name VARCHAR(30),
 last_name VARCHAR(30)
);

DROP TABLE IF EXISTS bookings CASCADE;
CREATE TABLE bookings(
 book_id INT PRIMARY KEY REFERENCES payment_info(payment_id),
 customer_id INT REFERENCES customer(customer_id),
 book_date DATE,
 ticket_code VARCHAR(6) REFERENCES boarding_pass(ticket_code),
 credit_card_no VARCHAR(16)
);

DROP TABLE IF EXISTS boarding_pass CASCADE;
CREATE TABLE boarding_pass(
 ticket_code VARCHAR(6) PRIMARY KEY,
 flight_id INT REFERENCES flight(flight_id),
 customer_id INT REFERENCES customer(customer_id),
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 aircraft_code VARCHAR(10) REFERENCES aircraft(aircraft_code),
 boarding_gate VARCHAR(5),
 seat_no VARCHAR(5) REFERENCES seat_class(seat_no)
);

DROP TABLE IF EXISTS aircraft CASCADE;
CREATE TABLE aircraft(
 aircraft_code VARCHAR(10) PRIMARY KEY,
 model VARCHAR(50)
);

DROP TABLE IF EXISTS flight CASCADE;
CREATE TABLE flight(
 flight_id INT PRIMARY KEY,
 aircraft_code VARCHAR(10),
 flight_status VARCHAR(10),
 departure_airport VARCHAR(30),
 arrival_airport VARCHAR(30),
 departure_date DATE,
 return_date DATE
);

DROP TABLE IF EXISTS payment_info CASCADE;
CREATE TABLE payment_info(
 payment_id INT PRIMARY KEY,
 credit_card_no VARCHAR(16),
 full_name VARCHAR(60),
 cvv INT,
 exp_date DATE,
 amount VARCHAR(20)
);

DROP TABLE IF EXISTS seat_class CASCADE;
CREATE TABLE seat_class(
 seat_no VARCHAR(5) PRIMARY KEY,
 aircraft_code VARCHAR(10),
 fare_class VARCHAR(20)
);