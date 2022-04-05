
const execute = require("../database/db");
const Userlogger = require("../helpers/logger");

class Login {
    static async login(req, res) {

        const { useremail, password } = req.body;

        const result = await execute(`SELECT * FROM users WHERE useremail='${useremail}'`);

        if (result.rowCount == 0) {

            Userlogger.error('invalid details')

            res.status(409).json({
                "payload": [
                    {
                        "Message": "user does not exists please try with different email"
                    }
                ],
                "errors": [],
                "success": false
            });

        }
        else {

            await execute(`SELECT * FROM users where useremail='${useremail}' and password='${password}'`);

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

        Userlogger.error('invalid details');

        res.send({
            message: 'error'
        });
       
    }

}



module.exports = Login;