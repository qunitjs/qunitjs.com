# Website for QUnit, built with [DocPad](https://github.com/bevry/docpad)


## Usage

* [Install DocPad](https://github.com/bevry/docpad), needs a 'global' install
* `docpad run`
* [Open http://localhost:9778/](http://localhost:9778/)
* Edit files in src directory

## Export to WordPress

* [Install Grunt](https://github.com/cowboy/grunt), usually `npm install grunt -g` is enough
* Make a copy of config-sample.json, rename to config.json
* Update config.json to point to local WordPress site
* Run `grunt wordpress-publish`