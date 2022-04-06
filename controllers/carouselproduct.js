const execute = require("../database/db");
const { ProductNotFound } = require("../Helpers/error");
const Userlogger = require("../Helpers/logger");


class Carousel {
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
                const product = new ProductNotFound();

                Userlogger.error(product.message);
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
            Userlogger.error("Can't find products");
            next(error);
        }

    }
}

module.exports = Carousel;