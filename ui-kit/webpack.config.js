const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtactPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        bundle: './index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtactPlugin({
            filename: '[name].[contenthash].css'
        }),
        new ModuleFederationPlugin({
            name: 'uikit',
            library: { type: 'var', name: 'uikit' },
            filename: 'remoteEntry.js',
            exposes: {
                './Button': './components/Button',
                './ButtonStyles': './styles/Button.scss'
            },
            shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
        }),
    ],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@styles': path.resolve(__dirname, 'src/styles')
        },
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCSSExtactPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8002,
        watchContentBase: true,
        progress: true
    },
};