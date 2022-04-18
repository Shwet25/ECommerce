const express = require('express');

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const  routes = require('./routes/router')

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.use('/',routes)

app.listen(PORT,()=>{
    console.log(`Ecommerce api are listening at  : http://localhost:${PORT}`);
})
