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
		docpad = require( 'docpad' ),
		fs = require( 'fs' ),
		path = require( 'path' ),
		mkdirp = require('mkdirp').sync,
		config = {
			outNoLayoutsPath: path.join( __dirname, 'dist/page' )
		};

	// Create required directories
	mkdirp(config.outNoLayoutsPath + '/static');

	// Create DocPad, and wait for it to load
	docpadInstance = docpad.createInstance(config, function( err ) {
		if ( err ) {
			throw err;
		}

		// Generate the website
		docpadInstance.action( 'generate', function( err ) {
			if ( err ) {
				throw err;
			}

			// Save all the documents somewhere without their layouts
			docpadInstance.documents.forEach( function( document ) {
				// Prepare
				var contentRenderedWithoutLayouts = document.get('contentRenderedWithoutLayouts'),
					outNoLayoutsPath = path.join(config.outNoLayoutsPath, document.get('relativePath')).replace(/\.eco$/, ''),
					// Save the file
					result = fs.writeFileSync(outNoLayoutsPath, scriptHeader( document ) + contentRenderedWithoutLayouts);

				if ( result instanceof Error ) {
					throw result;
				}
			});

			grunt.log.writeln( 'Generated' );
			done();
		});
	});
});

grunt.registerTask( "default", "lint" );

};
