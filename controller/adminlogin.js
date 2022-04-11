const winston = require("winston");
const User = require("../helpers/log");
const execute = require("../db/database");
const { usernotmatched, UserNotFound } = require("../helpers/error");

//const { createToken } = require("../helpers/jwt");






class adminlogin {
    static async adminlogin(req, res, next) {
        try {
            const { user_email, password, userrole} = req.body;

            const result = await execute(`SELECT * FROM users WHERE user_email='${user_email}'`);

            if (result.rowCount == 0) {

                const user = new usernotmatched;

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

            }
            else {
                await execute(`SELECT * FROM users where user_email='${user_email}' && password='${password}' && userrole == '${userrole}' `);
                if (userrole == 'Admin') {

                    res.status(200).json({
                        "payload": [
                            {
                                "Message": "Login Sucssesful",

                            }
                        ],
                        "errors": [],
                        "success": true
                    });
                }
                else{
                    const admin = new UserNotFound;
                    User.error(admin.message);
                    res.status(409).json({
                        "payload": [
                            {
                                "Message": admin.message
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
                }

            }

        } catch (error) {
            next(error);
            User.error('invalid details');
        }
    }

}

module.exports = adminlogin;