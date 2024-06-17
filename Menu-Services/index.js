const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(require('./Menu/Menu'));

app.listen(5000, () => {
    console.log('server on port 5000')
})