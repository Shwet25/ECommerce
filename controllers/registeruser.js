const execute = require("../database/db");
const { InvalidPassword, PrimaryKeyViolation }= require("../Helpers/error");
const Userlogger = require('../Helpers/logger')


class Controller {
    static async register(req, res, next) {

        try {
            let { userid, useremail, password, userrole } = req.body;

            if (password != null && password.length > 8) {

                const result = await execute(`SELECT * FROM users WHERE useremail='${useremail}'`);

                if (result.rowCount > 0) {

                    const user = new PrimaryKeyViolation();

                    Userlogger.error(user.message);

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

                 const  pass =  new InvalidPassword();
                 Userlogger.error(pass.message);

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
            next(e);

        }
    }

}
module.exports = Controller;