const winston = require("winston");
const user = require("../helpers/log");
const pool = require("../db/database");
const execute = require("../db/database");


class newarrival {
    static async newarrival(req, res) {

        
            try {
            
               const query1 ="select * from product where created > NOW() - INTERVAL '24 HOURS' ";
    
                const result = await execute(query1);
    
                const final = result.rows

            for (let i = 0; i < final.length; i++) {

                final[i].product_image = final[i].product_image.toString();

            }
                if(result.rowCount> 0){
                    res.status(200).json({
                        "payload": [
                            {
                                data : final 
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