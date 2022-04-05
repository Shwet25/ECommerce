
const execute = require("../db/database");


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
                    user.error('product display')
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": "product display"
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

module.exports = Carousel;