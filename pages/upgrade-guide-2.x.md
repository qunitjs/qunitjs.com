<script>{
	"title": "QUnit 2.x Upgrade Guide",
	"toc": true
}</script>

## Overview

This guide will assist in upgrading from QUnit 1.x to QUnit 2.x. All breaking changes are listed below, along with how to upgrade your code to work with QUnit 2.x.

Note that all the new APIs of QUnit 2.0 are already usable in QUnit 1.16, allowing you to migrate step by step. QUnit 2.0 will include a migration layer that throws descriptive errors for all deprecated methods (<code>"Global 'test()' method is removed, use 'QUnit.test() instead"</code>), to help you migrate to the new APIs. QUnit 2.1+ will remove that layer, causing failures that will be more difficult to debug (<code>"ReferenceError: test is not defined"</code>).

### Only one global variable

QUnit no longer exposes global variables for all of its API. The only global variable still exposed is `QUnit`. Use `QUnit.module()` and `QUnit.test()` to define your testsuite, use the `assert` argument in test callbacks to write assertions.

### Better async flow control

The global `stop()` and `start()` methods are gone, replaced by `assert.async()`, which returns a callback. Execute this callback when your test is done.

### Better reporter integration

QUnit used to support registering callbacks by assigning to `QUnit.done` and other properties. This is replaced by calling `QUnit.done( callback )`. This style allows multiple reporters to register at the same time.

### Renamed module hooks

Renamed module's `setup` and `teardown` hooks to `beforeEach` and `afterEach`, moved `QUnit.push()` to `assert.push()`.

### Implement custom assertions with `this.push()`

To implement custom assertions, assign functions to `QUnit.assert`, inside use `this.push()`, replacing `QUnit.push`.

### Removed test runner control methods

Two methods that have been deprecated for a long time are finally gone, `QUnit.init` and `QUnit.reset`.

### Renamed `QUnit.jsDump` to `QUnit.dump`

Originally `jsDump` was a standalone library imported into QUnit. It has since evolved further within the library. To reflect that, the property was renamed. This should only affect custom reporter code, not regular testsuites.


## Removed globals

### Replace `module()` with `QUnit.module()`

The global function `module()` is gone, use `QUnit.module()` instead.

Before:

```js
module( "router" );
```

After:

```js
QUnit.module( "router" );
```

### Replace `test()` with `QUnit.test()`

The global function `test()` is gone, use `QUnit.test()` instead.

Before:

```js
test( "defaults to home" );
```

After:

```js
QUnit.test( "defaults to home" );
```

### Replace `asyncTest()` with `QUnit.test()` and `assert.async()`

The global function `asyncTest()` is gone, instead use `QUnit.test()` and `assert.async()`.

Before:

```js
asyncTest( "navigates to new page (async)", function( assert ) {
	router.navigate(function( newPage ) {
		assert.equal( newPage.id, 1 );
		start();
	})
});
```

After:

```js
QUnit.test( "navigates to new page (async)", function( assert ) {
	var done = assert.async();
	router.navigate(function( newPage ) {
		assert.equal( newPage.id, 1 );
		done();
	})
});
```

### Replace `stop()` and `start()` with `assert.async()`

The global functions `stop()` and `start()` are gone, use `assert.async()` instead.

Before:

```js
QUnit.test( "navigates to new page (async)", function( assert ) {
	stop();
	router.navigate(function( newPage ) {
		assert.equal( newPage.id, 1 );
		start();
	})
});
```

After:

```js
QUnit.test( "navigates to new page (async)", function( assert ) {
	var done = assert.async();
	router.navigate(function( newPage ) {
		assert.equal( newPage.id, 1 );
		done();
	})
});
```

### Replace `expect()` with `assert.expect()`

The global function `expect()` is gone, use `assert.expect()` instead.

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

All global assertions, like `ok()` and `equal()` are gone, use `assert` instead, like `assert.ok()` or `assert.deepEqual()`.

All assertion methods affected by this change, in alphabetic order: `deepEqual()`, `equal()`, `notDeepEqual()`, `notEqual()`, `notPropEqual()`, `notStrictEqual()`, `ok()`, `propEqual()`, `strictEqual()`, `throws()`.

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


## Replace `module` hooks `setup` and `teardown` with `beforeEach` and `afterEach`

The module hooks `setup` and `teardown` have been renamed to `beforeEach` and `afterEach`, to make it more obvious that they run for each test within a module.

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


## Removed and modified `QUnit` methods and properties

### Replace `QUnit.done = callback` with `QUnit.done( callback )` for all reporting callbacks

For several versions of QUnit before 2.0, custom reporters can be registered by calling the appropiate methods, passing a callback. If your code still uses the old approach of overwriting a property on the `QUnit` object, replace that by calling the method instead.

This applies to all reporting callbacks, in alphabetic order: `begin`, `done`, `log`, `moduleDone`, `moduleStart()`, `testDone`, `testStart`.

Before:

```js
QUnit.done = function( results ) {
	console.log( results );
};
```

After:

```js
QUnit.done(function( results ) {
	console.log( results );
});
```

### Replace `QUnit.push()` with `this.push()`

Custom assertions need to be adjusted slightly, replacing `QUnit.push()` with `this.push`.

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
    this.push( actual === expected, actual, expected, message );
};
```

### Stop using `QUnit.init`, no replacement

This method used to reinitialize the test runner. It should never have been exposed as a public method and is now gone, without replacement. If you've built a setup that requires the use of `QUnit.init`, contact us (issue tracker, forum, IRC), we can recommend a replacement.

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

Originally `jsDump` was a standalone library imported into QUnit. It has since evolved further within the library. To reflect that, the property was renamed. This should only affect custom reporter code, not regular testsuites.

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


