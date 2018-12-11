const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const env = process.env.BUILD_MODE;

module.exports = {
  mode: env || "development",
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js"
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
    },
    {
      test: /\.(jpg|png|svg)$/,
      loaders: 'url-loader'
    },
    { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: "index.html"
    }), 
    new webpack.DefinePlugin({
      "process.env": {
        REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV)
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true
  }
};
