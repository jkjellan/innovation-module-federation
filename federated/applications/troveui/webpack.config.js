const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DashboardPlugin = require("@module-federation/dashboard-plugin");
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const deps = require("./package.json").dependencies;

const IS_DEV = process.env.WEBPACK_MODE !== 'production';
module.exports = {
    target: 'web',
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    publicPath: "http://localhost:8083/",
    path: resolve(__dirname, '..', 'build', 'client'),
    filename: IS_DEV ? '[name]-[hash].js' : '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },

  resolve: {
    modules: ['node_modules', join('src', 'client')],
    extensions: ['.js', '.jsx', '.scss']
  },

  devServer: {
    port: 8083,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
        fullySpecified: false,
        },
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      { test: /\.jsx?$/, use: ['babel-loader'] },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {     
        test: /\.css$/,
        use: ['css-loader',]
      },
      {     
        test: /\.scss$/,
        use: ['sass-loader',]
      },
      {
        test: /\.(eot|png|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "troveui",
      filename: "remoteEntry.js",
      remotes: {
        checkout: "checkout@http://localhost:8082/remoteEntry.js",
        search: "search@http://localhost:8081/remoteEntry.js",
        home: "home@http://localhost:8080/remoteEntry.js",
        //troveui: "troveui@http://localhost:8083/remoteEntry.js",
      },
      exposes: {
        "./Troveui": "./src/client/components/App/App",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new DashboardPlugin({
      dashboardURL: "http://localhost:3000/api/update",
      metadata: {
        source: {
          url: "http://github.com",
        },
        remote: "http://localhost:8082/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      favicon:'src/client/assets/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? '[name].css' : '[name].[hash].css',
      chunkFilename: IS_DEV ? '[id].css' : '[id].[hash].css'
    })
  ],
};
