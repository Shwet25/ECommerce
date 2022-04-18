"use strict";

// IMPORTS ==================================================================================================
require("dotenv").config();

// VARIABLE'S STRUCTURE =====================================================================================
const env = {
	serverConfig: {
		port: parseInt(process.env.SERVER_PORT) || 3000,
	},
	databaseConfig: {
		url: process.env.DB_CONNECTION_STRING,
	},
	jwtConfig: {
		jwtSecret: process.env.JWT_SECRET,
		expiresIn: `${(parseInt(process.env.EXPIRES_IN) * 60).toString()}s`,
	},
};

// EXPORTS ==================================================================================================
module.exports = env;
