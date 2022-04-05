const execute = require("../database/db");
const Userlogger = require("../Helpers/logger");


class Topselling {
    static async selling(req, res) {
        try {

            const query = "select * from products where ratings >= 3.5 ";

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

                });

            } else {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": "Can't find products where ratings is greter than or equal to 3.5"
                        }
                    ],
                    "errors": [],
                    "success": false
                });
            }
        } catch (error) {
            Userlogger.error("Can't find products")
        }

    }
}

module.exports = Topselling;