const execute = require("../database/db");

class Newarrival{
    static async arrival(req, res){
        try {

            const query ="select * from products where createdat < NOW() - INTERVAL '24 HOURS' ";

            const result = await execute(query);

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
                res.status(404).json({
                    "payload": [
                        {
                            "Message": "Can't find products"
                        }
                    ],
                    "errors": [],
                    "success": false
                })
            }

            
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = Newarrival;