// change the database name in db

const pool = require("../db/database");

 class Newarrival{
    static async arrival(req, res){
        try {

            const query1 ="select * from products where createdat < NOW() - INTERVAL '24 HOURS' ";

            const result = await pool.query(query1);

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