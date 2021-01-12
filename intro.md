---
layout: page
title: Getting Started
redirect_from:
  - "/cookbook/"
---

<p class="lead" markdown="1">The following guide will get you up-and-running with QUnit either [in Node](#in-node) or [in the Browser](#in-the-browser) in just a few minutes.</p>

## In Node

Getting started with QUnit in Node is quick and easy. First, install the [qunit](https://www.npmjs.com/package/qunit) package using `npm`:

```bash
npm install --save-dev qunit

# Or, if using Yarn:
yarn add --dev qunit
```

Let's create a basic example program that we can test! We'll start with a function that adds two numbers. Create a file `add.js` with the following contents:

```js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

Now, let's start writing tests! Create a file in a test directory, like `test/add.js`, and include the following:

```js
const add = require('../add.js');

QUnit.module('add');

QUnit.test('add two numbers', assert => {
  assert.equal(add(1, 1), 2, '1 + 1 = 2');
});
```

This defines a test suite for the "add" function and then a single test that verifies the result of adding two numbers together.

To run the test, make sure the `test` script is defined in your `package.json` file. This makes QUnit and other tools easy to run as a dev dependency, without having to install them install QUnit globally:

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

Check out the [API documentation](https://api.qunitjs.com) to learn more about the QUnit API for organising tests and making assertions.

See [Command-line interface](./cli.md) for how the `qunit` command works.

### Support Policy

QUnit follows the <a href="https://github.com/nodejs/LTS" target="_blank">Node Long-term Support (LTS) Schedule</a> and provides support for Current, Active LTS, and Maintenance LTS releases.

### Package name prior to 2.4.1

Prior to QUnit 2.4.1, the npm package was published under the name "qunit**js**" instead of "qunit". To install earlier versions of QUnit for Node, check out [qunitjs](https://www.npmjs.com/package/qunitjs).

The 0.x and 1.x versions of the "qunit" package on npm holds an alternative CLI that is now published as [node-qunit](https://github.com/qunitjs/node-qunit).

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
    <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.14.0.css">
  </head>
  <body>
    <div id="qunit"></div>
    <div id="qunit-fixture"></div>
    <script src="https://code.jquery.com/qunit/qunit-2.14.0.js"></script>
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

<iframe loading="lazy" title="The test code running in the browser" src="/resources/example-index.html" style="height:254px;"></iframe>

A detailed report of the tests that run and their assertions, as well as a bunch of options for filtering and re-running the tests.

Congrats! You just wrote and executed your first QUnit test!

Next, you should try writing a test for some of your own code and then check out the [API documentation](https://api.qunitjs.com) to discover more of QUnit's features.

### Support Policy

QUnit currently supports <a href="https://jquery.com/browser-support/" target="_blank">the same browsers as jQuery 3.x</a>. For legacy browser support, including Internet Explorer versions lower than IE9, please use the 1.x series of QUnit.

---

## Further Reading

* [Introdution to JavaScript Unit Testing](https://coding.smashingmagazine.com/2012/06/introduction-to-javascript-unit-testing/), Jörn Zaefferer (2012).
