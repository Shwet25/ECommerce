const execute = require("../database/db");
const Apperror = require("../Helpers/error");
const Userlogger = require("../Helpers/logger");


class Carousel{
    static async carousel(req, res, next) {
        try {

            const query = "select * from products ORDER BY RANDOM() LIMIT 5 ";

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
                Userlogger.error("Can't find products where rating is greater than or equal to 3.5");

                //throw new Apperror("Can't find products where rating is greater than or equal to 3.5",404);

                res.status(404).json({
                    "payload": [
                        {
                            "Message": "Somethng wrong"
                        }
                    ],
                    "errors": [],
                    "success": false
                });
            }
        } catch (error) {
            Userlogger.error("Can't find products");
            next(error);
        }

    }
}

module.exports = Carousel;