const path = require( 'path' )

const DIST = path.join( __dirname, '/dist/' )

module.exports = {
	entry : './src/index.js',
	output : { 
		path : DIST, 
		publicPath : '/', // url prefix for assets, e.g. "/assets/spinner.gif"
		filename : 'main.js' 
	},
	module : {
		rules : [
			{ 
				test : /\.jsx?$/,
			  exclude : /node_modules/,
				use : 'babel-loader'
			},
      { 
        test : /\.scss/,
        use : [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      { 
        test : /\.css/,
        use : [ 'style-loader', 'css-loader' ]
      },
      { 
        test : /\.svg/,
        use : 'svg-loader'
      },
		]
	},
	resolve : {
		extensions : [ '.js', '.json', '.jsx' ]
	},
	devServer : {
    historyApiFallback : true,
    publicPath : '/',
    contentBase : DIST, // the folder to server files from
    watchOptions : {
      aggregateTimeout : 300,
      poll : 1000
    }
  },
}