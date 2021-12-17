//const path = require('path');
let demos = [];
//const ticket = require('express');
const abc = require('express');
const cors = require('cors');
var fs = require("fs");

const displayDemos = () =>{
    demos.sort((a,b) => {
        return a.inputDep - b.inputDep;
    });
    const demoTable = document.querySelector('#demo-Table');
    let tableHTML = "";
    demos.map(demo =>{
        tableHTML +=
        `<tr key=${demo.key}>
        <th${demo.inputDep}</th>
        <th${demo.inputDes}</th>
        <th${demo.inputNum}</th>
        <th${demo.inputDateDep}</th>
        <th${demo.inputDateRet}</th>
        <th><button class="btn btn-danger type="button" onclick="deleteDemo(${demo.inputDep})"> Delete</button></th>
        </tr>`;
    })
    demoTable.innerHTML = tableHTML;
}

async function bookingAFlight(){
    console.log("adding...");
    
    const firstName = document.querySelector('#passengerFirstName').value;
    const lastName = document.querySelector('#passengerLastName').value;
    const customerID = document.querySelector('#customerID').value;
    const Departure = document.querySelector('#departureAirport').value;
    const Destination = document.querySelector('#destinationAirport').value;
    const DateDeparture = document.querySelector('#aa-leavingOn').value;
    const DateReturn = document.querySelector('#aa-returningFrom').value;
    const fareClass = document.querySelector('#fareClass').value;
    const creditCardNo = document.querySelector('#creditCardNo').value;
    const fullName = document.querySelector('#fullName').value;
    const CVV = document.querySelector('#CVV').value;
    const dateEXP = document.querySelector('#dateEXP').value;
    /*fs.appendFileSync('transaction.sql', `Booking a flight for customer '${firstName}' '${lastName}':` , (err) => {
        if (err) throw err;
    })*/ 
    try{
        const body = { fName: firstName, lName: lastName, custID: customerID, 
                        Dep: Departure, Des: Destination, Num: Number, DateDep: DateDeparture, DateRet: DateReturn, fareClass: fareClass, 
                        cardNo: creditCardNo, fullName: fullName, CVV: CVV, dateEXP: dateEXP};
        const response = await fetch("http://localhost:5000/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const newDemo = await response.json();
        //demos.push(newDemo);
        //displayDemos();
        //inputBox.value='';
    } catch(err){
        console.log(err.message);
    }
}

async function findAFlight(){
    console.log("finding...");
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const ticket_code = document.querySelector('#ticket_code').value;/*
    fs.appendFileSync('transaction.sql', `Finding a flight for customer:` , (err) => {
        if (err) throw err;
    })*/
    try{
        const response = await fetch(`http://localhost:5000/getbookings/${ticket_code}/${firstName}/${lastName}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        
        const newDemo = await response.json();
        //demos.push(newDemo);
        ///displayDemos();
        //inputBox.value='';
        var btn = document.getElementById("findTrips");
        btn.innerHTML = "<h3><em><b> HERE IS YOUR FLIGHT INFORMATION </b></em></h3>";
        const customer_id = newDemo[0].customer_id;

        const response2 = await fetch(`http://localhost:5000/getcustomer/${customer_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const newDemo2 = await response2.json();


        const response3 = await fetch(`http://localhost:5000/getboardingpass/${customer_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const newDemo3 = await response3.json();

        const flight_id = newDemo3[0].flight_id;

        const response4 = await fetch(`http://localhost:5000/getflight/${flight_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const newDemo4 = await response4.json();
        
        const book_id = newDemo[0].book_id;
        const response5 = await fetch(`http://localhost:5000/getpayment/${book_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const newDemo5 = await response5.json();

        
        const seat_no = newDemo3[0].seat_no;

        const response6 = await fetch(`http://localhost:5000/getseatclass/${seat_no}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const newDemo6 = await response6.json();


        btn.innerHTML += "<h3>Ticket Infomation:</h3>" + "Book ID: " + newDemo[0].book_id + "<br>Ticket Code: " + newDemo[0].ticket_code + "<br>Book Date: " + newDemo[0].book_date.substring(0,10) 
        + "<h3>Customer Information:</h3>" + "Customer ID: " + newDemo[0].customer_id + "<br>First Name: " + newDemo2[0].first_name + "<br>Last Name: " + newDemo2[0].last_name
        + "<h3>Boarding Pass:</h3>" + "Aircraft Code: " + newDemo3[0].aircraft_code + "<br>Boarding Gate: " + newDemo3[0].boarding_gate + "<br>Seat Number: " + newDemo3[0].seat_no + "<br>Class: " + newDemo6[0].fare_class
        + "<h3>Flight information:</h3>" + "Flight ID: " + newDemo3[0].flight_id + "<br>Flight Status: "  + newDemo4[0].flight_status + "<br>Departure: " + newDemo4[0].departure_airport + "<br>Arrival: " + newDemo4[0].arrival_airport + "<br>Departure Date: " + newDemo4[0].departure_date.substring(0,10)
        + "<h3>Payment Infomation:</h3>" + "Payment ID: " + book_id + "<br>Credit Card Number: " + newDemo[0].credit_card_no + "<br>Name: " + newDemo5[0].full_name + "<br>Amount: " + newDemo5[0].amount;

        btn.innerHTML += `<br><br><form action="manage-trips.html"><button> Find another trip</button></form>`



    } catch(err){
        var btn = document.getElementById("findTrips");
        btn.innerHTML = "<h3><b> You did not enter valid information </b></h3>";
        console.log(err.message);
    }
}

var customer_id, flight_id, book_id, seat_no;

async function findAFlightToCancel(){
    console.log("finding...");
    
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const ticket_code = document.querySelector('#ticket_code').value;/*
    fs.appendFileSync('transaction.sql', `Finding a flight for customer to '${firstName}' '${lastName}' for cancellation:` , (err) => {
        if (err) throw err;
    }) */
    try{
        const response = await fetch(`http://localhost:5000/getbookings/${ticket_code}/${firstName}/${lastName}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        
        const newDemo = await response.json();
        //demos.push(newDemo);
        ///displayDemos();
        //inputBox.value='';
        var btn = document.getElementById("cancelTrip");
        btn.innerHTML = "<h3><em><b> HERE IS YOUR FLIGHT INFORMATION </b></em></h3>";
        customer_id = newDemo[0].customer_id;

        const response2 = await fetch(`http://localhost:5000/getcustomer/${customer_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const newDemo2 = await response2.json();


        const response3 = await fetch(`http://localhost:5000/getboardingpass/${customer_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const newDemo3 = await response3.json();

        flight_id = newDemo3[0].flight_id;

        const response4 = await fetch(`http://localhost:5000/getflight/${flight_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const newDemo4 = await response4.json();
        
        book_id = newDemo[0].book_id;
        const response5 = await fetch(`http://localhost:5000/getpayment/${book_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const newDemo5 = await response5.json();

        
        seat_no = newDemo3[0].seat_no;

        const response6 = await fetch(`http://localhost:5000/getseatclass/${seat_no}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const newDemo6 = await response6.json();


        btn.innerHTML += "<h3>Ticket Infomation:</h3>" + "Book ID: " + newDemo[0].book_id + "<br>Ticket Code: " + newDemo[0].ticket_code + "<br>Book Date: " + newDemo[0].book_date.substring(0,10) 
        + "<h3>Customer Information:</h3>" + "Customer ID: " + newDemo[0].customer_id + "<br>First Name: " + newDemo2[0].first_name + "<br>Last Name: " + newDemo2[0].last_name
        + "<h3>Boarding Pass:</h3>" + "Aircraft Code: " + newDemo3[0].aircraft_code + "<br>Boarding Gate: " + newDemo3[0].boarding_gate + "<br>Seat Number: " + newDemo3[0].seat_no + "<br>Class: " + newDemo6[0].fare_class
        + "<h3>Flight information:</h3>" + "Flight ID: " + newDemo3[0].flight_id + "<br>Flight Status: "  + newDemo4[0].flight_status + "<br>Departure: " + newDemo4[0].departure_airport + "<br>Arrival: " + newDemo4[0].arrival_airport + "<br>Departure Date: " + newDemo4[0].departure_date.substring(0,10)
        + "<h3>Payment Infomation:</h3>" + "Payment ID: " + book_id + "<br>Credit Card Number: " + newDemo[0].credit_card_no + "<br>Name: " + newDemo5[0].full_name + "<br>Amount: " + newDemo5[0].amount;

        btn.innerHTML += `<br><br><form action="cancel-thankyou.html" target="_blank">
        <button onclick="cancelFlight()"> Cancel your flight</button>
        </form>`;



    } catch(err){
        var btn = document.getElementById("cancelTrip");
        btn.innerHTML = "<h3><b> You did not enter valid information </b></h3>";
        console.log(err.message);
    }
}

async function cancelFlight(){
    console.log("deleting...");
    
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const ticket_code = document.querySelector('#ticket_code').value;/*
    fs.appendFileSync('transaction.sql', `Cancelling a flight for customer '${firstName}' '${lastName}':` , (err) => {
        if (err) throw err;
    }) */
    console.log(firstName, lastName, ticket_code);
    try{
        const response = await fetch(`http://localhost:5000/deletebookings/${ticket_code}/${firstName}/${lastName}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        
/*
        const response2 = await fetch(`http://localhost:5000/deletecustomer/${customer_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
*/      

        const response3 = await fetch(`http://localhost:5000/deleteboardingpass/${customer_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        /*
        const response4 = await fetch(`http://localhost:5000/deleteflight/${flight_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });*/
        
        const response5 = await fetch(`http://localhost:5000/deletepayment/${book_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        
        const response6 = await fetch(`http://localhost:5000/deleteseatclass/${seat_no}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        

    } catch(err){
        var btn = document.getElementById("cancelTrip");
        btn.innerHTML = "<h3><b> Invalid </b></h3>";
        console.log(err.message);
    }
}

async function retrieve_ticket_code(){
    console.log('retrieving...');
    try{
        const response = await fetch(`http://localhost:5000/getbookings2`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const newDemo = await response.json();
        var btn = document.getElementById("getTicketCode");
        btn.innerHTML = "<br><b> HERE IS YOUR TICKET CODE: </b>" + newDemo.ticket_code;

    } catch(err){
        var btn = document.getElementById("getTicketCode");
        btn.innerHTML = "<h3><b> Not valid ticket code </b></h3>";
        console.log(err.message);
    }
}

async function trackTicketCode(){
    console.log('retrieving...');
    try{
        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;
        const custID = document.querySelector('#customerID').value;/*
        fs.appendFileSync('transaction.sql', `Retrieving ticket code for customer '${firstName}' '${lastName}':` , (err) => {
            if (err) throw err;
        }) */
        const response = await fetch(`http://localhost:5000/getbookings3/${firstName}/${lastName}/${custID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        
        const newDemo = await response.json();
        var btn = document.getElementById("trackTicketCode");
        btn.innerHTML = "<br><b> HERE IS YOUR TICKET CODE: </b>" + newDemo.rows[0].ticket_code;

    } catch(err){
        var btn = document.getElementById("trackTicketCode");
        btn.innerHTML = "<h3><b> Not valid customer information </b></h3>";
        console.log(err.message);
    }
}


async function seachFlights(){
    console.log('searching...');
    try{
        const departure = "_" + document.querySelector('#Departure').value;
        const arrival = "_"+ document.querySelector('#Arrival').value;
        var datestart = "_" + document.querySelector('#datestart').value;
        var dateend = "_" + document.querySelector('#dateend').value;/*
        fs.appendFileSync('transaction.sql', `Searching for flights:` , (err) => {
            if (err) throw err;
        }) */
        //console.log (departure,arrival,datestart,dateend);
        datestart = datestart.replace("/","_");
        datestart = datestart.replace("/","_");

        dateend = dateend.replace("/","_");
        dateend = dateend.replace("/","_");

        const response = await fetch(`http://localhost:5000/searchflights/${departure}/${arrival}/${datestart}/${dateend}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const newDemo = await response.json();
        var btn = document.getElementById("searchflights");
        //console.log(newDemo[0].flight_id);
        btn.innerHTML = "<br><h2> Flights Information: </h2>";
        for (var i = 0; i < newDemo.length; i++){
            btn.innerHTML += "<h3>Flight ID: " + newDemo[i].flight_id + "</h3> Aircraft Code: " + newDemo[i].aircraft_code
            + "<br> Flight Status: " + newDemo[i].flight_status + "<br> Departure Airport: " + newDemo[i].departure_airport + "<br> Arrival Airport: " + newDemo[i].arrival_airport
            + "<br> Departure Date: " + newDemo[i].departure_date.substring(0,10) + "<br> Return Date: " + newDemo[i].return_date.substring(0,10);
        }

    } catch(err){
        var btn = document.getElementById("searchflights");
        btn.innerHTML = "<h3><b> Not valid flights information </b></h3>";
        console.log(err.message);
    }
}
