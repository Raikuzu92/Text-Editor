const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      delete: "./src/js/delete.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Webpack plugin that generates the html file and injects the bundles.
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Vacation is all I've ever wanted!",
        favicon: "./favicon.ico",
      }),
      // Injects the custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "The adventures of Jamaica",
        short_name: "Vacation how to get away",
        description: "That was the best trip I have ever had the rum was so strong",
        favicon: "./favicon.ico",
        // Theme and background color pulled from duotone-light.min.css
        background_color: "#faf8f5",
        theme_color: "#b29762",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logoNew.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
// TODO: Add CSS loaders and babel to webpack.
module: {
  rules: [
    // CSS loader
    // Reminder- An 'i' after a regular expression specifies
    // that the test requires a case-insensitive match
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    // Image loader
    // {
    //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
    //   type: "asset/resource",
    // },
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      // Babel-loader in order to use ES6.
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/transform-runtime",
          ],
        },
      },
    },
  ],
},
};
};

// module.exports = () => {
//   return {
//     mode: 'development',
//     entry: {
//       main: './src/js/index.js',
//       install: './src/js/install.js'
//     },
//     output: {
//       filename: '[name].bundle.js',
//       path: path.resolve(__dirname, 'dist'),
//     },
//     plugins: [
      
//     ],

//     module: {
//       rules: [
        
//       ],
//     },
//   };
// };
