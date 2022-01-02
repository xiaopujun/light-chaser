const {override, addLessLoader} = require('customize-cra');

module.exports = override(
    addLessLoader({
        strictMath: true,
        noIeCompat: true,
        loader: "less-loader",
        modules: {localIdentName: '[name]_[local]_[hash:base64:5]'},
    }),
)

