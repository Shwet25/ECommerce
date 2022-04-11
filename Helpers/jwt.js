const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function createToken(data) {

    return jwt.sign(data, jwtSecretKey, { expiresIn: '1hr' });

}

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


module.exports = { createToken, verifyToken };