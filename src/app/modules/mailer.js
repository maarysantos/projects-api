const path = require ('path');
const nodemailer = require('nodemailer');

const hbs = require ('nodemailer-express-handlebars');

const {host, port, user, pass} = require('../config/mail.json');

var transport = nodemailer.createTransport({
  host, 
  port,
  auth: { user, pass }
});

transport.use('compile', hbs({
  viewEngine : 'handlebars',
  //onde fica as views de template de email. Ele parte da raiz absoluta do projeto
  viewPath : path.resolve('./src/resources/mail'),
  extName : '.html',
}));

  module.exports=transport;