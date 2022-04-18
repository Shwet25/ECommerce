"use strict";

// IMPORTS ==================================================================================================
const { ER_UNAUTHENTICATED_USER } = require("../constants/errors.constants");
const { execute } = require("../includes/database_connection");
const { decodeToken } = require("../helpers/jwt");
const { USERS } = require("../constants/tables.constants");
const logger = require("../helpers/logger");

// METHODS ==================================================================================================
/**
 * Authentication middleware function.
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns
 */
const authentication = async (req, res, next) => {
	try {
		let token = req.headers.authorization.replace("Bearer ", "");
		const dToken = decodeToken(token);

		// If token is decoded then it will have id. Else it will throw error
		if (dToken.id) {
			const records = await execute(
				`SELECT id FROM ${USERS} WHERE token='${token}'`,
			);
			if (records.rowCount === 1) {
				req._id = records.rows[0].id;
				return next();
			}
		}

		// If the code comes here then there is some issue in decoding token. Hence, user is not authenticated.
		throw ER_UNAUTHENTICATED_USER;
	} catch (error) {
		// If there is any error then user is not authenticated.
		logger.error(ER_UNAUTHENTICATED_USER.code);
		res.status(ER_UNAUTHENTICATED_USER.statusCode).send({
			errorCode: ER_UNAUTHENTICATED_USER.code,
			statusCode: ER_UNAUTHENTICATED_USER.statusCode,
			message: ER_UNAUTHENTICATED_USER.message,
			data: {},
		});
	}
};

// EXPORTS ==================================================================================================
module.exports = authentication;
