//const { loggers} = require("winston");
//const winston = require("winston");
const pool = require("../db/database");
const { log } = require("../helpers/logger");
const Router = require("../routes");




class Login {
    static async Login(req, res) {
        const { username,password,userrole} = req.body;
        const query1 = `SELECT * FROM users WHERE username='${username}'`
        const find = await pool.query(query1);

        if (find.rowCount == 0) {
            //loggers.error('user does not exists','inavlid details')
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
            const query = `SELECT * FROM users where username='${username}' and Password='${password}'`
             await pool.query(query);

           //loggers.error('info','succesfully Login ')

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
      //loggers.error('user does not exists','inavlid details')
    }

}



module.exports = Login;
