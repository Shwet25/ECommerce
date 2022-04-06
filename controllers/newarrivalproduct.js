const execute = require("../database/db");
const { ProductNotFound } = require("../Helpers/error");
const Userlogger = require("../Helpers/logger");

class Newarrival {
    static async arrival(req, res, next) {
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

                const prod = new ProductNotFound();
                
                Userlogger.error(prod.message);


                res.status(404).json({
                    "payload": [
                        {
                            "Message": prod.message
                        }
                    ],
                    "errors": [],
                    "success": false
                })
            }


        } catch (error) {
            Userlogger.error("Can't find new products");
            next(error);
        }

    }
}

module.exports = Newarrival;