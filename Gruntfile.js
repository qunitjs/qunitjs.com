module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-jquery-content" );

grunt.initConfig({
	"build-posts": {
		page: "pages/**"
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

// Inserts markup to put ToC in sidebar
grunt.registerTask( "generate-columns", function() {
	var upgradeGuide = "dist/wordpress/posts/page/upgrade-guide-2.x.html",
		content = grunt.file.read( upgradeGuide )
			.replace( /(<\/script>)/, "$1\n<div class=\"four columns\">" )
			.replace( /(<h2)/, "</div>\n<div class=\"eight columns\">\n$1" );
	grunt.file.write( upgradeGuide, content );
});

grunt.registerTask( "build", [ "build-posts", "generate-columns", "build-resources" ] );

};
