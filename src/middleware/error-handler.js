var log = require("logia")("MD::ERROR-HANDLER");
module.exports = function handleError(error, request, response, next) {
    log.error(error.message);
    response.status(500).json(error);
};