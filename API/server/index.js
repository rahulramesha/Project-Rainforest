const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const components = require('./components')

const PORT = process.env.PORT || 3000;

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

for(const component of components) {
    app.use('/api',component);
}

app.get('/',(req, res)=>{
    res.send('test');
});

app.listen(PORT, () => {
    isBuilt = true;
    console.log(
        `API server is up`
    );
});