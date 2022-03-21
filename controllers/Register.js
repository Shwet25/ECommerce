
const { rows } = require("pg/lib/defaults");
const pool = require("../database/db")
const logger = require('../logger')

class Controller{
    static async register(req , res){

        try {
            let {username,password,userrole}=req.body;

            const query = `INSERT INTO users VALUES ('${username}','${password}','${userrole}')`
            const find = await pool.query(query)

            if (find.rowCount>0) {

                logger.Userlogger.log('info','User Added..')

                res.status(200).json({
                    "payload": [
                        {
                            "Message": "User Added"
                        }
                    ],
                    "errors": [],
                    "success": true

                })

            } else {
               // logger.Userlogger.log('error','Invalid credential')

                res.status(403).json({
                    "payload": [
                        {
                            "Message": "Invalid credential"
                        }
                    ],
                    "errors": [],
                    "success": false
                });
            }
                                               
        } catch (error) {
            //logger.Userlogger.log('error','Password Invalid')

        
        }
    } 

}
module.exports= Controller;