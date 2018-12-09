const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const env = process.env.BUILD_MODE;

module.exports = {
  mode: env || "development",
  entry: path.join(__dirname, './src', 'main.tsx'),
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
    {
      test: /\.(jpg|png|svg)$/,
      loaders: 'html-loader'
    },
    { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src', 'index.html'),
      filename: "index.html"
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true
  }
};
