---
layout: page
title: Command-line interface
redirect_from:
  - "/node/"
---

<p class="lead" markdown="1">How to use the QUnit CLI (command-line interface), after [installing it from npm](./intro.md#in-nodejs).</p>

## QUnit CLI options

```
Usage: qunit [options] [files]

  Files should be a space-separated list of files, directories, or glob expressions.
  Defaults to 'test/**/*.js'.

Options:
  -V, --version          output the version number
  -f, --filter <filter>  filter which tests run
  -r, --reporter [name]  specify the reporter to use
  --require <module>     specify a module or script include to require before running
  --seed [value]         specify a seed to re-order your tests
  -w, --watch            watch files for changes and re-run the test suite
  -h, --help             display help for command
```

### filter

This option assigns [`QUnit.config.filter`](https://api.qunitjs.com/config/QUnit.config/#qunitconfigfilter-string--default-undefined) for you.

Only tests of which the name matches the filter will run.

The filter can be a full or partial string match, or by using `'/pattern/'` it can be a regular expression.

### reporter

By default, the TAP reporter is used.

Run `qunit --reporter <name>` to use a different reporter, where `<name>` can be the name of a built-in reporter, or an Node module that implements the [js-reporters](https://github.com/js-reporters/js-reporters) spec. The reporter will be loaded and initialised automatically.

Built-in reporters:

* `tap`: [TAP compliant](https://testanything.org/) reporter.
* `console`: Log the JSON object for each reporter event from [`QUnit.on`](https://api.qunitjs.com/callbacks/QUnit.on/). Use this to explore or debug the reporter interface.

## Node.js CLI options

The QUnit CLI uses Node.js. You can pass [Node.js CLI](https://nodejs.org/api/cli.html) options via the [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options) environment variable. For example, to use `--enable-source-maps` or `--inspect`, invoke QUnit as follows:

```
NODE_OPTIONS='--enable-source-maps' qunit test/
```

## QUnit configuration

The `filter` and `seed` options can be configured directly using command-line arguments. These, and many more options, can also be set programmatically. Either from your test suite file (if you have a single entry point), or from a bootstrap file passed to `--require`.

See [QUnit.config](https://api.qunitjs.com/config/QUnit.config/) for the available configuration options.
