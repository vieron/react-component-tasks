var context = require.context('./', true, /\.test\.jsx?$/);
context.keys().sort().forEach(context);
module.exports = context;