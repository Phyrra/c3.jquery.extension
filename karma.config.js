module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'bower_components/jquery/dist/jquery.min.js',
			'shim.js',
			'c3.jquery.extension.js',
			'specs/*.js'
		],
		browsers: ['PhantomJS'],
		autoWatch: false,
		reporters: ['progress', 'coverage'],
		preprocessors: {
			'c3.jquery.extension.js': ['coverage']
		},
		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		}
	});
};