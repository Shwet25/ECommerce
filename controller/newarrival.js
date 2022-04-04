const winston = require("winston");
const user = require("../helpers/logger");
const pool = require("../db/database");
const execute = require("../db/database");


class newarrival {
    static async newarrival(req, res) {

        
            try {
            
               const query1 ="select * from product where created < NOW() - INTERVAL '24 HOURS' ";
    
                const result = await execute(query1);
    
                console.log(result)
                if(result.rowCount> 0){
                    res.status(200).json({
                        "payload": [
                            {
                                data : result.rows
                            }
                        ],
                        "errors": [],
                        "success": true
    
                    })
                }else{
                    user.error('invalid details')
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": "no new arrival in last 24 hours"
                            }
                        ],
                        "errors": [],
                        "success": false
                    })
                }
    
                
            } catch (error) {
                console.log(error)
                user.error('invalid details')
            }
    
    
        }
    }

module.exports = newarrival;