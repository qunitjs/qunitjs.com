// TODO add html validation?
module.exports = function( grunt ) {

grunt.initConfig({
	render: {
		index: {
			src: "src/documents/index.html.eco",
			dest: "export/index.html"
		},
		cookbook: {
			src: "src/documents/cookbook.html.eco",
			dest: "export/cookbook.html"
		},
		api: {
			src: "src/documents/api.html",
			dest: "export/api.html"
		},
		extensions: {
			src: "src/documents/extensions.html",
			dest: "export/extensions.html"
		}
	}
});

// TODO fix lack of @partials support in docpad-render
// TODO include metadata that wordpress might care about/need
grunt.registerMultiTask( "render", "Render documents without layout using docpad-render", function() {
	var done = this.async(),
		dest = this.file.dest,
		child = grunt.utils.spawn({
		cmd: "docpad",
		args: [ "render", this.file.src.replace(/^(.+?)\./, "x.") ]
	}, function(error, result) {
		if (error) {
			grunt.log.error( error.stdout );
		}
		grunt.file.write( dest, result );
		grunt.log.writeln( "Wrote rendered result to " + dest );
		done();
	});
	child.stdin.end( grunt.file.read( this.file.src ).replace( "layout: default\n", "" ), "utf-8" );
});

grunt.registerTask( "default", "render" );

};
