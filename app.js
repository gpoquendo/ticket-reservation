const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const validator = require('validator');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

function validateEmail(email) {
    return validator.isEmail(email);
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit-reservation', (req, res) => {
    const { email, flightDate, roundTrip, returnDate } = req.body;

    const emailToValidate = email;

    if (!validateEmail(emailToValidate)) {
        console.log('Email is not valid');
        return res.sendFile(__dirname + '/public/invalid-email.html');
    }

    const isValidDate = (dateString) => {
        const currentDate = new Date();
        const inputDate = new Date(dateString);
        return inputDate > currentDate;
    };

    const isValidReturnDate = (dateString) => {
        const inputDate = new Date(dateString);
        return inputDate > flightDate;
    }

    if (!isValidDate(flightDate) || (roundTrip && !isValidReturnDate(returnDate))) {
        return res.sendFile(__dirname + '/public/invalid-date.html');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gpoquendo4@gmail.com',
            pass: 'ecmq fzek doqo cgdu'
        }
    });

    if (!roundTrip) {
        var msg = `Thank you for your reservation. We look forward to serving you! Your flight is on: ${flightDate}.`
    }
    else {
        var msg = `Thank you for your reservation. We look forward to serving you! Your flight is on: ${flightDate}. Return Date: ${returnDate}`
    }

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Airline Ticket Reservation Confirmation',
        text: msg
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.sendFile(__dirname + '/public/thank-you.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});