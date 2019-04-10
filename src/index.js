const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const morgan = require('morgan');
const logger = require ('../src/modules/logger');

const app = express();

module.exports = app =>{
    app.set('port', 300);
    app.set('json spaces',4);
    app.use(morgan('common',{
        stream :{
            write :(message) =>{
                logger.info(message);
            }
        }
    }
    ))};

app.use(cors({
    origin :['http://localhost:3001'],
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders : ['Content_Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use ((req, res, next)=>{
    delete req.body.id;
    next ();
});

require('./app/controllers/index')(app);

app.listen(3000);




