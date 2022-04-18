"use strict";

// IMPORTS ==================================================================================================
const { userService } = require("../services");
const { ER_FIELD_EMPTY } = require("../constants/errors.constants");

// CONTROLLERS ==============================================================================================
/**
 * List all users - controller
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const getAllUsers = async (req, res, next) => {
	try {
		const response = await userService.getAllUsers();
		res.send(response);
	} catch (error) {
		next(error);
	}
};

/**
 * Add new user - controller
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const addUser = async (req, res, next) => {
	try {
		// Validations
		if (!req.body.username) throw ER_FIELD_EMPTY("username");
		if (!req.body.email) throw ER_FIELD_EMPTY("email");
		if (!req.body.password) throw ER_FIELD_EMPTY("password");

		const response = await userService.addUser(req.body);
		res.send(response);
	} catch (error) {
		next(error);
	}
};

/**
 * Add new user - controller
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const userLogin = async (req, res, next) => {
	try {
		// Validations
		if (!req.body.email) throw ER_FIELD_EMPTY("email");
		if (!req.body.password) throw ER_FIELD_EMPTY("password");

		const response = await userService.userLogin(req.body);
		res.send(response);
	} catch (error) {
		next(error);
	}
};

// EXPORTS ==================================================================================================
module.exports = {
	getAllUsers,
	addUser,
	userLogin,
};
