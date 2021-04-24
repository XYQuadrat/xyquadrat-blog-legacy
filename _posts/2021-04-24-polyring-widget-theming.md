---
layout: post
title: "Theming support for the Polyring widget"
tags: polyring
---

> Honestly that's not a fully satisfactory solution; it'd be better to have a single parametrized widget that one could easily adapt to any design with a few simple arguments.

That's what I wrote in [my post a few days back about building Polyring]({% post_url 2021-04-19-building-polyring %}) in regards to the widget members of the webring can embed in their page. I also mentioned that [Luca (gewlar)](https://ateon.ch/) was working on improving the situation. Only a day later, he already [sent a pull request](https://github.com/XYQuadrat/polyring/pull/11) which did exactly that.

The clever solution allows you to pass a `theme` parameter to the webcomponent. You can either use one of the "official" themes by passing `theme="default"` or `theme="dark"` to the widget, or mix it up with your own style by passing a link to a .json file: `theme="<link-to-json>"`.

There are six variables for members to modify:
* `--background-color`
* `--outer-border-color`
* `--inner-border-color`
* `--href-color`
* `--href-color-active`
* `--text-color`

These should be rather self-explanatory; you can [look up the default theme JSON](https://xyquadrat.ch/polyring/assets/themes/default.json) to see the simple structure your file should have. A neat feature Luca also implemented is that the logo will adjust its color accordingly.

<webring-banner theme="https://xyquadrat.ch/polyring/assets/themes/ugly.json">
    <p>Member of the <a href="https://xyquadrat.ch/polyring">Polyring</a> webring</p>
</webring-banner>
<script async src="https://xyquadrat.ch/polyring/embed.js" charset="utf-8"></script>
<p></p>

...but try not to make the banner too ugly. I can't stop you from doing it, though.

Big thanks to Luca for getting this done so quickly; if you're a Polyring member, then go and use it! (And if you aren't a member yet but want to become one, [check out the instructions for doing so.](https://xyquadrat.ch/polyring/))