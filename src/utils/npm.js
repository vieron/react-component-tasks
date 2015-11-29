var utils = {
    getUnscopedName: function(name) {
        var i = name.indexOf('/');
        if (i === -1) { return name; }
        return name.slice(i + 1);
    },
    getCapitalizedName: function(name) {
        name = utils.getUnscopedName(name);
        return name.charAt(0).toUpperCase() + name.slice(1);
    },

    getTitle: function(pkg) {
        return pkg.name + ' - ' + (pkg.description || '');
    }
};

module.exports = utils;