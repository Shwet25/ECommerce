const { createLogger, format, transports } = require('winston');


 const user = createLogger({
     transports:[
         
         new transports.File({
             filename:'Logger/error.log',
             level :'error',
             format : format.combine(format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),format.json())

         }) 
     ]
 })

const logger = createLogger(user);
module.exports= user