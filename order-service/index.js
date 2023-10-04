const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const app = express();


const src=require('./src/rabbitmq')

dotenv.config();

app.use(express.json());
app.set('port', process.env.PORT || 3001);
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const db=require('./db');
// app.use('/api',src)

app.listen(app.get('port'), () => {
console.log(`Server is running on port ${app.get('port')}`);
});

