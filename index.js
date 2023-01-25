const fs = require('fs');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');
const validator = require('validator');
const express = require('express')
const app = express();

app.use(express.json());

// create a transporter object for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'esperanza41@ethereal.email',
    pass: 'zrJES9QhYSEdEKse2W'
  }
});

// read the CSV file
fs.createReadStream("Book1.csv")
  .pipe(csv())
  .on('data', (data) => {
    // validate the email address
    if (validator.isEmail(String(data.email))) {
      // send email
      transporter.sendMail({
        from: '"Leon Chandler" <leonchandler555@gmail.com>',
        to: data.email,
        subject: 'Hello',
        text: 'Hello, this is a test email.'
      }, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent to ${String(data.email)}`);
        }
      });
    } else {
      console.log(`Invalid email: ${String(data.email)}`);
    }
  })
  .on('end', () => {
    console.log('Finished reading CSV file.');
  });
