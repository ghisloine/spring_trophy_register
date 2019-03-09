const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();


//View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Body Parser Middleware

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

// Static Folder
app.use('/public',express.static(path.join(__dirname,'public')));


app.get('/',(req,res) => {
    res.render('MainPage');
});

app.get('/register',(req, res) => {
    res.render('RegisterForm');
});
app.get('/teamregister',(req,res) => {
    res.render('TeamRegister');
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'leswosdesign@gmail.com',
    pass: '123987as'
  }
});

var mailOptions = {
  from: 'HelloWorld@gmail.com',
  to: 'burak.tagtekin@icloud.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

/*transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/
app.listen(1453,function(){
    console.log("Server Working ...");
})