'use strict';

var path = require('path');
var QueryFile = require('pg-promise').QueryFile;

function sql(file) {
    return new QueryFile(path.join(__dirname, file), {minify: true});
}

module.exports = {
    loadSchema: sql('loadSchema.sql'),
    createDatabase: sql('createDatabase.sql'),
    findDatabase: sql('findDatabase.sql'),
    createUser: sql('createUser.sql')
};
