const winston = require("winston");
const user = require("../helpers/log");
const execute = require("../db/database");
class register { 
    static async register(req, res) {
 
        try {
            let { user_id, user_email, password, userrole } = req.body;

            if (password != null && password.length > 8) {

            const result = await execute(`SELECT * FROM users WHERE user_email='${user_email}'`)

                if (result.rowCount > 0) {

                    user.error('user already registered please try with different email')

                    res.status(409).json({
                        "payload": [
                            {
                                "Message": "user already registered please try with different email"
                            }
                        ],
                        "errors": [],
                        "success": false
                    })


                } else {

                    await execute(`INSERT INTO users VALUES ('${user_id}','${user_email}','${password}','${userrole}')`)

                    res.status(200).json({
                        "payload": [
                            {
                                "Message": "User Added"
                            }
                        ],
                        "errors": [],
                        "success": true

                    })


                }
            } else {

                user.error('Password Invalid')

                res.status(403).json({
                    "payload": [
                        {
                            "Message": "password is invalid"
                        }
                    ],
                    "errors": [],
                    "success": false
                });
            }


        }
        catch (e) {
            user.error('Error Occurred While Register')
    
        }
    }

}
module.exports = register;