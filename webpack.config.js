const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', {
                            pragma: "createElement", // 替换默认的React.createElement
                        }]]
                    }
                }
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        })
    ]
}