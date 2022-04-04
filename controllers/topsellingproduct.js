const pool = require("../db/database");

 class Topselling{
    static async selling(req, res){
        try {

            const query1 ="select * from products where ratings >= 3.5 ";

            const result = await pool.query(query1);

            console.log(result)
           // const find = result.values(result)

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

module.exports = Topselling;