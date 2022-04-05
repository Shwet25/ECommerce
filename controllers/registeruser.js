const execute = require("../database/db")
const Userlogger = require('../Helpers/logger')

class Controller { 
    static async register(req, res) {
 
        try {
            let { userid, useremail, password, userrole } = req.body;

            if (password != null && password.length > 8) {

            const result = await execute(`SELECT * FROM users WHERE UserEmail='${useremail}'`);

                if (result.rowCount > 0) {

                    Userlogger.error('user already registered please try with different email');

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

                    await execute(`INSERT INTO users VALUES ('${userid}','${useremail}','${password}','${userrole}')`);

                    res.status(200).json({
                        "payload": [
                            {
                                "Message": "User Added"
                            }
                        ],
                        "errors": [],
                        "success": true

                    });

                }
            } else {

                Userlogger.error('Password Invalid');

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
            Userlogger.error('Error Occurred While Register');
    
        }
    }

}
module.exports = Controller;