const winston = require("winston");
const user = require("../helpers/log");
const execute = require("../db/database");


class topselling {
    static async topselling(req, res) {

        
            try {
              

                const query1 ="select * from product  where ratings >= 3.5 ";
    
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
                    user.error('no product has greater then 3.5 ratings')

                    res.status(404).json({
                        "payload": [
                            {
                                "Message": "no product has greater then 3.5 ratings"
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