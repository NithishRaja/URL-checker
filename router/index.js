/*
 * File containing all routes
 *
 */

// dependencies
const handler = require("./handler");

// defining router
const router = {
 "ping": handler.ping,
 "notFound": handler.notFound,
 "users": handler.users
}

// Exporting router
module.exports = router;