---
layout: page
title: Getting Started
redirect_from:
  - "/cookbook/"
---

<p class="lead" markdown="1">The following guide will get you up-and-running with QUnit either [in Node.js](#in-nodejs) or [in the Browser](#in-the-browser).</p>

## In Node.js

Getting started with QUnit for Node.js projects is quick and easy. First, install the [qunit](https://www.npmjs.com/package/qunit) package using `npm`:

```bash
npm install --save-dev qunit

# Or, if using Yarn:
yarn add --dev qunit
```

Let's create an example program that we can test! We'll start with a function that adds two numbers. Create a file `add.js` with the following contents:

```js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

Now, let's start writing tests! Create a file in a test directory, for example `test/add.js`, and write the following:

```js
const add = require('../add.js');

QUnit.module('add');

QUnit.test('add two numbers', assert => {
  assert.equal(add(1, 1), 2);
});
```

This defines a test suite for the "add" feature, with a single test case that verifies the result of adding two numbers together.

You can now run the test suite through the [QUnit CLI](./cli.md). It is recommended that you run the `qunit` command via an npm script, which will find the `qunit` command automatically from your local dependencies. In your `package.json` file, specify it like so:

```json
{
  "scripts": {
    "test": "qunit"
  }
}
```

Then, simply run:

```bash
npm test
```

And QUnit will run your test!

```bash
TAP version 13
ok 1 add > should add two numbers
1..1
# pass 1
# skip 0
# todo 0
# fail 0
```

Congrats! You just wrote and executed your first QUnit test!

Check out the [API documentation](https://api.qunitjs.com) to learn more about the QUnit APIs for organising tests and making assertions.

See [Command-line interface](./cli.md) for help with the `qunit` command.

### Support policy

QUnit follows the <a href="https://github.com/nodejs/LTS" target="_blank">Node.js Long-term Support (LTS) schedule</a> and provides support for Current, Active LTS, and Maintenance LTS releases.

### Package name prior to 2.4.1

Prior to QUnit 2.4.1, the npm package was published under the name "qunit**js**" instead of "qunit". To install earlier versions of QUnit for Node, check out [qunitjs](https://www.npmjs.com/package/qunitjs).

The 0.x and 1.x versions of the "qunit" package on npm holds an alternative CLI that is now published as [node-qunit](https://github.com/qunitjs/node-qunit).

### Linting

The [eslint-plugin-qunit](https://github.com/platinumazure/eslint-plugin-qunit) package has a variety of rules available for enforcing best testing practices as well as detecting broken tests.

---

## In the Browser

To get started with QUnit in the browser, create a simple HTML file called `test.html` and include the following markup:

```html
<!DOCTYPE html>
<meta charset="utf-8">
<title>Test Suite</title>
<link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.17.1.css">
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="https://code.jquery.com/qunit/qunit-2.17.1.js"></script>
</body>
```

That's all the markup you need to start writing tests. Note that this loads the library from the [jQuery CDN](https://code.jquery.com/qunit/).

See also [Integrations & Downloads](#integrations) for integration you can use to automate browser testing. These usually also manage the HTML file for you.

Let's add the following script, which tests an example `add()` function for adding two numbers together:

```html
<script>
  function add(a, b) {
    return a + b;
  }

  QUnit.module('add', function() {
    QUnit.test('should add two numbers', function(assert) {
      assert.equal(add(1, 1), 2);
    });
  });
</script>
```

This code defines a test module for the `add()` function and verifies the result of adding two numbers.

If you open this up in the browser you'll find a detailed report of the tests that ran and their assertions, as well as various options for filtering and re-running individual tests to help during development. Like so:

<iframe loading="lazy" title="The test code running in the browser" src="/resources/example-index.html" style="height: 300px;"></iframe>

Congrats! You just wrote and executed your first QUnit test!

Check out the [API documentation](https://api.qunitjs.com) to learn more about the QUnit APIs for organising tests and making assertions.

### Browser support

QUnit currently supports the following browsers:

* Internet Explorer: 9+
* Edge: 15+ (both legacy MSEdge and Chromium-based)
* Firefox: 45+
* Safari: 9+
* Opera: 36+
* Chrome: 58+
* Android: 4.3+
* iOS: 7+ (Mobile Safari)

For older browsers, such as Internet Explorer 6-8, Opera 12+, or Safari 5+, please use the 1.x series of QUnit.

### Integrations

The following integrations can be used to automate the running of browser tests with QUnit:

* [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit) for [Grunt task runner](https://gruntjs.com/) (test Headless Chrome).
* [Karma](https://karma-runner.github.io/latest/index.html) with [karma-qunit](https://github.com/karma-runner/karma-qunit) (test any local browser or cloud).
* [node-qunit-puppeteer](https://github.com/ameshkov/node-qunit-puppeteer) (test Headless Chrome).
* [StealJS](https://stealjs.com/) with [steal-qunit](https://stealjs.com/docs/steal-qunit.html) via [Testee](https://www.npmjs.com/package/testee) (test any local browser or cloud).
* [testcafe](https://github.com/DevExpress/testcafe) (test any local browser or cloud).

Example projects:

* [Krinkle/example-node-and-browser-qunit-ci](https://github.com/Krinkle/example-node-and-browser-qunit-ci/): Run QUnit tests locally and in CI, on Headless Firefox and Chrome (using Karma).<br/>
   Also demonstrates code coverage, and testing of isomorphic JavaScript projects on Node.js.

### Release channels

These are the officially supported download channels for QUnit releases:

* Download:

  QUnit has no runtime dependencies for browser use. You can save the [`qunit-2.17.1.js`](https://code.jquery.com/qunit/qunit-2.17.1.js) and [`qunit-2.17.1.css`](https://code.jquery.com/qunit/qunit-2.17.1.css) files directly from the [jQuery CDN](https://code.jquery.com/qunit/), which is hosted by [MaxCDN](https://www.maxcdn.com/).

  Download them from your terminal:

  ```bash
  curl -O 'https://code.jquery.com/qunit/qunit-2.17.1.{js,css}'
  ```

* npm Registry:

  If your development workflow uses [Node.js](https://nodejs.org/en/), you can install the [qunit](https://www.npmjs.com/package/qunit) package the npm Registry, using the `npm` or `yarn` CLI:

  ```bash
  npm install --save-dev qunit

  # Or, if using Yarn:
  yarn add --dev qunit
  ```

  You can then reference `node_modules/qunit/qunit/qunit.js` and `node_modules/qunit/qunit/qunit.css` in your HTML.

  If your project uses a custom npm frontend that locates packages elsewhere, you may need to generate the HTML dynamically and use [`require.resolve()`](https://nodejs.org/api/modules.html#modules_require_resolve_request_options) to locate `qunit/qunit/qunit.js` and `qunit/qunit/qunit.css`. Alternatively, use one of the [Integrations](#integration) such as karma-qunit which do all of that for you.

* Bower:

  Using [Bower](https://bower.io/):

  ```bash
  bower install --save-dev qunit
  ```

  Then reference `bower_components/qunit/qunit/qunit.js` and `bower_components/qunit/qunit/qunit.css` in your HTML.

---

## Further Reading

* [Introdution to JavaScript Unit Testing](https://coding.smashingmagazine.com/2012/06/introduction-to-javascript-unit-testing/), Jörn Zaefferer (2012).
