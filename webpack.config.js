const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const devServer = (isDev) => isDev && {
    devServer: {
        port: 3005,
        hot: true,
        open: true,
        watchFiles: ['./src/*'],
    }
}

module.exports = ({ develop }) => ({
    mode: develop ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash:8].js',
        clean: develop ? false : true
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') }),
        new MiniCssExtractPlugin({ filename: develop ? 'css/style.css' : 'css/[name].[contenthash:8].css' }),
        new Dotenv(),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|svg)$/i,
                type: 'asset',
                generator: {
                    filename: 'img/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    ...devServer(develop)
});