module.exports = {
	presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
	plugins: [
		'@babel/plugin-transform-parameters',
		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-proposal-export-default-from',
		[
			'babel-plugin-root-import',
			{
				paths: [
					{
						rootPathPrefix: '~/',
						rootPathSuffix: 'src'
					},
					{
						rootPathPrefix: 's/',
						rootPathSuffix: 'src/services'
					},
					{
						rootPathPrefix: 'a/',
						rootPathSuffix: 'src/api'
					}
				]
			}
		]
	]
}
