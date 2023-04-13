// // webpack.config.js

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = ({ mode } = { mode: "production" }) => {
//     console.log(`mode is: ${mode}`);
//     return {
//             mode,
//             entry: "./src/index.js",
//             output: {
//                 publicPath: "/",
//                 path: path.resolve(__dirname, "build"),
//                 filename: "bundle.js"
//             },
//             resolve: {
//                 extensions:['.js','.css', '.jsx'],
//                 alias: {
//                    utils: path.resolve(__dirname, 'src/utils/'),
//                    contexts: path.resolve(__dirname, 'src/contexts/'),
//                    views: path.resolve(__dirname, 'src/views/'),
//                    layouts: path.resolve(__dirname, 'src/layouts/'),
//                    reduxf: path.resolve(__dirname, 'src/redux/'),
//                    api: path.resolve(__dirname, 'src/api/'),
//                    assets: path.resolve(__dirname, 'src/assets/'),
//                    routes: path.resolve(__dirname, 'src/routes.js/'),
//                    components: path.resolve(__dirname, 'src/components/')
//                 }
//               },
//             module: {
//                 rules: [
//                  {
//                     test: /\.jpe?g|png$/,
//                     exclude: /node_modules/,
//                     use: ["url-loader", "file-loader"]
//                 },
//                 {
//                     test: /\.(js|jsx)$/,
//                     exclude: /node_modules/,
//                     loader: "babel-loader",
//                 },
//                 {
//                     test: /\.css$/,
//                     use: [
//                       'style-loader',
//                       'css-loader'
//                     ]
//                 },
//                 {
//                     test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
//                     exclude: /node_modules/,
//                     use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
//                 }
//                 ]
//             },
//             externals: {
//                 react: 'React'
//             },
//             plugins: [
//                 new HtmlWebpackPlugin({
//                     template: "./public/index.html"
//                 }),
//             ],
//         }
// };
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const dotenv = require('dotenv').config({ path: __dirname + '/.env' })
const isDevelopment = 'production'

module.exports = ({ mode } = { mode: "production" }) => {
    return {
        mode:'none',
        entry: "./src/index.js",
        output: {
            // path: path.join(__dirname, '/dist/'),
            // filename: 'bundle.js',
            // publicPath: "/"
            publicPath: "/",
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js"
        },
        watch: false,
        resolve: {
                    extensions:['.js','.css', '.jsx'],
                    alias: {
                        utils: path.resolve(__dirname, 'src/utils/'),
                        contexts: path.resolve(__dirname, 'src/contexts/'),
                        views: path.resolve(__dirname, 'src/views/'),
                        layouts: path.resolve(__dirname, 'src/layouts/'),
                        reduxf: path.resolve(__dirname, 'src/redux/'),
                        api: path.resolve(__dirname, 'src/api/'),
                        assets: path.resolve(__dirname, 'src/assets/'),
                        routes: path.resolve(__dirname, 'src/routes.js/'),
                        components: path.resolve(__dirname, 'src/components/')
                    }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                publicPath: '/'
                            }
                        },
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name(file) {
                            if (mode === 'development') {
                                return '[path][name].[ext]';
                            }
                            return '[path][hash].[ext]';
                        },
                    },
                },
            ]
        },
        devServer: {
            historyApiFallback: true,
            port: 3000
        },
        performance: {
            hints: false
        },
        plugins: [
            new HtmlWebpackPlugin({
                // title: 'Pixxo',
                template: './public/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: "src/Styles/[name].css",
                chunkFilename: "src/Styles/[id].css"
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(dotenv.parsed),
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
        ],
    }
    
};