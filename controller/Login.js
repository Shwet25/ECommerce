const winston = require("winston");
const pool = require("../db/database");
const Router = require("../routes");
const user = require("../helpers/logger");
const execute = require("../db/database");



class Login {
    static async Login(req, res) {
        const { username,password,userrole} = req.body;
       
       const result =  await execute(`SELECT * FROM users WHERE username='${username}'`)
        
        
        if (result.rowCount == 0) {
            user.error('invalid details')
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
            await execute(`SELECT * FROM users where username='${username}' and Password='${password}'`)
             

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

    } catch (error) {
        res.send({
            message:'error'
        })
      user.error('invalid details')
    }

}



module.exports = Login;
