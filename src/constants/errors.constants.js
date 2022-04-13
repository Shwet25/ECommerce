"use strict";

// METHODS ==================================================================================================
/**
 * Common method for generating a new error.
 * @param {string} code 
 * @param {string} message 
 * @param {number} statusCode 
 * @returns 
 */
const makeError = (code, message, statusCode) => {
    const error = new Error(message);
    error.code = code;
    error.statusCode = statusCode;
    Error.captureStackTrace(error);
    return error;
};

// ERROR DEFINITIONS ========================================================================================
// TYPE CONSTANTS
exports.ER_API_NOT_FOUND = makeError("ER_API_NOT_FOUND", "API you are trying to access, does not exist.", 400);
exports.ER_BAD_REQUEST = makeError("ER_BAD_REQUEST", "Bad request.", 400);

// TYPE METHODS
exports.ER_FIELD_EMPTY = (field) => makeError("ER_FIELD_EMPTY", `"${field}" field cannot be empty.`, 406);
exports.ER_DATA_ALREADY_EXISTS = (field) => makeError("ER_DATA_ALREADY_EXISTS", `This ${field} already exists with us.`, 406)