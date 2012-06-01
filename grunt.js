module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-clean" );
grunt.loadNpmTasks( "grunt-html" );
grunt.loadNpmTasks( "grunt-wordpress" );

grunt.initConfig({
	clean: {
		folder: "dist"
	},
	htmllint: {
		out: "out/*.html",
		resources: "resources/*.html"
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
	wordpress: grunt.utils._.extend({
		dir: "dist/wordpress"
	}, grunt.file.readJSON( "config.json" ) )
});

var // modules
	path = require( "path" ),
	
	// files
	resourceFiles = grunt.file.expandFiles( "resources/*" );

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
		distDir = path.join( __dirname, grunt.config( "wordpress.dir" ), "posts/page" );

	// Create required directories
	grunt.file.mkdir( distDir );

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

grunt.registerTask( "build-resources", function() {
	var task = this,
		taskDone = task.async(),
		targetDir = grunt.config( "wordpress.dir" ) + "/resources/";

	grunt.file.mkdir( targetDir );

	grunt.utils.async.forEachSeries( resourceFiles, function( fileName, fileDone )  {
		grunt.file.copy( fileName, targetDir + path.basename( fileName ) );
		fileDone();
	}, function() {
		if ( task.errorCount ) {
			grunt.warn( "Task \"" + task.name + "\" failed." );
			taskDone();
			return;
		}
		grunt.log.writeln( "Built " + resourceFiles.length + " resources." );
		taskDone();
	});
});

grunt.registerTask( "default", "lint" );
grunt.registerTask( "build-wordpress", "clean lint build build-resources");
grunt.registerTask( "deploy", "wordpress-deploy" );

};
