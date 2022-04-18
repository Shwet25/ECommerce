"use strict";

// IMPORTS ==================================================================================================
const { execute } = require("../includes/database_connection");
const { USERS } = require("../constants/tables.constants");
const {
	ER_DATA_ALREADY_EXISTS,
	ER_DATA_NOT_FOUND,
	ER_USER_BLOCKED,
} = require("../constants/errors.constants");
const { generateToken } = require("../helpers/jwt");

// SERVICES ==================================================================================================
/**
 * List all users - Service
 * @returns
 */
const getAllUsers = async () => {
	const data = await execute(
		`SELECT id, username, email FROM ${USERS} ORDER BY id ASC`,
	);
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

const userLogin = async (body) => {
	const response = {
		message: "User has been logged in.",
	};
	const { email, password } = body;

	// Check user if exists.
	let records = await execute(
		`SELECT id, password, blocked FROM ${USERS} WHERE email='${email}'`,
	);

	// if records are found then proceed
	if (records.rowCount === 1) {
		const record = records.rows[0];

		// Check if user is blocked
		if (record.blocked) throw ER_USER_BLOCKED;

		// Check password
		if (record.password !== password) {
			//**** ADD ENCRYPTION HERE LATER ON ****
			throw ER_DATA_NOT_FOUND("user");
		}

		// Generate and update token.
		const token = generateToken(record.id);
		response.data = (
			await execute(
				`UPDATE ${USERS} SET token='${token}' WHERE id=${record.id} RETURNING id, username, email, token`,
			)
		).rows[0];

		return response;
	}

	// else error
	throw ER_DATA_NOT_FOUND("user");
};

// EXPORTS ==================================================================================================
module.exports = { getAllUsers, addUser, userLogin };
