const express= require('express');
const app= express();

// routes
const userRoutes= require('./routes/user');
const codeRoutes= require('./routes/code');

// database 
const dbConnect = require('./config/database');
const cors  = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// database connection
dbConnect();


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    },
    credentials: true
}));
app.use(express.static('public'));

 // routes
app.use('/api/v1/code',codeRoutes);
app.use('/api/v1/auth',userRoutes);

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});


app.listen(4000,()=>{
    console.log(`server listening on port: 4000`);
})