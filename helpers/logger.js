const {transports,createLogger} = require('winston')

const users = {
  transports: [
    new transports.File({
      level: 'error',
      filename: 'Helpers/error.log'
    })
  ]
};

const loggers = createLogger(users);
module.exports= loggers