const winston = require("winston");
const User = require("../helpers/log");
const execute = require("../db/database");
const { PrimaryKeyViolation } = require("../helpers/error");
const { verifyToken } = require("../helpers/jwt");
class register { 
    static async register(req, res) {
 
        try {
            let { user_email,  password, userrole,userid } = req.body;

            if ( password.length > 8) {

            const result = await execute(`SELECT * FROM users WHERE user_email='${user_email}'`)

                if (result.rowCount > 0) {

                    user.error('user already registered please try with different email')

                    const user = new PrimaryKeyViolation();

                    User.error(user.message);

                    res.status(409).json({
                        "payload": [
                            {
                                "Message": user.message
                            }
                        ],
                        "errors": [],
                        "success": false
                    });

                } else {

                    await execute(`INSERT INTO users VALUES ('${user_email}','${password}','${userrole}'.'${userid}')`)

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
                const  pass =  new InvalidPassword();
                User.error(pass.message);

               res.status(403).json({
                   "payload": [
                       {
                           "Message": pass.message
                       }
                   ],
                   "errors": [],
                   "success": false
                });
            }


        }

                
        catch (e) {
            User.error('Error Occurred While Register')
    
        }
    }

}
module.exports = register;