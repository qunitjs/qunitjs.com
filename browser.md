---
layout: page
title: Browser interface
amethyst:
  toc: true
---

<p class="lead" markdown="1">How to use the browser interface. See also [Getting started](./intro.md#in-the-browser).</p>

## Getting started

QUnit releases are standalone and require no runtime dependencies for use in the browser. To get started, create an HTML file that loads the `qunit.js` and `qunit.css` files.

```html
<!DOCTYPE html>
<html>
<meta charset="utf-8">
<title>Test Suite</title>
<link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.19.4.css">
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="https://code.jquery.com/qunit/qunit-2.19.4.js"></script>
  <script src="your_app.test.js"></script>
</body>
</html>
```

This is typically saved as `/test.html` or `/test/index.html` in your project.

The above example loads QUnit from the jQuery CDN. To download it locally, or to use an integration that manages the HTML file for you, see [Integrations & Downloads](./intro.md#integrations).

Let's add the following script, which tests an "add" function, which adds two numbers together:

```html
<script>
function add(a, b) {
  return a + b;
}

QUnit.module('add', function() {
  QUnit.test('two numbers', function(assert) {
    assert.equal(add(1, 2), 3);
  });
});
</script>
```

Open the page in a browser to find a detailed report, or check the live example below ([Open in a new window](./resources/example-index.html){:target="_blank"}):

<iframe loading="lazy" title="Example test suite running in the browser" src="/resources/example-index.html" style="height: 500px;"></iframe>

Congrats! You just executed your first QUnit test!

## Fixture

> By putting it in the #qunit-fixture element, we don’t have to worry about DOM changes from one test affecting other tests, because QUnit will automatically reset the markup after each test.

>  QUnit will reset the elements inside the #qunit-fixture element after each test, removing any events that may have existed. As long as you use elements only within this fixture, you don't have to manually clean up after your tests to keep them atomic. 

id="qunit-fixture"

<https://api.qunitjs.com/config/fixture/>


## Toolbar

* ...

## URL parameters

* [filter](#filter)
* [module](#module)

### filter

Only run tests that match the given filter. The filter is matched against the module and test name, and may either be substring match (case insensitive), or a regular expression.

```
?filter=foo
?filter=!foo
?filter=/foo/
?filter=!/foo/
```

Check [`QUnit.config.filter`](https://api.qunitjs.com/config/filter/) for more information.

### module

Check [`QUnit.config.module`](https://api.qunitjs.com/config/module/) for more information.

https://api.qunitjs.com/config/notrycatch/
