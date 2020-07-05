---
layout: page
title: Plugins
redirect_from:
  - "/addons/"
---

<p class="lead">The following plugins provide a myriad of ways to modify, extend, and enhance QUnit itself as well as the developer experience of using QUnit.</p>

<ul id="plugins">
  {% for plugin in site.data.plugins %}
    <li class="plugin">
      <h3><a href="https://npmjs.com/package/{{ plugin.name }}" target="_blank" rel="noopener noreferrer">{{ plugin.name }}</a></h3>
      <p>{{ plugin.description }}</p>
    </li>
  {% endfor %}
</ul>

_Note: This list is automatically generated from npm packages using the [**qunit-plugin** keyword](https://www.npmjs.com/search?q=keywords:qunit-plugin) and is updated when the website is deployed._
