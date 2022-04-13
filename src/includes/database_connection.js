"use strict";

// IMPORTS ==================================================================================================
const { Client } = require("pg");
const { databaseConfig } = require("../../config");

// Connection
const client = new Client({
    connectionString: databaseConfig.url,
});

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

/**
 * Common method for query execution.
 * @param {string} query 
 * @returns 
 */
exports.execute = async (query) => await client.query(query);