# qunitjs.com

This repository houses the content and code for the [qunitjs.com](https://qunitjs.com/) website.

## Development

Requirements:

* [Ruby](https://www.ruby-lang.org/) (tested with Ruby 2.6+)
* [Bundler](https://bundler.io/) (if missing, install with `gem install bundler`)

To install Jekyll and plugins the first time:

```shell
bundle install
```

To update Jekyll and any plugins (e.g. after changes to `Gemfile`):

```shell
bundle update
```

To regenerate the site and serve locally at <http://localhost:4000/>:

```shell
bundle exec jekyll serve
```

## Scripts

### Update plugins

```shell
node build/update-plugins
```

### Update QUnit version

```shell
node build/set-version <version>
```
