const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const svgoConfig = require('./svgoConfig');

process.env.NODE_PATH = (process.env.NODE_PATH || '')
	.split(path.delimiter)
	.filter(folder => folder && !path.isAbsolute(folder))
	.map(folder => path.resolve(appDirectory, folder))
	.join(path.delimiter);
// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = '';
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
	throw new Error('Production builds must have NODE_ENV=production.');
}

// Note: defined here because it will be used more than once.
const cssFilename = '[name].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
	? // Making sure that the publicPath goes back to to build folder.
		{ publicPath: Array(cssFilename.split('/').length).join('../dist') }
	: {};

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
	// We generate sourcemaps in production. This is slow but gives good results.
	// You can exclude the *.map files from the build during deployment.
	devtool: 'source-map',
	// In production, we only want to load the polyfills and the app code.
	entry: [require.resolve('./polyfills'), paths.appIndexJs],
	output: {
		// The build folder.
		path: paths.appBuild,
		libraryTarget: 'commonjs2',
		// Generated JS file names (with nested folders).
		// There will be one main bundle, and one file per asynchronous chunk.
		// We don't currently advertise code splitting but Webpack supports it.
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		// We inferred the "public path" (such as / or /my-project) from homepage.
		publicPath: publicPath
		// Point sourcemap entries to original disk location (format as URL on Windows)
		// devtoolModuleFilenameTemplate: info =>
		//   path
		//     .relative(paths.appSrc, info.absoluteResourcePath)
		//     .replace(/\\/g, '/'),
	},
	resolve: {
		// This allows you to set a fallback for where Webpack should look for modules.
		// We placed these paths second because we want `node_modules` to "win"
		// if there are any conflicts. This matches Node resolution mechanism.
		// https://github.com/facebookincubator/create-react-app/issues/253
		modules: ['node_modules', paths.appNodeModules].concat(
			// It is guaranteed to exist because we tweak it in `env.js`
			process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
		),
		// These are the reasonable defaults supported by the Node ecosystem.
		// We also include JSX as a common component filename extension to support
		// some tools, although we do not recommend using it, see:
		// https://github.com/facebookincubator/create-react-app/issues/290
		// `web` extension prefixes have been added for better support
		// for React Native Web.
		extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx']
	},
	module: {
		rules: [
			// TODO: Disable require.ensure as it's not a standard language feature.
			// We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
			// { parser: { requireEnsure: false } },

			// First, run the linter.
			// It's important to do this before Babel processes the JS.
			{
				test: /\.(js|jsx)$/,
				enforce: 'pre',
				use: [
					{
						options: {
							formatter: eslintFormatter
						},
						loader: require.resolve('eslint-loader')
					}
				],
				include: paths.appSrc
			},
			// ** ADDING/UPDATING LOADERS **
			// The "file" loader handles all assets unless explicitly excluded.
			// The `exclude` list *must* be updated with every change to loader extensions.
			// When adding a new loader, you must add its `test`
			// as a new entry in the `exclude` list in the "file" loader.

			// "file" loader makes sure those assets end up in the `build` folder.
			// When you `import` an asset, you get its filename.
			{
				exclude: [
					/\.html$/,
					/\.(js|jsx)$/,
					/\.styl$/,
					/\.css$/,
					/\.json$/,
					/\.bmp$/,
					/\.gif$/,
					/\.jpe?g$/,
					/\.png$/,
					/\.svg$/,
					/\.woff$/
				],
				loader: require.resolve('file-loader'),
				options: {
					name: './assets/[name].[ext]'
					// useRelativePath: true
				}
			},
			// "url" loader works just like "file" loader but it also embeds
			// assets smaller than specified size as data URLs to avoid requests.
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.bg\.svg$/],
				loader: require.resolve('url-loader'),
				options: {
					limit: 50000,
					name: 'assets/[name].[ext]'
				}
			},
			// Process JS with Babel.
			{
				test: /\.(js|jsx)$/,
				include: paths.appSrc,
				loader: require.resolve('babel-loader')
			},

			{
				test: /\.svg$/,
				exclude: [/\.bg\.svg$/],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								["env", {
									"es2015": {
										"modules": false
									},
									"targets": {
										"browsers": ["last 2 versions", "safari >= 7"]
									}
								}],
								"react"
							]
						}
					},
					{
						loader: 'react-svg-loader',
						options: {
							svgo: svgoConfig
						}
					}
				]
			},
			// The notation here is somewhat confusing.
			// "postcss" loader applies autoprefixer to our CSS.
			// "css" loader resolves paths in CSS and adds assets as dependencies.
			// "style" loader normally turns CSS into JS modules injecting <style>,
			// but unlike in development configuration, we do something different.
			// `ExtractTextPlugin` first applies the "postcss" and "css" loaders
			// (second argument), then grabs the result CSS and puts it into a
			// separate file in our build process. This way we actually ship
			// a single CSS file in production instead of JS code injecting <style>
			// tags. If you use code splitting, however, any async bundles will still
			// use the "style" loader inside the async code so CSS from them won't be
			// in the main CSS file.
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					Object.assign(
						{
							fallback: require.resolve('style-loader'),
							use: [
								{
									loader: require.resolve('css-loader'),
									options: {
										importLoaders: 1,
										minimize: true,
										sourceMap: true
									}
								},
								{
									loader: require.resolve('postcss-loader'),
									options: {
										// Necessary for external CSS imports to work
										// https://github.com/facebookincubator/create-react-app/issues/2677
										ident: 'postcss',
										plugins: () => [
											require('postcss-flexbugs-fixes'),
											autoprefixer({
												browsers: [
													'>1%',
													'last 4 versions',
													'Firefox ESR',
													'not ie < 9' // React doesn't support IE8 anyway
												],
												flexbox: 'no-2009'
											})
										]
									}
								}
							]
						},
						extractTextPluginOptions
					)
				)
				// Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
			},

			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract(
					Object.assign(
						{
							fallback: require.resolve('style-loader'),
							use: [
								{
									loader: require.resolve('css-loader'),
									options: {
										importLoaders: 2,
										minimize: true,
										sourceMap: true
									}
								},
								{
									loader: require.resolve('postcss-loader'),
									options: {
										// Necessary for external CSS imports to work
										// https://github.com/facebookincubator/create-react-app/issues/2677
										ident: 'postcss',
										sourceMap: true,
										plugins: () => [
											require('postcss-flexbugs-fixes'),
											autoprefixer({
												browsers: [
													'>1%',
													'last 4 versions',
													'Firefox ESR',
													'not ie < 9' // React doesn't support IE8 anyway
												],
												flexbox: 'no-2009'
											})
										]
									}
								},
								{
									loader: require.resolve('stylus-loader'),
									options: {
										import: require.resolve('../src/styles/common.styl'),
										resolveUrl: true,
										sourceMap: true
									}
								}
							]
						},
						extractTextPluginOptions
					)
				)
				// Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
			},
			// ** STOP ** Are you adding a new loader?
			// Remember to add the new extension(s) to the "file" loader exclusion list.

			{
				test: /\.(woff)$/,
				loader: require.resolve('base64-inline-loader')
			}
		]
	},
	plugins: [
		// Makes some environment variables available to the JS code, for example:
		// if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
		// It is absolutely essential that NODE_ENV was set to production here.
		// Otherwise React will be compiled in the very slow development mode.
		new webpack.DefinePlugin(env.stringified),
		// Minify the code.
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				// Disabled because of an issue with Uglify breaking seemingly valid code:
				// https://github.com/facebookincubator/create-react-app/issues/2376
				// Pending further investigation:
				// https://github.com/mishoo/UglifyJS2/issues/2011
				comparisons: false
			},
			output: {
				comments: false,
				// Turned on because emoji and regex is not minified properly using default
				// https://github.com/facebookincubator/create-react-app/issues/2488
				ascii_only: true
			},
			sourceMap: true
		}),
		// Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
		new ExtractTextPlugin({
			filename: cssFilename
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
	],
	externals: {
		react: 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
	},
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};
