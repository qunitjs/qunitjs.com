---
layout: page
title: Getting Started
---

<p class="lead" markdown="1">The following guide will get you up-and-running with QUnit in either [Node](#in-node) or [the Browser](#in-the-browser) in just a few minutes.</p>

## In Node

Getting started with QUnit in Node is quick and easy. First, install QUnit inside your Node package using `npm`:

```bash
npm install --save-dev qunit
```

Or `yarn`:

```bash
yarn add --dev qunit
```

Then, let's start writing tests! We'll start with a function that adds two numbers. Create a file `add.js` with the following contents:

```js
const add = (a, b) => a + b;
module.exports = add;
```

Next, create a file for your test at `test/add.js` and include the following:

```js
const add = require('../add');
QUnit.module('add', function() {
  QUnit.test('should add two numbers', function(assert) {
    assert.equal(add(1, 1), 2, '1 + 1 = 2');
  });
});
```

This defines a test module for the function and then a single test that verifies the result of adding two numbers together.

To run the test, we'll want to add a script to your `package.json` so that you don't need to install QUnit globally (though you can if you prefer):

```json
{
  "scripts": {
    "test": "qunit"
  }
}
```

Then, you can run:

```bash
npm run test
```

And QUnit will print out:

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

Next, you should try writing a test for some of your own code and then check out the [API documentation](https://api.qunitjs.com) or run `qunit --help` to discover more of QUnit's features.

### Support Policy

QUnit follows the <a href="https://github.com/nodejs/LTS" target="_blank">Node Long-term Support (LTS) Schedule</a> and provides support for Current, Active LTS, and Maintenance LTS releases.

### Package Name Prior to 2.4.1

Prior to version 2.4.1, QUnit was published under the package name `qunitjs` on NPM. If you wish to install an older version of QUnit on Node, you will want to use the `qunitjs` package. The `qunit` package prior to version 2.4.1 is an alternative CLI that is now published as `node-qunit`.

---

## In the Browser

When getting started with QUnit in the browser, you have a couple options. You can install files locally from:

* npm: `npm install --save-dev qunit`,
* yarn: `yarn add --dev qunit`, or
* bower: `bower install --save-dev qunit`

Or, you can load the files from the [jQuery CDN](https://code.jquery.com/qunit/) which is hosted by [MaxCDN](https://www.maxcdn.com/). Since it's simpler, we'll load the files from the CDN.

Start by creating a new HTML file called `tests.html` and include the following markup:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Test Suite</title>
    <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.10.1.css">
  </head>
  <body>
    <div id="qunit"></div>
    <div id="qunit-fixture"></div>
    <script src="https://code.jquery.com/qunit/qunit-2.10.1.js"></script>
</body>
</html>
```

That's all the markup you need to start writing tests. Let's add a test for a hypothetical `add` function that adds two numbers together:

```html
<script>
  const add = (a, b) => a + b;
  QUnit.module('add', function() {
    QUnit.test('should add two numbers', function(assert) {
      assert.equal(add(1, 1), 2, '1 + 1 = 2');
    });
  });
</script>
```

This code defines a test module for the `add` function and then a single test verifying the result of adding two numbers.

If you open this up in the browser you'll see the following:

<iframe title="The test code running in the browser" src="../resources/example-index.html" style="height:254px;"></iframe>

A detailed report of the tests that run and their assertions, as well as a bunch of options for filtering and re-running the tests.

Congrats! You just wrote and executed your first QUnit test!

Next, you should try writing a test for some of your own code and then check out the [API documentation](https://api.qunitjs.com) to discover more of QUnit's features.

### Support Policy

QUnit currently supports <a href="https://jquery.com/browser-support/" target="_blank">the same browsers as jQuery 3.x</a>. For legacy browser support, including Internet Explorer versions lower than IE9, please use the 1.x series of QUnit.

---

## Further Reading

* [Introdution to JavaScript Unit Testing](https://coding.smashingmagazine.com/2012/06/introduction-to-javascript-unit-testing/)
