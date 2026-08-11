const express = require('express');
const app = express();
const router = require('./routes.js');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

app.use('/api/users', router);

app.use('/',(req,res)=>{
    res.json({
        message:"api is up version-1"
    })
})

module.exports = app;