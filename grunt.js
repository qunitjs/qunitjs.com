module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-html" );

grunt.initConfig({
	wordpress: grunt.file.readJSON( "config.json" ),
	htmllint: {
		out: "out/*.html"
	},
	lint: {
		grunt: "grunt.js"
	},
	jshint: {
		options: {
			undef: true,
			node: true
		}
	}
});

function scriptHeader( document ) {
	return "<script>{\n" +
		"\t\"title\": \"" + document.attributes.title + "\"\n" +
		"}</script>\n\n";
}

grunt.registerTask( "build", "Render documents without layout using docpad-render", function() {
	var docpadInstance,
		done = this.async(),
		docpad = require( "docpad" ),
		fs = require( "fs" ),
		path = require( "path" ),
		mkdirp = require( "mkdirp" ).sync,
		rimraf = require( "rimraf" ).sync,
		distDir = path.join( __dirname, "dist/page" );


	// Create required directories
	rimraf( distDir );
	mkdirp( distDir );

	// Create DocPad, and wait for it to load
	docpadInstance = docpad.createInstance({}, function( err ) {
		if ( err ) {
			throw err;
		}

		// Generate the website
		docpadInstance.action( "generate", function( err ) {
			if ( err ) {
				throw err;
			}

			// Save all the documents somewhere without their layouts
			docpadInstance.documents.forEach( function( document ) {
				var content = document.get( "contentRenderedWithoutLayouts" ),
					filePath = path.join( distDir, document.get( "relativePath" ) ).replace( /\.eco$/, "" ),
					// Save the file
					result = fs.writeFileSync(filePath, scriptHeader( document ) + content );

				if ( result instanceof Error ) {
					throw result;
				}
			});

			grunt.log.writeln( "Generated" );
			done();
		});
	});
});

grunt.registerTask( "default", "lint" );

};
