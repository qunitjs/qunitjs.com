module.exports = function( grunt ) {
"use strict";

grunt.loadNpmTasks( "grunt-clean" );
grunt.loadNpmTasks( "grunt-html" );
grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-jquery-content" );
grunt.loadNpmTasks( "grunt-check-modules" );

grunt.initConfig({
	clean: {
		folder: "dist/"
	},
	htmllint: {
		resources: "resources/*.html",
		page: "pages/*.html"
	},
	jshint: {
		options: {
			undef: true,
			node: true
		}
	},
	lint: {
		grunt: "grunt.js"
	},
	watch: {
		pages: {
			files: "pages/*.html",
			tasks: "deploy"
		}
	},
	"build-pages": {
		all: grunt.file.expandFiles( "pages/*" )
	},
	"build-resources": {
		all: grunt.file.expandFiles( "resources/**" )
	},
	wordpress: grunt.utils._.extend({
		dir: "dist/wordpress"
	}, grunt.file.readJSON( "config.json" ) )
});

// Inserts markup to put ToC in sidebar
grunt.registerTask( "generate-columns", function() {
	var upgradeGuide = "dist/wordpress/posts/page/upgrade-guide-2.x.html",
		content = grunt.file.read( upgradeGuide )
			.replace( /(<\/script>)/, "$1\n<div class=\"four columns\">" )
			.replace( /(<h2)/, "</div>\n<div class=\"eight columns\">\n$1" );
	grunt.file.write( upgradeGuide, content );
});

grunt.registerTask( "default", "lint" );
grunt.registerTask( "build-wordpress", "check-modules clean lint build-pages generate-columns build-resources");

};
