
const execute = require("../db/database");
const { ProductNotFound } = require("../helpers/error");
const winston = require("winston");
const User = require("../helpers/log");


class Carousel{
    static async carousel(req, res) {

        
            try {
            
               const query1 ="select * from product  order by random() limit 5 ";
    
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
                    
                User.error(product.message);
                res.status(404).json({
                    "payload": [
                        {
                            "Message": product.message
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

module.exports = Carousel;