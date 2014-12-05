var rimraf = require( "rimraf" );

module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-check-modules" );
grunt.loadNpmTasks( "grunt-jquery-content" );

grunt.initConfig({
	"build-pages": {
		all: "pages/**"
	},
	"build-resources": {
		all: "resources/**"
	},
	wordpress: (function() {
		var config = require( "./config" );
		config.dir = "dist/wordpress";
		return config;
	})()
});

grunt.registerTask( "clean", function() {
	rimraf.sync( "dist" );
});

// Inserts markup to put ToC in sidebar
grunt.registerTask( "generate-columns", function() {
	var upgradeGuide = "dist/wordpress/posts/page/upgrade-guide-2.x.html",
		content = grunt.file.read( upgradeGuide )
			.replace( /(<\/script>)/, "$1\n<div class=\"four columns\">" )
			.replace( /(<h2)/, "</div>\n<div class=\"eight columns\">\n$1" );
	grunt.file.write( upgradeGuide, content );
});

grunt.registerTask( "build", [ "build-pages", "generate-columns", "build-resources" ] );
grunt.registerTask( "build-wordpress", [ "check-modules", "clean", "build" ] );

};
