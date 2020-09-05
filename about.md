---
layout: page
title: About
---

<p class="lead">QUnit is a powerful, easy-to-use JavaScript testing framework. It was originally developed for the <a href="https://jquery.com/">jQuery</a> project but has since evolved to be a dependency of many modern JavaScript libraries and applications, including being the default testing framework for the <a href="https://emberjs.com/">Ember.js</a> ecosystem.</p>

## Philosophy

QUnit's philosophy as a test framework boils down to three primary tenants: _Easy_, _Universal_, and _Extensible_.

### Easy

QUnit should be easy-to-use from start to finish. Setting up your first test with should be super simple, requiring as little overhead as possible. Then, as you're developing, when a test or assertion fails, QUnit should provide feedback to you as fast as possible, with enough detail to quickly figure out the underlying issue. And it should do so without interrupting or corrupting other tests.

Additionally, QUnit should be fast to make it easy for developers to have confidence that putting their tests on their critical path won't slow them down.

### Univeral

QUnit should be universally applicable for testing JavaScript code and support many different environments. JavaScript can run in the browser, in worker threads, and on the server, and so should QUnit so that you can test your code in the same environment where it will be running; the environment where you need to have confidence it works.

### Extensible

QUnit should be opinionated with a lean API to support being easy-to-use, but it should also be highly extensible. There are many different approaches to testing and many different types of tests that users may want to write, and while we can not support all of these out of the box, we can support APIs to enable the community to extend QUnit to meet their needs.

## Community

QUnit is free, open source and always will be, but this wouldn't be possible without a first-class team of volunteers and community of users. If you're interested in getting plugged into the community, here are some ways to get started:

* Join [the official chat channel on Gitter](https://gitter.im/qunitjs/qunit).
* Follow [@qunitjs on Twitter](https://twitter.com/qunitjs) for announcements.

Furthermore, if you'd like to contribute...

* Features or bug fixes, you can find [the source code on GitHub](https://github.com/qunitjs/qunit).
* Updates to this website, you can find [this website on GitHub](https://github.com/qunitjs/qunitjs.com).
* Updates to the API documentation, you can find it in [the "docs" directory of the main repo on GitHub](https://github.com/qunitjs/qunit/tree/master/docs).

## Team

Between API design, feature implementation, ticket triage, bug fixing, and everything else, there’s a lot of work that goes into QUnit, and all of it is done by volunteers. While we value all of our contributors, there are a few who contribute frequently, provide high-level direction for the project, and are responsible for its overall maintenance, and we recognize them below.

For a full list of contributors, see the [authors list](https://github.com/qunitjs/qunit/blob/master/AUTHORS.txt).

### [Trent Willis](https://twitter.com/trentmwillis) - Project Lead

Trent is a Senior UI Engineer at [Netflix](https://www.netflix.com) in beautiful Los Gatos, CA. He has been contributing to QUnit since 2015 and became the project lead in early 2017.

### [Leo Balter](https://twitter.com/leobalter)

Leo is a software engineer at [Bocoup](https://bocoup.com/) based in Boston, MA. He represents the JSFoundation at TC39, the technical committee that designs the language specification for JS, and maintains the official spec tests at [test262](http://github.com/tc39/test262/). He has been contributing to QUnit since 2013 and was a project lead from 2015 to early-2017.

### [Richard Gibson](https://twitter.com/gibson042)

Richard is an architect at [Dyn](http://dyn.com/) in New Hampshire, USA. He has been contributing to jQuery Foundation projects since 2011 (QUnit since 2012) and can be spotted on a large handful of open source repositories.

### [Kevin Partington](https://github.com/platinumazure)

Kevin is a software engineer based out of Minnesota, USA. He has contributed to QUnit since 2015. He is also heavily involved in the ESLint project and actively maintains an [ESLint plugin](https://github.com/platinumazure/eslint-plugin-qunit) for linting QUnit tests.

### [Timo Tijhof](https://timotijhof.net/)

Timo is a senior engineer at [Wikimedia Foundation](https://www.wikimedia.org/) where he is on the [Architecture Committee](https://www.mediawiki.org/wiki/Architecture_committee), the technical committee that governs the integrity and stability of Wikimedia software projects. He has been contributing to jQuery Foundation projects since 2011 and joined the QUnit Team in 2012.

### [Jörn Zaefferer](http://bassistance.de/)

Jörn is a freelance web developer, consultant, and trainer, residing in Cologne, Germany. Jörn evolved jQuery’s test suite into QUnit and was project lead until mid-2015. He created and maintains a number of popular plugins. As a jQuery UI development lead, he focuses on the development of new plugins, widgets, and utilities.

### Previous Team Members

* [James M. Greene](https://jamesmgreene.github.io/)
* [John Resig](https://johnresig.com/)
* [Scott González](http://nemikor.com/)

## History

QUnit was originally developed by John Resig as part of [jQuery](https://jquery.com/). In 2008 it got its own home, name, and API documentation, allowing others to use it for their unit testing as well. At the time it still depended on jQuery. A rewrite in 2009 fixed that and QUnit has been an independent project ever since.

QUnit's assertion methods originally followed the [CommonJS Unit Testing](https://wiki.commonjs.org/wiki/Unit_Testing/1.0) specification (which was to some degree influenced by QUnit) but have since been expanded to include a wider variety of assertions.
