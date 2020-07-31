---
layout: page
title: 2.x Upgrade Guide
---

## Overview

This guide will assist you in upgrading from QUnit 1.x to QUnit 2.x. All breaking changes are listed below with an explanation of how to upgrade your code to work with QUnit 2.x.

<p class="note" markdown="1">The [qunit-migrate](https://github.com/apsdehal/qunit-migrate) project can help you automate the transition to QUnit 2.x.</p>

Note that almost all the new APIs of QUnit 2.0.0 are already usable in QUnit 1.23.1, allowing you to migrate step-by-step. The only exception is the new module hooks `before` and `after`.

QUnit 2.0.x will include a migration layer that throws descriptive errors for all deprecated methods (`"Global 'test()' method is removed, use 'QUnit.test() instead"`), to help you migrate to the new APIs. QUnit 2.1+ will remove that layer, causing failures that will be more difficult to debug (`"ReferenceError: test is not defined"`).

## Removed globals

QUnit no longer exposes multiple global variables. The only global variable still exposed is `QUnit`. Use [`QUnit.module()`](https://api.qunitjs.com/QUnit.module/) and [`QUnit.test()`](https://api.qunitjs.com/QUnit.test/) to define your test suite, and use the [`assert`](https://api.qunitjs.com/QUnit.assert/) argument in test callbacks to write assertions.

The global `stop()` and `start()` methods are gone, replaced by [`assert.async()`](https://api.qunitjs.com/async/), which returns a callback. Execute this callback when your test is done.

### Replace `module()` with `QUnit.module()`

The global function `module()` is gone. Use [`QUnit.module()`](https://api.qunitjs.com/QUnit.module/) instead.

Before:

```js
module( "router" );
```

After:

```js
QUnit.module( "router" );
```

### Replace `test()` with `QUnit.test()`

The global function `test()` is gone. Use [`QUnit.test()`](https://api.qunitjs.com/QUnit.test/) instead.

Before:

```js
test( "defaults to home" );
```

After:

```js
QUnit.test( "defaults to home" );
```

### Replace `stop()` and `start()` with `assert.async()`

The global functions `stop()` and `start()` are gone. Use [`assert.async()`](https://api.qunitjs.com/async/) instead, which returns a "done" function that should be called when the asynchronous operation has completed.

Before:

```js
QUnit.test( "navigates to new page (async)", function( assert ) {
	stop();
	router.navigate(function( newPage ) {
		assert.equal( newPage.id, 1 );
		start();
	});
});
```

After:

```js
QUnit.test( "navigates to new page (async)", function( assert ) {
	var done = assert.async();
	router.navigate(function( newPage ) {
		assert.equal( newPage.id, 1 );
		done();
	});
});
```

### Replace `asyncTest()` with `QUnit.test()` and `assert.async()`

The global function `asyncTest()` is gone. Use [`QUnit.test()`](https://api.qunitjs.com/QUnit.test/) and [`assert.async()`](https://api.qunitjs.com/async/) instead.

Before:

```js
asyncTest( "navigates to new page (async)", function( assert ) {
	router.navigate(function( newPage ) {
		assert.equal( newPage.id, 1 );
		start();
	});
});
```

After:

```js
QUnit.test( "navigates to new page (async)", function( assert ) {
	var done = assert.async();
	router.navigate(function( newPage ) {
		assert.equal( newPage.id, 1 );
		done();
	});
});
```

### Replace `expect()` with `assert.expect()`

The global function `expect()` is gone. Use [`assert.expect()`](https://api.qunitjs.com/expect/) instead.

Before:

```js
QUnit.test( "refresh (sync)", function( assert ) {
	expect( 1 );
	router.refresh(function( currentPage ) {
		assert.equal( currentPage.id, 2 );
	});
});
```

After:

```js
QUnit.test( "refresh (sync)", function( assert ) {
	assert.expect( 1 );
	router.refresh(function( currentPage ) {
		assert.equal( currentPage.id, 2 );
	});
});
```

### Replace global assertions with `assert` arguments

All global assertions, like `equal()` and `deepEqual()` are gone. Use `assert` instead, like [`assert.equal()`](https://api.qunitjs.com/equal/) or [`assert.deepEqual()`](https://api.qunitjs.com/deepEqual/).

Here are all assertion methods affected by this change in alphabetic order: [`deepEqual()`](https://api.qunitjs.com/deepEqual/), [`equal()`](https://api.qunitjs.com/equal/), [`notDeepEqual()`](https://api.qunitjs.com/notDeepEqual/), [`notEqual()`](https://api.qunitjs.com/notEqual/), [`notPropEqual()`](https://api.qunitjs.com/notPropEqual/), [`notStrictEqual()`](https://api.qunitjs.com/notStrictEqual/), [`ok()`](https://api.qunitjs.com/ok/), [`propEqual()`](https://api.qunitjs.com/propEqual/), [`strictEqual()`](https://api.qunitjs.com/strictEqual/), and [`throws()`](https://api.qunitjs.com/throws/).

Before:

```js
QUnit.test( "static properties", function() {
	ok( router.initialized );
	equal( router.currentPage.id, 3 );
	deepEqual( router.currentPage, {
		id: 3,
		path: "/about"
	});
});
```

After:

```js
QUnit.test( "static properties", function( assert ) {
	assert.ok( router.initialized );
	assert.equal( router.currentPage.id, 3 );
	assert.deepEqual( router.currentPage, {
		id: 3,
		path: "/about"
	});
});
```


## Rename module hooks

The [module hooks](https://api.qunitjs.com/QUnit.module/) `setup` and `teardown` have been renamed to `beforeEach` and `afterEach`, to make it more obvious that they run for each test within a module.

Before:

```js
QUnit.module( "router", {
	setup: function( assert ) {
		this.router = new Router();
	},
	teardown: function( assert ) {
		this.router.destroy();
	}
});
```

After:

```js
QUnit.module( "router", {
	beforeEach: function( assert ) {
		this.router = new Router();
	},
	afterEach: function( assert ) {
		this.router.destroy();
	}
});
```

## Removed and modified QUnit methods and properties

A few methods and properties in the `QUnit` namespace have been modified or removed.

### Replace `QUnit.log = callback` with `QUnit.log( callback )` for all reporting callbacks

For several versions of QUnit before 2.0, custom reporters could be registered by calling the appropriate methods with a callback function. If your code still uses the old approach of overwriting a property on the `QUnit` object, replace that by calling the method instead.

This applies to all reporting callbacks, specifically: [`begin`](https://api.qunitjs.com/QUnit.begin/), [`done`](https://api.qunitjs.com/QUnit.done/), [`log`](https://api.qunitjs.com/QUnit.log/), [`moduleDone`](https://api.qunitjs.com/QUnit.moduleDone/), [`moduleStart`](https://api.qunitjs.com/QUnit.moduleStart/), [`testDone`](https://api.qunitjs.com/QUnit.testDone/), and [`testStart`](https://api.qunitjs.com/QUnit.testStart/).

Before:

```js
QUnit.log = function( results ) {
	console.log( results );
};
```

After:

```js
QUnit.log(function( results ) {
	console.log( results );
});
```

### Replace `QUnit.push()` with `this.pushResult()`

To implement custom assertions, assign functions to [`QUnit.assert`](https://api.qunitjs.com/config/QUnit.assert), inside use [`this.pushResult()`](https://api.qunitjs.com/assert/pushResult), replacing `QUnit.push`. This way, the assertion will be directly related to its test context, preventing asynchronous tests leaking assertions to other tests.

Before:

```js
QUnit.assert.mod2 = function( value, expected, message ) {
    var actual = value % 2;
    QUnit.push( actual === expected, actual, expected, message );
};
```

After:

```js
QUnit.assert.mod2 = function( value, expected, message ) {
    var actual = value % 2;
    this.pushResult( actual === expected, actual, expected, message );
};
```

### Stop using `QUnit.init`, no replacement

This method used to reinitialize the test runner. It should never have been exposed as a public method and is now gone, without replacement. If you've built a setup that requires the use of `QUnit.init`, reach out in our [Gitter room](https://gitter.im/qunitjs/qunit), or contact us in the [issue tracker](https://github.com/qunitjs/qunit/issues) to help find a replacement.

### Stop using `QUnit.reset`, split one test into multiple tests

This method used to give access to QUnit's internal fixture reset. This is now gone, without replacement. If your code is using it, you probably need to split affected tests into multiple tests.

Before:

```js
QUnit.test( "refresh", function( assert ) {
	router.refresh();
	assert.equal( router.currentPage.id, 1 );

	QUnit.reset();

	history.replaceState( "/about" );
	router.refresh();
	assert.equal( router.currentPage.id, 2 );
});
```

After:

```js
QUnit.test( "refresh, default", function( assert ) {
	router.refresh();
	assert.equal( router.currentPage.id, 1 );
});

QUnit.test( "refresh, after replaceState", function( assert ) {
	history.replaceState( "/about" );
	router.refresh();
	assert.equal( router.currentPage.id, 2 );
});
```

### Replace `QUnit.jsDump` with `QUnit.dump`

Originally `jsDump` was a standalone library imported into QUnit. It has since evolved further within the library. To reflect that, the property was renamed to [`QUnit.dump.parse`](https://api.qunitjs.com/QUnit.dump.parse/). This should only affect custom reporter code, not regular testsuites.

Before:

```js
QUnit.log(function( obj ) {
  var actual = QUnit.jsDump.parse( obj.actual );
  var expected = QUnit.jsDump.parse( obj.expected );
  sendMessage( obj.result, actual, expected );
});
```

After:

```js
QUnit.log(function( obj ) {
  var actual = QUnit.dump.parse( obj.actual );
  var expected = QUnit.dump.parse( obj.expected );
  sendMessage( obj.result, actual, expected );
});
```

### Replace expected argument in `QUnit.test`

The optional second `expected` argument that `QUnit.test` used to accept was removed. Call `assert.expect()` instead.

Before:

```js
QUnit.test( "addition", 1, function( assert ) {
    assert.equal( add( 1, 2 ), 3 );
});
```

After:

```js
QUnit.test( "addition", function( assert ) {
    assert.expect( 1 );
    assert.equal( add( 1, 2 ), 3 );
});
```

## Miscellaneous

### Replace `assert.throws( block, string, message )` with `assert.throws( block, regexp, message )`

The overload of `assert.throws()` which expected a block, error string, and assertion message has been removed and will now throw an exception. Use a regular expression instead.

Before:

```js
QUnit.test( "throws", function( assert ) {
	assert.throws( function() {
		throw new Error( "This is an error" );
	}, "This is an error", "An error should have been thrown" );
});
```

After:

```js
QUnit.test( "throws", function( assert ) {
	assert.throws( function() {
		throw new Error( "This is an error" );
	}, /^This is an error$/, "An error should have been thrown" );
});
```

Note that in the two-argument overload `assert.throws( block, string )`, the string argument has always been interpreted as an assertion message instead of an expected value. You do not need to change any of these assertions. Of course, you should use the `assert.throws( block, regexp, message )` form anyway to make your assertions more precise.
