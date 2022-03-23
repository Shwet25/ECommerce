//const winston = require("winston");
const pool = require("../db/database");

//const logger = require('../logs/logger'); 
class  Forgot {
    static async Forgot(req, res) {
        try {
           
            const { username,password,userrole} = req.body;
       
       const result =  await pool.query(`SELECT * FROM users WHERE username='${username}'`)

            if (result.rowCount == 0) {
                //logger.error('error','inavlid details')
                res.send("user not found")
            } else {

                
                }
                if (password == undefined || password == "" || password == null) {
                    password = find.rows[0].password;
                 }
               

                console.log(username,password);

                const query1= `update password set password='${password}',
                                
                                  WHERE username='${username}'`

               await pool.query(query1);
                            //loggererror('info','succesfully login ')

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
           // logger.error('error','inavlid details')
        }

    }
}

module.exports =Forgot;
