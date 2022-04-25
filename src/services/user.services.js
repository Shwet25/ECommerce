"use strict";

// IMPORTS ==================================================================================================
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
 * @param {object} con
 * @returns
 */
const getAllUsers = async (con) => {
	const data = await con.execute(
		`SELECT id, firstName, lastName, email, contact FROM ${USERS} ORDER BY id ASC`,
	);

	return {
		data: data.rows || data,
		message: "All users listed.",
	};
};

/**
 * Add new user - Service
 * @param {object} con
 * @param {object} body
 * @returns
 */
const addUser = async (con, body) => {
	const response = {
		message: "User registered.",
	};

	const { firstName, lastName, contact, password, email } = body;

	// Check for existing email
	if (
		(await con.execute(`SELECT id FROM ${USERS} WHERE email = '${email}'`))
			.rowCount > 0
	)
		throw ER_DATA_ALREADY_EXISTS("email");

	// Insert operation
	const data = await con.execute(
		`INSERT INTO ${USERS} 
		(email, password, firstName${lastName ? ", lastName" : ""}${
			contact ? ", contact" : ""
		}) 
		VALUES ('${email}', '${password}', '${firstName}'${
			lastName ? `, '${lastName}'` : ""
		}${contact ? `, '${contact}'` : ""}) 
		RETURNING id, firstName, lastName, contact, email, blocked`,
	);
	response.data = data.rows || data;

	return response;
};

/**
 * User Login - service
 * @param {object} con
 * @param {object} body
 * @returns
 */
const userLogin = async (con, body) => {
	const response = {
		message: "User has been logged in.",
	};
	const { email, password } = body;

	// Check user if exists.
	let records = await con.execute(
		`SELECT id, password, blocked FROM ${USERS} WHERE email='${email}'`,
	);

	// if records are found then proceed
	if (records.rowCount > 0) {
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
			await con.execute(
				`UPDATE ${USERS} 
				SET token='${token}' 
				WHERE id=${record.id} 
				RETURNING id, firstName, lastName, contact, email, token`,
			)
		).rows[0];

		return response;
	}

	// else error
	throw ER_DATA_NOT_FOUND("user");
};

/**
 * Logout user - service
 * @param {object} con
 * @param {string} id
 * @returns
 */
const userLogout = async (con, id) => {
	const response = {
		message: "User successfully logged out.",
		data: {},
	};

	await con.execute(`UPDATE ${USERS} SET token='' WHERE id=${id}`);
	return response;
};

/**
 * User Update Password - service
 * @param {object} con
 * @param {object} body
 * @returns
 */
const userUpdatePassword = async (con, body) => {
	const response = {
		message: "Password successfully updated.",
	};

	response.data = await con.execute(`
		UPDATE ${USERS}
		SET password = '${body.password}', token = ''
		WHERE email = '${body.email}'
		RETURNING id, firstName, lastName, contact, email
	`);

	if (response.data.rowCount === 0) throw ER_DATA_NOT_FOUND("user");

	return response;
};


/**
 * Update user - Service
 * @param {object} con
 * @param {object} body
 * @returns
 */
 const updateUser = async (con, body) => {
	let response = {
		message: "User Updated.",
	};

	let { firstName, lastName, contact, email } = body;

	// Check for existing email
	let find = await con.execute(`SELECT id,firstName, lastName, contact, email FROM ${USERS} WHERE email = '${email}'`);
	console.log(find.rows[0].lastName); 
	
	if (find.rowCount > 0) {
		if (email == undefined || email == "" || email == null) {
			email = find.rows[0].email;
		}
		if (!firstName) {
			firstName = find.rows[0].firstName;
		};
		if (!lastName) {
			find.rows[0].lastName;
		};	
		if (contact == undefined || contact == "" || contact == null) {
			contact = find.rows[0].contact;
		};

		// Update operation
		let data = await con.execute(
			`update ${USERS} set email='${email}', firstName='${firstName}',lastName='${lastName}',contact='${contact}' 
                                  WHERE email='${email}' RETURNING id, firstName, lastName, contact, email, blocked`,

		);
		
		response.data = data.rows || data;

		return response;
	}
	else {
		throw ER_DATA_NOT_FOUND("user");

	};
};

/**
 * Delete user - service
 * @param {object} con
 * @param {string} id
 * @returns
 */
const deleteUser = async (con, id) => {
	const response = {
		message: "User delete successfully.",
		data: {},
	};
;
	const data = await con.execute(
		`DELETE FROM ${USERS} WHERE id=${id} RETURNING id`,
	);

	response.data = data.rows || data;

	return response;
};

// EXPORTS ==================================================================================================
module.exports = {
	getAllUsers,
	addUser,
	userLogin,
	userLogout,
	userUpdatePassword,
	deleteUser,
	updateUser
};
