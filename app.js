const express = require('express');
const pool = require('./db/database');

const  routes = require('./routes/router')

const PORT = 2425;
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.use('/',routes)

app.listen(PORT,()=>{
    console.log(`Ecommerce api is listening at  : http://localhost:${PORT}`);
})