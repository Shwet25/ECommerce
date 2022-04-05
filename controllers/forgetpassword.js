const execute = require("../database/db");
const Userlogger = require('../Helpers/logger');


class Forget {
    static async forget(req, res) {

        try {

            let { useremail, newpassword } = req.body;

            const query = `SELECT * FROM users WHERE useremail='${useremail}'`;
            const result = await execute(query);

            if (result.rowCount == 0) {

                Userlogger.error('user does not exist');

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

                const query1 = `update users set password='${newpassword}' WHERE useremail='${useremail}'`

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
            
            Userlogger.error("Invalid Credential")

        }

    }
}

module.exports = Forget; 