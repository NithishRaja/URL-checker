/*
 * File containing all routes
 *
 */

// dependencies
const handler = require("./handler");

// defining router
const router = {
 "ping": handler.ping,
 "notFound": handler.notFound
}

// Exporting router
module.exports = router;
