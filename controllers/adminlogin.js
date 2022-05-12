
const execute = require("../database/db");
const { UserNotFound , AdminNotFound} = require("../Helpers/error");
const Userlogger = require("../helpers/logger");


class Admin {
    static async admin(req, res, next) {
        try {
            const { useremail, password, userrole} = req.body;

            const result = await execute(`SELECT * FROM users WHERE useremail='${useremail}'`);

            if (result.rowCount == 0) {

                const user = new UserNotFound;

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

            }
            else {
                await execute(`SELECT * FROM users where useremail='${useremail}' && password='${password}' && userrole == '${userrole}' `);
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
                    const admin = new AdminNotFound;
                    Userlogger.error(admin.message);
                    res.status(400).json({
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
            Userlogger.error('invalid details');
        }
    }

}

module.exports = Admin;