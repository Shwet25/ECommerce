const { rows } = require("pg/lib/defaults");
const execute = require("../database/db")
const Userlogger = require('../Helpers/logger')

class Controller { 
    static async register(req, res) {
 
        try {
            let { user_id, user_email, password, userrole } = req.body;

            if (password.length > 8 && password != null) {

            const result = await execute(`SELECT * FROM users WHERE user_email='${user_email}'`)

                if (result.rowCount > 0) {

                    Userlogger.error('user_email already registered plz try with different user_email')

                    res.status(409).json({
                        "payload": [
                            {
                                "Message": "user_email already registered plz try with different user_email"
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

                Userlogger.error('Password Invalid')

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
            Userlogger.error('Error Occurred While Register')
    
        }
    }

}
module.exports = Controller;