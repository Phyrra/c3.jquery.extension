module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'bower_components/jquery/dist/jquery.min.js',
			'c3.jquery.extension.js',
			'specs/*.js'
		],
		port: 8000,
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