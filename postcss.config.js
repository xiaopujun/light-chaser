module.exports = {
    plugins: [
        require('postcss-preset-env')({
            // 配置选项
        }),
        require('cssnano')({
            // 配置选项
        })
    ]
}