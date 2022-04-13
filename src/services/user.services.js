"use strict";

// IMPORTS ==================================================================================================
const { execute } = require("../includes/database_connection");
const { USERS } = require("../constants/tables.constants");
const { ER_DATA_ALREADY_EXISTS } = require("../constants/errors.constants");

// SERVICES ==================================================================================================
/**
 * List all users - Service
 * @returns
 */
const getAllUsers = async () => {
	const data = await execute(`SELECT id, username, email FROM ${USERS}`);
	return {
		data: data.rows || data,
		message: "All users listed.",
	};
};

/**
 * Add new user - Service
 * @param {object} body
 * @returns
 */
const addUser = async (body) => {
	const response = {
		message: "All users listed.",
	};

	const { username, password, email } = body;

	// Check for existing username or email
	const check = await execute(
		`SELECT email, username FROM ${USERS} WHERE email = '${email}' OR username = '${username}'`,
	);
	if (check.rowCount > 0) {
		const checkData = check.rows[0];
		if (checkData.username === username)
			throw ER_DATA_ALREADY_EXISTS("username");
		if (checkData.email === email) throw ER_DATA_ALREADY_EXISTS("email");
	}

	// Insert operation
	const data = await execute(
		`INSERT INTO ${USERS} (username, password, email) VALUES ('${username}', '${password}', '${email}') RETURNING id, username, email, blocked`,
	);
	response.data = data.rows || data;

	return response;
};

// EXPORTS ==================================================================================================
module.exports = { getAllUsers, addUser };
