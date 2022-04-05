const { createLogger, format, transports } = require('winston');


 const Userlogger = createLogger({ 
     transports:[
         
         new transports.File({
             filename:'Logs/error.log',
             level :'error',
             format : format.combine(format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),format.json())

         }) 
     ]
 })

 module.exports = Userlogger