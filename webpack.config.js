var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './server/public/app'),
    publicPath: '',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
          test: require.resolve('snapsvg'),
          loader: 'imports-loader?this=>window,fix=>module.exports=0'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader',
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        },
      },
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //       fallback: 'style-loader',
      //       use: 'css-loader!sass-loader'
      //   })
      // }
    ]
  },
  plugins: [
      //new ExtractTextPlugin('styles-[name].css'),
      new webpack.DefinePlugin({
          "typeof window": "\"object\""
      }),
      new webpack.ProvidePlugin({
          $: "jquery/dist/jquery.min.js",
          jQuery: "jquery/dist/jquery.min.js",
          "window.jQuery": "jquery/dist/jquery.min.js"
      })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
