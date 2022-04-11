const express = require('express');
const Usererror = require('./Helpers/error');
const  routes = require('./routes/index');
const swaggerUi = require("swagger-ui-express");
const swaggerDoc=require("./swagger.json")

const PORT =  3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/',routes);

app.use("*",(req , res, next)=>{

	const err = new Usererror(`Requested URL ${req.originalUrl} Not Found!`,404);	
	next(err);
});

app.use((err,req ,res ,next)=>{
	const statusCode = err.statusCode || 404;
	res.status(statusCode).json({
		sucsses : 0 ,
		message : err.message , 
        timestamp : Date.now(),
		stack : err.stack

	})
})

app.listen(PORT,()=>{
    console.log(`This users app listening at : http://localhost:${PORT}`);
})