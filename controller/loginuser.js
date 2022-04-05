const winston = require("winston");
const user = require("../helpers/log");
const execute = require("../db/database");
const usernotfound = require("../helpers/error");



class Login {
    static async login(req, res) {

        const { user_email, password } = req.body;

        const result = await execute(`SELECT * FROM users WHERE user_email='${user_email}'`)


        if (result.rowCount == 0) {
            user.error('invalid details')
             throw new usernotfound("invalid credential",404)
            res.status(409).json({
                "payload": [
                    {
                        "Message": "username does not exists please try with different username"
                    }
                ],
                "errors": [],
                "success": false
            });


        }
        else {
            await execute(`SELECT * FROM users where user_email='${user_email}' and Password='${password}'`)


            res.status(200).json({
                "payload": [
                    {
                        "Message": "Login Sucssesful"
                    }
                ],
                "errors": [],
                "success": true
            });
        }

    } catch(error) {
        res.send({
            message: 'error'
        })
        user.error('invalid details')
        throw new usernotfound("invalid credential",404)
    }

}



module.exports = Login;
