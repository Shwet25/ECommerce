const winston = require("winston");
const execute = require("../db/database");
const { UserNotFound } = require("../helpers/error");

const User = require("../helpers/log");


class Forgot {
    static async forgot(req, res) {

        try {


            const { user_email, password } = req.body;

            const result = await execute(`SELECT * FROM users WHERE user_email='${user_email}'`)

            if (result.rowCount == 0) {
                const user =  new UserNotFound;
                  
                User.error(user.message);
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


            }

            const query1 = `update users set password='${password}' WHERE user_email='${user_email}'`

            await execute(query1);
            

            res.status(200).json({
                "payload": [
                    {
                        "Message": "password updated successfully"
                    }
                ],
                "errors": [],
                "success": true
            });

        }


        catch (error) {
            console.log(error)
            User.error('invalid details')
        }

    }
}

module.exports = Forgot;