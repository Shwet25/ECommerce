const express = require('express');
const pool = require('./database/db'); 

const  routes = require('./routes/index')

const PORT = 3001;
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended : true}))

 

app.use('/',routes)

app.listen(PORT,()=>{
    console.log(`This users app listening at : http://localhost:${PORT}`);
})