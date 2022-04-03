---
layout: page
title: Getting started
amethyst:
  toc: true
redirect_from:
  - "/guides/"
  - "/cookbook/"
---

<p class="lead" markdown="1">This tutorial gets you up-and-running with QUnit, [in Node.js](#in-nodejs) or [in the browser](#in-the-browser).</p>

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

QUnit.test('two numbers', assert => {
  assert.equal(add(1, 2), 3);
});
```

This defines a test suite for the "add" feature, with a single test case that verifies the result of adding two numbers together. Refer to the [`QUnit.test()` page](https://api.qunitjs.com/QUnit/test/) in our API Documentation for how to organise tests and make other assertions.

You can now run your first test through the [QUnit CLI](./cli.md). It is recommended that you run the `qunit` command via an npm script, which will automatically find the `qunit` program in your local `node_modules` folder, which is where npm keeps the dependencies you download. In your `package.json` file, specify it like so:

```json
{
  "scripts": {
    "test": "qunit"
  }
}
```

Then run:

```bash
npm test
```

Congrats! You just wrote and executed your first QUnit test!

```bash
TAP version 13
ok 1 add > two numbers
1..1
# pass 1
# skip 0
# todo 0
# fail 0
```

Check out the [API documentation](https://api.qunitjs.com) to learn more about the QUnit APIs for organising tests and making assertions. See [Command-line interface](./cli.md) for what the `qunit` command can do.

### Support policy

QUnit follows the <a href="https://github.com/nodejs/LTS" target="_blank">Node.js Long-term Support (LTS) schedule</a> and provides support for Current, Active LTS, and Maintenance LTS releases.

### Package name prior to 2.4.1

Prior to QUnit 2.4.1, the npm package was published under the name "qunit**js**" instead of "qunit". To install earlier versions of QUnit for Node, check out [qunitjs](https://www.npmjs.com/package/qunitjs).

The 0.x and 1.x versions of the "qunit" package on npm holds an alternative CLI that is now published as [node-qunit](https://github.com/qunitjs/node-qunit).

### Linting

The [eslint-plugin-qunit](https://github.com/platinumazure/eslint-plugin-qunit) package has a variety of rules available for enforcing best testing practices as well as detecting broken tests.

---

## In the Browser


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
* [testem](https://github.com/testem/testem) (test any local browser, including headless)
* [Karma](https://karma-runner.github.io/latest/index.html) with [karma-qunit](https://github.com/karma-runner/karma-qunit) (test any local browser or cloud).
* [node-qunit-puppeteer](https://github.com/ameshkov/node-qunit-puppeteer) (test Headless Chrome).
* [StealJS](https://stealjs.com/) with [steal-qunit](https://stealjs.com/docs/steal-qunit.html) via [Testee](https://www.npmjs.com/package/testee) (test any local browser or cloud).
* [testcafe](https://github.com/DevExpress/testcafe) (test any local browser or cloud).

Example projects:

* [Krinkle/example-node-and-browser-qunit-ci](https://github.com/Krinkle/example-node-and-browser-qunit-ci/): Run QUnit tests locally and in CI, on Headless Firefox and Chrome (using Karma), and with Node.js.<br/>Also demonstrates code coverage, and testing of isomorphic JavaScript projects.

### Release channels

These are the officially supported download channels for QUnit releases:

* Download:

  QUnit has no runtime dependencies for browser use. You can save the [`qunit-2.19.4.js`](https://code.jquery.com/qunit/qunit-2.19.4.js) and [`qunit-2.19.4.css`](https://code.jquery.com/qunit/qunit-2.19.4.css) files directly from the [jQuery CDN](https://code.jquery.com/qunit/), which is powered by [StackPath](https://www.stackpath.com/).

  Or download them via the terminal:

  ```bash
  curl -o qunit.css 'https://code.jquery.com/qunit/qunit-2.19.4.css'
  curl -o qunit.js 'https://code.jquery.com/qunit/qunit-2.19.4.js'
  ```

* npm Registry:

  If your development workflow uses [Node.js](https://nodejs.org/en/), you can install the [qunit](https://www.npmjs.com/package/qunit) package the npm Registry, using the `npm` CLI:

  ```bash
  npm install --save-dev qunit
  ```

  Or, if using Yarn:
  ```bash
  yarn add --dev qunit
  ```

  You can then reference `node_modules/qunit/qunit/qunit.css` and `node_modules/qunit/qunit/qunit.js` in your HTML.

  If your project uses a custom npm frontend that locates packages elsewhere, you may need to generate the HTML dynamically and use [`require.resolve()`](https://nodejs.org/api/modules.html#modules_require_resolve_request_options) to locate `qunit/qunit/qunit.js` and `qunit/qunit/qunit.css`. Alternatively, use one of the [Integrations](#integrations) such as karma-qunit which do all of that for you.

* Bower:

  Using [Bower](https://bower.io/):

  ```bash
  bower install --save-dev qunit
  ```

  Then reference `bower_components/qunit/qunit/qunit.css` and `bower_components/qunit/qunit/qunit.js` in your HTML.

---

## Further reading

* [Introdution to JavaScript Unit Testing](https://coding.smashingmagazine.com/2012/06/introduction-to-javascript-unit-testing/), Jörn Zaefferer (2012).
