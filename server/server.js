const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes= require('./routes/user');
const codeRoutes= require('./routes/code');

const cookie_parser = require('cookie-parser');
const CLIENT_URL = process.env.CLIENT_URL;

const {app,server} = require('./socket');

const dbConnect = require('./config/database');

const auth = require('./middlewares/auth');


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(cookie_parser());   

 // routes


app.use('/api/v1/code',auth,codeRoutes);
app.use('/api/v1/auth',userRoutes);


server.listen(4000,()=>{
    dbConnect();
    console.log(`server listening on port: 4000`);
})