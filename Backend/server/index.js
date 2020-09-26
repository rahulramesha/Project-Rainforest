const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const customer = require('./components/customer');
const contact = require('./components/contact');
const seller = require('./components/seller');
const pickupContact = require('./components/pickupContact');
const item = require('./components/item');
const order = require('./components/order');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, './public')));

app.use(customer);
app.use(contact);
app.use(seller);
app.use(pickupContact);
app.use(item);
app.use(order);

app.get('/',(req, res)=>{
    res.send('test');
});

app.listen(PORT, (err) => {
    if(!err) console.log('server listening on port: ' + PORT);
    else console.log('ERROR: '+ err);
});