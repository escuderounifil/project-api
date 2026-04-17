const db = require('../config/db');

exports.getAll = (query, params, callback) => {
    db.all(query, params, callback);
};