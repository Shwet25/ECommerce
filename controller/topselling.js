const winston = require("winston");
const user = require("../helpers/logger");
const execute = require("../db/database");


class topselling {
    static async topselling(req, res) {

        
            try {
               // const {product_id,product_name,product_image,category,prize,ratings} = req.body;
    
                const query1 ="select * from product  where ratings >= 3.5 ";
    
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
                                "Message": "no product"
                            }
                        ],
                        "errors": [],
                        "success": false
                    })
                }
    
                
            }
             
            catch (error) {
                console.log(error)
                user.error('invalid details')

            }
    
    
        }
    }

module.exports = topselling;