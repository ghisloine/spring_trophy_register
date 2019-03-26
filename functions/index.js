const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const PDFDocument = require('pdfkit');


//View Engine
app.engine('handlebars', exphbs());
app.set('views','./views');
app.set('view engine', 'handlebars');
//Body Parser Middleware

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

// Static Folder
app.use('/public',express.static(path.join(__dirname,'public')));

app.get('/',(req, res) => {
    res.render('MainPage');
});

app.get('/register',(req, res) => {
    res.render('RegisterForm');
});
app.get('/teamregister',(req,res) => {
    res.render('TeamRegister');
});
app.get('/races',(req, res)=>{
  res.render('Races');
})

/*transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.app = functions.https.onRequest(app);