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
};

// EXPORTS ==================================================================================================
module.exports = env;
