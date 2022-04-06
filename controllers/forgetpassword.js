const execute = require("../database/db");
const { UserNotFound }= require("../Helpers/error");
const Userlogger = require('../Helpers/logger');

class Forget {
    static async forget(req, res,next) {

        try {

            let { useremail, newpassword } = req.body;

            const query = `SELECT * FROM users WHERE useremail='${useremail}'`;
            const result = await execute(query);

            if (result.rowCount == 0) {
              
                const user =  new UserNotFound;
                  
                Userlogger.error(user.message);


                res.status(404).json({
                    "payload": [
                        {
                            "Message": user.message
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
            next(error)
            Userlogger.error("Invalid Credential")

        }

    }
}

module.exports = Forget; 