module.exports = {
    eslint: require('./eslint'),
    npm: require('./npm'),

    objectToSpawnArgs: function(object) {
        function option(prop, value) {
            var params = [];
            if (prop.length === 1) {
                params.push('-' + prop);
                if (value !== true) {
                    params.push(value);
                }
            } else {
                prop.trim().length && params.push('--' + prop);
                if (value !== true) {
                    params.push(value);
                }
            }
            return params;
        }

        var output = [];
        Object.keys(object).sort().forEach(function(prop) {
            var value = object[prop];
            if (value === undefined) { return; }
            value instanceof Array || (value = [value]);

            value.forEach(function(val) {
                output = output.concat(option(prop, val));
            });
        });

        return output;
    }
}