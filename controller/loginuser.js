const winston = require("winston");
const User = require("../helpers/log");
const execute = require("../db/database");
const { UserNotFound } = require("../helpers/error");




class Login {
    static async login(req, res) {

        const { user_email, password } = req.body;

        const result = await execute(`SELECT * FROM users WHERE user_email='${user_email}'`)


        if (result.rowCount == 0) {
            User.error('invalid details')
            const user =  new UserNotFound
               
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
        User.error('user not registered plz try with diiferent Email')
        
    }

}



module.exports = Login;
