var fs = require('fs');
var path = require('path');

var utils = {
    getConfigPath: function() {
        var userConf = fs.existsSync(path.join(process.cwd(), '.eslintrc' ));
        var defaultConf = path.join(__dirname, '../.eslintrc' );
        return userConf || defaultConf;
    }
};

module.exports = utils;