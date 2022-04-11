const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const jwtSecretKey = process.env.JWT_SECRET_KEY;
dotenv.config();

//create token function
function createToken(data){    
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

        return jwt.sign(data , jwtSecretKey,{ expiresIn: '1hr' });
    
}

//validate token function
function verifyToken(req, res, next) {
   

    try {
        const token = req.headers['token'];
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            next();

        } else {
            res.status(401).json({
                "payload": [
                    {
                        "Message": error
                    }
                ],
                "errors": [],
                "success": false
            });

        }
    } catch (error) {
        res.status(401).json({
            "payload": [
                {
                    error
                }
            ],
            "errors": [],
            "success": false
        });
    }
}

module.exports={createToken,verifyToken};