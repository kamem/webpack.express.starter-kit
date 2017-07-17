const webpack = require('webpack')
const moment = require('moment')
const path = require('path')

const port = process.env.PORT || 3001

const webpackConfig = {
  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    './src/js/app.js'
  ],
  output: {
    path: path.join(__dirname, '../public/js/'),
    publicPath: `http://localhost:${port}/js/`,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          require('autoprefixer'),
          require('precss')
        ]
      }
    }),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUILD_AT': JSON.stringify(moment().format('YYYY-MM-DD HH:mm:ss'))
    })
  ],
  module: {
    loaders: [
      {
        loaders: [
          'babel-loader'
        ],
        exclude: /node_modules/,
        test: /\.js[x]?$/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  }
}


if(process.env.LINT === 'true') {
  webpackConfig.module.loaders.push(
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'eslint-loader',
      options: {
        fix: true,
        failOnError: true,
      },
    }
  )
}

module.exports = webpackConfig
