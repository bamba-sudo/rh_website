const express = require('express')
const nodemailer = require('nodemailer')
const fs = require('fs')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home/index', {isActive: true, req: req});
});

app.get('/about', (req, res) => {
  res.render('about/index', {isActive: true, req: req});
});

app.get('/services', (req, res) => {
  res.render('services/index', {isActive: true, req: req});
});

app.get('/devis', (req, res) => {
  res.render('devis/index', {isActive: true, req: req});
});

app.post('/submit', function (req, res) {
  // Get all var
  const name = req.query.name;
  const mail = req.query.mail;
  const mobile = req.query.mobile;
  const mobilePoste = req.query.mobileposte;
  const nameBusiness = req.query.namebusiness;
  const message = req.query.message;

  // Set up the transport
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'rh-vitec-001@hotmail.com',
      pass: 'rhvitec2023'
    }
  });

  // Define the email options
  const mailOptions = {
    from: 'rh-vitec-001@hotmail.com',
    to: 'w.gharbi.tangerine@gmail.com',
    subject: 'Test email',
    text: `Name: ${name}\nMail: ${mail}\nMobile: ${mobile}\nPoste: ${mobilePoste}\nName of business: ${nameBusiness}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.render('home/submit');
    }
  });
})

app.use((req, res, next) => { 
  res.status(404).render('404/index');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})