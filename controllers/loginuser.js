
const execute = require("../database/db");
const { UserNotFound }= require("../Helpers/error");
const { createToken } = require("../Helpers/jwt");
const Userlogger = require("../helpers/logger");


class Login {
    static async login(req, res , next) {
        try {
            const { useremail, password } = req.body;

            const result = await execute(`SELECT * FROM users WHERE useremail='${useremail}'`);
    
            if (result.rowCount == 0) {
        
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
                const data = {useremail,password};
                const token =  createToken(data);
                
                await execute(`SELECT * FROM users where useremail='${useremail}' and password='${password}'`);
    
                res.status(200).json({
                    "payload": [
                        {
                            "Message": "Login Sucssesful",
                            "token" : token
                        }
                    ],
                    "errors": [],
                    "success": true
                });
            }
            
        } catch(error) {
            next(error);
            Userlogger.error('invalid details');    
        }
    }

 }

module.exports = Login;