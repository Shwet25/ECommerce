const execute = require("../database/db");
const Userlogger = require("../Helpers/logger");

class Newarrival {
    static async arrival(req, res) {
        try {

            const query = "select * from products where createdat > NOW() - INTERVAL '24 HOURS' ";

            const result = await execute(query);

            const final = result.rows;

            for (let i = 0; i < final.length; i++) {

                final[i].productimage = final[i].productimage.toString();

            }

            if (result.rowCount > 0) {
                res.status(200).json({
                    "payload": [
                        {
                            data: final
                        }
                    ],
                    "errors": [],
                    "success": true

                })
            } else {

                Userlogger.error("Can't find new products");
                res.status(404).json({
                    "payload": [
                        {
                            "Message": "Can't find new products"
                        }
                    ],
                    "errors": [],
                    "success": false
                })
            }


        } catch (error) {
            Userlogger.error("Can't find new products");
        }

    }
}

module.exports = Newarrival;