const winston = require("winston");
const User = require("../helpers/log");
const pool = require("../db/database");
const execute = require("../db/database");
const { ProductNotFound } = require("../helpers/error");


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
                    const prod = new ProductNotFound();
                
                    User.error(prod.message);
    
    
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": prod.message
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
            
                }
    
                
            } catch (error) {
                console.log(error)
                User.error("can't find products");

            }
    
    
        }
    }

module.exports = newarrival;