// TODO add html validation?
module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-wordpress" );

grunt.initConfig({
	wordpress: grunt.file.readJSON( "config.json" ),
	htmllint: {
		out: "out/**/*.html"
	}
});

grunt.registerTask( "build", "Render documents without layout using docpad-render", function() {
	var done = this.async();
	grunt.utils.spawn({
		cmd: "coffee",
		args: [ "export.coffee" ]
	}, function(error, result) {
		if (error) {
			grunt.log.error( error.stdout );
		}
		grunt.log.writeln( "Done: " + result );
		done();
	});
});

grunt.registerTask( "default", "build htmllint" );

};
