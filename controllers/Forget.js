
const execute = require("../database/db");
const logger = require('../Helpers/logger')


class Forget {
    static async forget(req, res) {

        try {

            let { user_email, new_password } = req.body;

            const query = `SELECT * FROM users WHERE user_email='${user_email}'`
            const result = await execute(query)

            if (result.rowCount == 0) {

                logger.error('user does not exist')

                res.status(404).json({
                    "payload": [
                        {
                            "Message": "User Not Found"
                        }
                    ],
                    "errors": [],
                    "success": false
                });


            } else {



                const query1 = `update users set password='${new_password}' 
                                  WHERE user_email='${user_email}'`

                await execute(query1)



                res.status(200).json({
                    "payload": [
                        {
                            "Message": "Password changed"
                        }
                    ],
                    "errors": [],
                    "success": true
                });


            }

        } catch (error) {
            console.log(error)
            logger.error('Employee does not exist')

        }

    }
}

module.exports = Forget; 