const express = require('express');
const sessions = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users.cjs');

/* app initialization */
app = express();
app.use(sessions);
app.use(bodyParser.urlencoded({limit:'5mb', extended: false}));

/* connect to DB */
//mongoose.connect('mongodb://localhost:27017'/*, { useNewUrlParser: true}*/); /* I haven't done this in a while */
/*const db = mongoose.connection;
db.on('error', (err) => {
    console.error('FAILED TO CONNECT TO DB: ' + err);
});
db.once('open', () => {
    console.log('connected to DB');
});*/

app.use('/', userRouter);

app.listen(3000);