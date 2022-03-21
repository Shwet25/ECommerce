const { createLogger, format, transports } = require('winston');


 const Userlogger = createLogger({
     transports:[
         new transports.File({
             filename: 'Logger/sucsses.log',
             level : 'info',
             format : format.combine(format.timestamp(),format.json())

         }),
         new transports.File({
             filename:'Logger/error.log',
             level :'error',
             format : format.combine(format.timestamp(),format.json())

         })
     ]
 })

 module.exports = Userlogger