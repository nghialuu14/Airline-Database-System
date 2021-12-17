const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./creds');
const path = require('path');
const { waitForDebugger } = require('inspector');

var fs = require("fs");
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

async function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

async function randomChar(characters, length) {
    var result           = '';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

async function randomNum(characters, length) {
    var result           = '';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

async function make_aircraft_code(){
    
    const n = await randomNum('0123456789', 1);
    var aircraft_code_list = ['A318', 'B703', 'C162' , 'DC6', 'E170', 'F70', 'GLF4', 'L410', 'RJ1H', 'IL18'];
    var aircraft_model_list = ['Airbus A318', 'Boeing 707', 'Cessna 162', 'Douglas DC-6', 'Embraer 170', 'Fokker 70', 'Gulfstream IV', 'LET 410', 'Avro RJ100', 'Ilyushin IL18'];
    return [aircraft_code_list[n], aircraft_model_list[n]];
}

async function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

var ticket_code = 0;

app.post('/booking', async(req,res)=>{
    try{
        const {fName, lName, custID,  
            Dep, Des, Num, DateDep, DateRet, fareClass,  
            cardNo, fullName, CVV, dateEXP} = req.body;
        console.log("Adding passenger: ", fName, lName);
        const stats = ['on time', 'delayed'];
        const tmp = await pool.query(`SELECT * FROM flight`);
        fs.appendFileSync('transaction.sql', `-----------------Booking a flight for customer ${fName} ${lName}-----------------\n\nBEGIN TRANSACTION;\nSET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n\n` , (err) => {
            if (err) throw err;
        })
        //const tmp2 = await pool.query(`SELECT * FROM bookings`);
        //const tmp4 = await pool.query(`SELECT * FROM payment_info`);
        //await wait(1000);
        const flight_id = tmp.rows.length + 1;
        //const book_id = tmp2.rows.length + 1;
        console.log("flight id : ", flight_id);
        //const payment_id = tmp4.rows.length + 1;
        var seat_no;
        while (1){
            seat_no = await randomNum('0123456789', 2) + await randomChar('ABCDEFG', 1);
            const tmp7 = await pool.query(`SELECT * FROM seat_class WHERE seat_no = $1`, [seat_no]);

            if (tmp7.rows.length == 0) break;
        }
        while (1){
            ticket_code = await makeid(6);
            const tmp6 = await pool.query(`SELECT * FROM boarding_pass WHERE ticket_code = $1`, [ticket_code]);
            
            if (tmp6.rows.length == 0) break;
        }

        const boarding_gate = await randomChar('ABCDEFG',1) + await randomNum('1234',1) + await randomNum('0123456789',1);
        const [aircraft_code, aircraft_model] = await make_aircraft_code();
        const flight_status = stats[parseInt(await randomNum('0000000111',1))];
        var amount = "$100";
        if (fareClass == "Business") amount = "$200";
        else if (fareClass == "First Class") amount = "$300";


        var newFlight = await pool.query ('BEGIN TRANSACTION;');


        //inserting to flight table
        newFlight = await pool.query(`INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [flight_id, aircraft_code, flight_status, Dep, Des, DateDep, DateRet]);
        fs.appendFileSync('transaction.sql', `INSERT INTO flight (flight_id, aircraft_code, flight_status, departure_airport, arrival_airport, departure_date, return_date) 
        VALUES (${flight_id}, '${aircraft_code}', '${flight_status}', '${Dep}', '${Des}', '${DateDep}', '${DateRet}') RETURNING *` + ";\n\n", (err) => {
            if (err) throw err;
          })
       
        //inserting to seat_class table
        newFlight = await pool.query(`INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ($1, $2, $3) RETURNING *`, [seat_no, aircraft_code, fareClass]);
        fs.appendFileSync('transaction.sql', `INSERT INTO seat_class (seat_no, aircraft_code, fare_class) 
        VALUES ('${seat_no}', '${aircraft_code}', '${fareClass}') RETURNING *` + ";\n\n", (err) => {
            if (err) throw err;
          })

        //inserting to customer table
        fs.appendFileSync('transaction.sql', `INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES (${custID}, '${fName}', '${lName}') RETURNING *` + ";\n\n", (err) => {
                if (err) throw err;
            })
        const tmp3 = await pool.query(`SELECT * FROM customer WHERE customer_id = $1`, [custID]);
        if (tmp3.rows.length == 0){
            newFlight = await pool.query(`INSERT INTO customer (customer_id, first_name, last_name) 
            VALUES ($1, $2, $3) RETURNING *`, [custID, fName, lName]);
            

        }

        //inserting to boarding_pass table
        newFlight = await pool.query(`INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [ticket_code, flight_id, custID, fName, lName, aircraft_code, boarding_gate, seat_no]);
        fs.appendFileSync('transaction.sql', `INSERT INTO boarding_pass (ticket_code, flight_id, customer_id, first_name, last_name, aircraft_code, boarding_gate, seat_no) 
        VALUES ('${ticket_code}', '${flight_id}', '${custID}', '${fName}', '${lName}', '${aircraft_code}', '${boarding_gate}', '${seat_no}') RETURNING *` + ";\n\n", (err) => {
                if (err) throw err;
            })

        //inserting to bookings table
        fs.appendFileSync('transaction.sql', `INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ('${flight_id}', '${custID}', '${new Date()}', '${ticket_code}', '${cardNo}') RETURNING *` + ";\n\n", (err) => {
                if (err) throw err;
            })
        newFlight = await pool.query(`INSERT INTO bookings (book_id, customer_id, book_date, ticket_code, credit_card_no) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`, [flight_id, custID, new Date(), ticket_code, cardNo]);
        

        //inserting to payment_info table
        fs.appendFileSync('transaction.sql', `INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ('${flight_id}', '${cardNo}', '${fullName}', '${CVV}', '${dateEXP}', '${amount}') RETURNING *` + ";\n\n", (err) => {
                if (err) throw err;
            })
        newFlight = await pool.query(`INSERT INTO payment_info (payment_id, credit_card_no, full_name, CVV, exp_date, amount) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [flight_id, cardNo, fullName, CVV, dateEXP, amount]);
        

        //inserting to aircraft table
        const tmp5 = await pool.query(`SELECT * FROM aircraft WHERE aircraft_code = $1`, [aircraft_code]);
        if (tmp5.rows.length == 0){
            newFlight = await pool.query(`INSERT INTO aircraft (aircraft_code, model) 
            VALUES ($1, $2) RETURNING *`, [aircraft_code, aircraft_model]);
            fs.appendFileSync('transaction.sql', `INSERT INTO aircraft (aircraft_code, model) 
            VALUES ('${aircraft_code}', '${aircraft_model}') RETURNING *` + ";\n\n", (err) => {
                if (err) throw err;
            })
        }
        fs.appendFileSync('transaction.sql', `COMMIT;\nEND TRANSACTION;\n\n` , (err) => {
            if (err) throw err;
        })
        newFlight = await pool.query ('COMMIT TRANSACTION;');
        newFlight = await pool.query ('END TRANSACTION;');
        res.json(newFlight.rows);

    } catch(err){
        fs.appendFileSync('transaction.sql', `ROLL BACK;\n\n` , (err) => {
            if (err) throw err;
        })
        newFlight = await pool.query ('ROLLBACK;');
        console.log(err.message);
    }
});


app.get('/getbookings2', async (req, res) => {
    console.log('getting ticket code...');
    try {
        const booking = await pool.query(`SELECT * FROM bookings`);
        res.json(booking.rows[booking.rows.length-1]);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.get('/getbookings3/:first/:last/:customer_id', async (req, res) => {
    console.log('getting ticket code...');
    try {

        const { first, last, customer_id } = req.params;
        fs.appendFileSync('transaction.sql', `-----------------Getting ticket code for customer ${first} ${last}-----------------\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`SELECT bookings.ticket_code FROM bookings 
                                        INNER JOIN customer ON bookings.customer_id = customer.customer_id
                                        WHERE bookings.customer_id = '${customer_id}' AND customer.first_name = '${first}' AND customer.last_name = '${last}'`);
        fs.appendFileSync('transaction.sql', `SELECT bookings.ticket_code FROM bookings 
        INNER JOIN customer ON bookings.customer_id = customer.customer_id
        WHERE bookings.customer_id = '${customer_id}' AND customer.first_name = '${first}' AND customer.last_name = '${last}'` + ";\n\n", (err) => {
                if (err) throw err;
            })
        res.json(booking);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});


app.get('/getbookings/:ticket_code/:first/:last', async (req, res) => {
    console.log('finding trip....');
    try {
        const { ticket_code, first, last } = req.params;
        fs.appendFileSync('transaction.sql', `-----------------Finding trip for customer ${first} ${last}-----------------\n\n` , (err) => {
            if (err) throw err;
        })
        console.log(ticket_code, first, last);
        const booking = await pool.query(`SELECT * FROM bookings 
                                        INNER JOIN customer ON bookings.customer_id = customer.customer_id
                                        WHERE bookings.ticket_code = '${ticket_code}' AND customer.first_name = '${first}' AND customer.last_name = '${last}'`);

        fs.appendFileSync('transaction.sql', `SELECT * FROM bookings 
        INNER JOIN customer ON bookings.customer_id = customer.customer_id
        WHERE bookings.ticket_code = '${ticket_code}' AND customer.first_name = '${first}' AND customer.last_name = '${last}'` + ";\n\n", (err) => {
                if (err) throw err;
            })
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.get('/getcustomer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        fs.appendFileSync('transaction.sql', `Getting from customer table id ${id}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`SELECT * FROM customer
                                        WHERE customer_id = $1`,
                                        [id]);
        fs.appendFileSync('transaction.sql', `SELECT * FROM customer
        WHERE customer_id = ${id};\n\n`, (err) => {
                if (err) throw err;
            })
                                    
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.get('/getboardingpass/:customer_id', async (req, res) => {
    try {
    
        const { customer_id } = req.params;
        fs.appendFileSync('transaction.sql', `Getting from customer table customer id ${customer_id}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`SELECT * FROM boarding_pass
                                        WHERE customer_id = $1`,
                                        [customer_id]);
         fs.appendFileSync('transaction.sql', `SELECT * FROM boarding_pass
         WHERE customer_id = ${customer_id}` + ";\n\n", (err) => {
                if (err) throw err;
            })
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.get('/getflight/:flight_id', async (req, res) => {

    try {
        const { flight_id } = req.params;
        fs.appendFileSync('transaction.sql', `Getting from flight table flight id ${flight_id}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`SELECT * FROM flight
                                        WHERE flight_id = $1`,
                                        [flight_id]);
        fs.appendFileSync('transaction.sql', `SELECT * FROM flight
        WHERE flight_id = ${flight_id}` + ";\n\n", (err) => {
                if (err) throw err;
            })
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.get('/getpayment/:book_id', async (req, res) => {

    try {
        const { book_id } = req.params;
        fs.appendFileSync('transaction.sql', `Getting from payment_info table payment id ${book_id}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`SELECT * FROM payment_info
                                        WHERE payment_id = $1`,
                                        [book_id]);
        fs.appendFileSync('transaction.sql', `SELECT * FROM payment_info
        WHERE payment_id = ${book_id}` + ";\n\n", (err) => {
                if (err) throw err;
            })
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.get('/getseatclass/:seat_no', async (req, res) => {

    try {
        const { seat_no } = req.params;
        fs.appendFileSync('transaction.sql', `Getting from seat_no table seat number ${seat_no}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`SELECT * FROM seat_class
                                        WHERE seat_no = $1`,
                                        [seat_no]);
        fs.appendFileSync('transaction.sql', `SELECT * FROM seat_class
        WHERE seat_no = ${seat_no}` + ";\n\n", (err) => {
                if (err) throw err;
            })
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.get('/searchflights/:departure/:arrival/:datestart/:dateend', async (req, res) => {
    console.log('finding trip....');
    try {
        //console.log(req.params);
        var { departure, arrival, datestart, dateend} = req.params;
        if (departure != "_") departure = departure.substring(1); else departure = "%";
        if (arrival != "_") arrival = arrival.substring(1); else arrival = "%";
        if (datestart != "_") datestart = datestart.substring(1); else datestart = "01/01/0001";
        if (dateend != "_") dateend = dateend.substring(1); else dateend = "12/31/9999";
        fs.appendFileSync('transaction.sql', `-----------------Searching for flights-----------------\n\n` , (err) => {
            if (err) throw err;
        })
        datestart = datestart.replace("_","/");
        datestart = datestart.replace("_","/");

        dateend = dateend.replace("_","/");
        dateend = dateend.replace("_","/");
/*
        console.log(departure);
        console.log(arrival);
        console.log(datestart);
        console.log(dateend);*/

        const booking = await pool.query(`SELECT * FROM flight 
                                        WHERE departure_airport LIKE '${departure}' AND arrival_airport LIKE '${arrival}' 
                                        AND departure_date >= '${datestart}' AND departure_date <= '${dateend}}'`);
        fs.appendFileSync('transaction.sql', `SELECT * FROM flight 
        WHERE departure_airport LIKE '${departure}' AND arrival_airport LIKE '${arrival}' 
        AND departure_date >= '${datestart}' AND departure_date <= '${dateend}'` + ";\n\n", (err) => {
                if (err) throw err;
            })
        
        //console.log(booking.rows);
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});


/*
app.get('/demos/:id', async(req,res)=>{
    console.log('heheheh');
    try{
        const { id } = req.params;
        const demo = await pool.query(`SELECT * FROM demo
                                        WHERE key = $1`,
            [id]);
            res.json(demo.rows);
    } catch(err){
        console.log(err.message);
    }
});
*/
app.put("/demos/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const { key, description } = req.body;
        console.log (key,description);
        const updateDemo = await pool.query(`UPDATE demo SET key = $2, description = $3
                                            WHERE key = $1`,
            [id, key, description]);
        res.json({key, description})
    } catch (err){
        console.error(err.message);
    }
});


app.delete('/deletebookings/:ticket_code/:first/:last', async (req, res) => {
    console.log('deleting trip....');
    try {
        
        const { ticket_code, first, last } = req.params;
        fs.appendFileSync('transaction.sql', `-----------------Cancelling trip for customer ${first} ${last}-----------------\n\nBEGIN TRANSACTION;\nSET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n\n` , (err) => {
            if (err) throw err;
        })
        fs.appendFileSync('transaction.sql', `Deleting from bookings table customer ${first} ${last}:\n` , (err) => {
            if (err) throw err;
        })
        console.log(ticket_code, first, last);
        const booking = await pool.query(`DELETE FROM bookings 
                                        USING customer WHERE bookings.customer_id = customer.customer_id
                                        AND bookings.ticket_code = '${ticket_code}' AND customer.first_name = '${first}' AND customer.last_name = '${last}'`);
         fs.appendFileSync('transaction.sql', `DELETE FROM bookings 
         USING customer WHERE bookings.customer_id = customer.customer_id
         AND bookings.ticket_code = '${ticket_code}' AND customer.first_name = '${first}' AND customer.last_name = '${last}'` + ";\n\n", (err) => {
                if (err) throw err;
            })                             
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.delete('/deletecustomer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        fs.appendFileSync('transaction.sql', `Deleting from customer table customer id ${id}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`DELETE FROM customer
                                        WHERE customer_id = $1`,
                                        [id]);
        fs.appendFileSync('transaction.sql', `DELETE FROM customer
        WHERE customer_id = ${id}` + ";\n\n", (err) => {
                if (err) throw err;
            })                                 
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.delete('/deleteboardingpass/:customer_id', async (req, res) => {
    try {
        const { customer_id } = req.params;
        fs.appendFileSync('transaction.sql', `Deleting from boarding_pass table customer id ${customer_id}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`DELETE FROM boarding_pass
                                        WHERE customer_id = $1`,
                                        [customer_id]);
        fs.appendFileSync('transaction.sql', `DELETE FROM boarding_pass
        WHERE customer_id = ${customer_id}` + ";\n\n", (err) => {
                if (err) throw err;
            }) 
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.delete('/deleteflight/:flight_id', async (req, res) => {

    try {
        const { flight_id } = req.params;
        fs.appendFileSync('transaction.sql', `Deleting from flight table flight id ${flight_id}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`DELETE FROM flight
                                        WHERE flight_id = $1`,
                                        [flight_id]);
        fs.appendFileSync('transaction.sql', `DELETE FROM flight
        WHERE flight_id = ${flight_id}` + ";\n\n", (err) => {
                if (err) throw err;
            }) 
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.delete('/deletepayment/:book_id', async (req, res) => {

    try {
        const { book_id } = req.params;
        fs.appendFileSync('transaction.sql', `Deleting from payment_info table payment id ${book_id}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`DELETE FROM payment_info
                                        WHERE payment_id = $1`,
                                        [book_id]);
        fs.appendFileSync('transaction.sql', `DELETE FROM payment_info
        WHERE payment_id = ${book_id}` + ";\n\n", (err) => {
                if (err) throw err;
            }) 
        res.json(booking.rows);
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.delete('/deleteseatclass/:seat_no', async (req, res) => {

    try {
        const { seat_no } = req.params;
        fs.appendFileSync('transaction.sql', `Deleting from seat_no table seat number ${seat_no}:\n` , (err) => {
            if (err) throw err;
        })
        const booking = await pool.query(`DELETE FROM seat_class
                                        WHERE seat_no = $1`,
                                        [seat_no]);
        fs.appendFileSync('transaction.sql', `DELETE FROM seat_class
        WHERE seat_no = ${seat_no}` + ";\n\n", (err) => {
                if (err) throw err;
            }) 
        res.json(booking.rows);
        fs.appendFileSync('transaction.sql', `COMMIT;\nEND TRANSACTION\n\n` , (err) => {
            if (err) throw err;
        })  
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

app.get('*', function (req,res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server has started on port ${port}`);
});