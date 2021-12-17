-----------------Booking a flight for customer Megan Skinner-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (1, 'IL18', 'on time', 'San Jose', 'Austin', '2020-01-09', '2021-03-02') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('06D', 'IL18', 'Economy') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (12451241, 'Megan', 'Skinner') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('P3RWBZ', '1', '12451241', 'Megan', 'Skinner', 'IL18', 'G49', '06D') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('1', '12451241', 'Sun Dec 05 2021 14:18:23 GMT-0600 (Central Standard Time)', 'P3RWBZ', '5435643654745670') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('1', '5435643654745670', 'MEGAN SKINNER', '623', '2026-08-27', '$100') RETURNING *;

INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('IL18', 'Ilyushin IL18') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Rachel Vaughan-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (2, 'A318', 'on time', 'Phoenix', 'Kansas City', '2021-06-08', '2021-06-26') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('48F', 'A318', 'Business') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (35123512, 'Rachel', 'Vaughan') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('NE2WQO', '2', '35123512', 'Rachel', 'Vaughan', 'A318', 'B42', '48F') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('2', '35123512', 'Sun Dec 05 2021 14:19:56 GMT-0600 (Central Standard Time)', 'NE2WQO', '5123451235235630') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('2', '5123451235235630', 'RACHEL VAUGHAN', '856', '2027-05-10', '$200') RETURNING *;

INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('A318', 'Airbus A318') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Rose Russell-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (3, 'L410', 'on time', 'Kansas City', 'Seattle', '2021-07-14', '2021-08-25') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('38E', 'L410', 'Economy') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (12412512, 'Rose', 'Russell') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('AD6PZB', '3', '12412512', 'Rose', 'Russell', 'L410', 'A17', '38E') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('3', '12412512', 'Sun Dec 05 2021 14:20:35 GMT-0600 (Central Standard Time)', 'AD6PZB', '5123451235235630') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('3', '5123451235235630', 'ROSE RUSSELL', '523', '2027-07-13', '$100') RETURNING *;

INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('L410', 'LET 410') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Adrian Turner-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (4, 'B703', 'on time', 'Detroit', 'Omaha', '0001-05-03', '2021-05-13') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('13A', 'B703', 'Business') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (23623636, 'Adrian', 'Turner') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('HDKEWP', '4', '23623636', 'Adrian', 'Turner', 'B703', 'C28', '13A') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('4', '23623636', 'Sun Dec 05 2021 14:21:10 GMT-0600 (Central Standard Time)', 'HDKEWP', '7657565734573470') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('4', '7657565734573470', 'ADRIAN TURNER', '041', '2027-08-04', '$200') RETURNING *;

INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('B703', 'Boeing 707') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Vanessa Springer-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (5, 'C162', 'on time', 'Miami', 'San Diego', '2021-09-08', '2021-09-23') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('91C', 'C162', 'First Class') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (23152152, 'Vanessa', 'Springer') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('AW5M9Q', '5', '23152152', 'Vanessa', 'Springer', 'C162', 'C49', '91C') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('5', '23152152', 'Sun Dec 05 2021 14:21:44 GMT-0600 (Central Standard Time)', 'AW5M9Q', '7456754765867570') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('5', '7456754765867570', 'VANESSA SPRINGER', '023', '2027-12-24', '$300') RETURNING *;

INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('C162', 'Cessna 162') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Benjamin Peake-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (6, 'E170', 'on time', 'Phoenix', 'Boston', '2021-10-21', '2021-10-28') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('76F', 'E170', 'Economy') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (73475478, 'Benjamin', 'Peake') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('BO2V3O', '6', '73475478', 'Benjamin', 'Peake', 'E170', 'F47', '76F') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('6', '73475478', 'Sun Dec 05 2021 14:22:22 GMT-0600 (Central Standard Time)', 'BO2V3O', '4242424242534630') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('6', '4242424242534630', 'BENJAMIN PEAKE', '375', '2028-01-20', '$100') RETURNING *;

INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('E170', 'Embraer 170') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Alexander Manning-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (7, 'F70', 'delayed', 'Chicago', 'Long Beach', '2021-11-04', '2021-12-10') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('56F', 'F70', 'First Class') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (48548748, 'Alexander', 'Manning') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('CBKE0H', '7', '48548748', 'Alexander', 'Manning', 'F70', 'B49', '56F') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('7', '48548748', 'Sun Dec 05 2021 14:22:59 GMT-0600 (Central Standard Time)', 'CBKE0H', '234612361245325') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('7', '234612361245325', 'ALEXANDER MANNING', '645', '2028-04-01', '$300') RETURNING *;

INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('F70', 'Fokker 70') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Connor Mackay-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (8, 'C162', 'on time', 'Memphis', 'Charlotte', '2021-02-07', '2021-02-21') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('98E', 'C162', 'Economy') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (23634634, 'Connor', 'Mackay') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('000TI1', '8', '23634634', 'Connor', 'Mackay', 'C162', 'A38', '98E') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('8', '23634634', 'Sun Dec 05 2021 14:23:33 GMT-0600 (Central Standard Time)', '000TI1', '6346323345123410') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('8', '6346323345123410', 'CONNOR MACKAY', '867', '2028-08-07', '$100') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Harry Hudson-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (9, 'F70', 'on time', 'Omaha', 'Houston', '2021-03-04', '2021-03-31') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('87G', 'F70', 'Business') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (32543545, 'Harry', 'Hudson') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('6H814G', '9', '32543545', 'Harry', 'Hudson', 'F70', 'D25', '87G') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('9', '32543545', 'Sun Dec 05 2021 14:24:14 GMT-0600 (Central Standard Time)', '6H814G', '5236432634634620') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('9', '5236432634634620', 'HARRY HUDSON', '978', '2029-01-06', '$200') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Jacob Butler-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (10, 'A318', 'on time', 'Charlotte', 'Los Angeles', '2021-04-13', '2021-04-21') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('84D', 'A318', 'Economy') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (23543255, 'Jacob', 'Butler') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('E0KJDU', '10', '23543255', 'Jacob', 'Butler', 'A318', 'D38', '84D') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('10', '23543255', 'Sun Dec 05 2021 14:24:43 GMT-0600 (Central Standard Time)', 'E0KJDU', '6547346234512420') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('10', '6547346234512420', 'JACOB BUTLER', '465', '2029-02-26', '$100') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Wendy Brown-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (11, 'L410', 'on time', 'Seattle', 'Kansas City', '2021-06-14', '2021-06-28') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('85A', 'L410', 'Economy') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (74574575, 'Wendy', 'Brown') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('ZRLQH5', '11', '74574575', 'Wendy', 'Brown', 'L410', 'B10', '85A') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('11', '74574575', 'Sun Dec 05 2021 14:25:20 GMT-0600 (Central Standard Time)', 'ZRLQH5', '6504235651283540') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('11', '6504235651283540', 'WENDY BROWN', '102', '2029-05-19', '$100') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Wanda  Ferguson-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (12, 'GLF4', 'on time', 'Miami', 'Tucson', '2021-07-08', '2021-09-14') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('70F', 'GLF4', 'Business') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (71312543, 'Wanda', ' Ferguson') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('1RKSBH', '12', '71312543', 'Wanda', ' Ferguson', 'GLF4', 'C13', '70F') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('12', '71312543', 'Sun Dec 05 2021 14:25:53 GMT-0600 (Central Standard Time)', '1RKSBH', '1653424561235440') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('12', '1653424561235440', 'WANDA FERGUSON', '123', '2029-06-17', '$200') RETURNING *;

INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('GLF4', 'Gulfstream IV') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Max Glover-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (13, 'L410', 'on time', 'Houston', 'Tucson', '2021-10-09', '2021-10-10') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('66A', 'L410', 'Business') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (65465474, 'Max', 'Glover') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('TL98WI', '13', '65465474', 'Max', 'Glover', 'L410', 'B39', '66A') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('13', '65465474', 'Sun Dec 05 2021 14:26:24 GMT-0600 (Central Standard Time)', 'TL98WI', '6203564103455710') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('13', '6203564103455710', 'MAX GLOVER', '867', '2029-09-16', '$200') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Neil Kelly-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (14, 'DC6', 'delayed', 'El Paso', 'Los Angeles', '2021-11-15', '2021-11-22') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('48B', 'DC6', 'Economy') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (41451532, 'Neil', 'Kelly') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('IWQZ1W', '14', '41451532', 'Neil', 'Kelly', 'DC6', 'B49', '48B') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('14', '41451532', 'Sun Dec 05 2021 14:26:54 GMT-0600 (Central Standard Time)', 'IWQZ1W', '5601235463405460') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('14', '5601235463405460', 'NEIL KELLY', '304', '2029-09-24', '$100') RETURNING *;

INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('DC6', 'Douglas DC-6') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Booking a flight for customer Ryan Johnston-----------------

BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (15, 'F70', 'on time', 'Houston', 'Memphis', '2021-11-26', '2021-11-28') RETURNING *;

INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('06G', 'F70', 'Economy') RETURNING *;

INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (94573456, 'Ryan', 'Johnston') RETURNING *;

INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('QZOR4J', '15', '94573456', 'Ryan', 'Johnston', 'F70', 'B41', '06G') RETURNING *;

INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('15', '94573456', 'Sun Dec 05 2021 14:27:28 GMT-0600 (Central Standard Time)', 'QZOR4J', '3264512235461340') RETURNING *;

INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('15', '3264512235461340', 'RYAN JOHNSTON', '537', '2030-11-20', '$100') RETURNING *;

COMMIT;
END TRANSACTION;

-----------------Finding trip for customer Max Glover-----------------

SELECT * FROM bookings 
        INNER JOIN customer ON bookings.customer_id = customer.customer_id
        WHERE bookings.ticket_code = 'TL98WI' AND customer.first_name = 'Max' AND customer.last_name = 'Glover';

Getting from customer table id 65465474:
SELECT * FROM customer
        WHERE customer_id = 65465474;

Getting from customer table customer id 65465474:
SELECT * FROM boarding_pass
         WHERE customer_id = 65465474;

Getting from flight table flight id 13:
SELECT * FROM flight
        WHERE flight_id = 13;

Getting from payment_info table payment id 13:
SELECT * FROM payment_info
        WHERE payment_id = 13;

Getting from seat_no table seat number 66A:
SELECT * FROM seat_class
        WHERE seat_no = 66A;

-----------------Finding trip for customer Max Glover-----------------

SELECT * FROM bookings 
        INNER JOIN customer ON bookings.customer_id = customer.customer_id
        WHERE bookings.ticket_code = 'TL98WI' AND customer.first_name = 'Max' AND customer.last_name = 'Glover';

Getting from customer table id 65465474:
SELECT * FROM customer
        WHERE customer_id = 65465474;

Getting from customer table customer id 65465474:
SELECT * FROM boarding_pass
         WHERE customer_id = 65465474;

Getting from flight table flight id 13:
SELECT * FROM flight
        WHERE flight_id = 13;

Getting from payment_info table payment id 13:
SELECT * FROM payment_info
        WHERE payment_id = 13;

Getting from seat_no table seat number 66A:
SELECT * FROM seat_class
        WHERE seat_no = 66A;

