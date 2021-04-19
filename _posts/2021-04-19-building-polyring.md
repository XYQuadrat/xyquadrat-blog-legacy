---
layout: post
title: Polyring - Building a webring in 2021
tags: polyring
---

# A webring? In the 21th century?

A few weeks ago, I launched [Polyring](https://xyquadrat.ch/polyring), a webring for ETH Zurich members.  

![Screenshot of the Polyring website](/assets/img/polyring_screenshot.png)  

The concept of a webring might sound strange in the year 2021; after all, webrings are supposedly a relict from past times where Google et al didn't yet exist and where the main way of marketing a website was the word of mouth. At the time Yahoo! WebRing was discontinued on April 15, 2001, search engines were already so good that nobody in their right mind would use a linked list of websites to find what they were searching for.

... Right? Well, not quite. Today it is incredibly easy to find facts and figures about nearly anything at the blink of an eye - but there is one big caveat: you must know what you are searching for. And that is sometimes astonishingly difficult.   
Link aggregators like Reddit (though much of that spirit has been lost) or Hacker News are the main way of unguided content discovery. Webrings differentiate themselves from such aggregators by putting persons before pure content. What might seem like a disadvantage at first turns out to be a secret superpower of webrings, as you discover interesting articles and projects from interesting people that might have never shown up in your feeds otherwise.

Alas, let me stop the rambling about _why_ I started a webring ([this blog post by Charlie Owen](https://www.sonniesedge.net/articles/webrings) might also be part of the reason) and instead tell you _how_ I tackled the technical part of the project.

# Open source to the rescue

Without putting much time into researching the already existing options I found [this delightful "Webring Starter Kit" by Max Böck](https://github.com/maxboeck/webring). Suppressing my NIH [^1] syndrome, I started customizing the setup to my liking (it didn't take that many changes). I removed a few parts I deemed irrelevant, agonized over a logo together with a colleague from ETH and finally published the site.

# Technical details for those who want them

The Starter Kit mentioned above is based on Eleventy, a static site generator. Despite me never having used it before, it was pretty intuitive and I was able to get up and running quickly, which made me drop my plans to switch the site to Jekyll (which this very blog you are reading runs on) for consistency reason. 

#### The widget
<webring-banner>
    <p>Member of the <a href="https://xyquadrat.ch/polyring">Polyring</a> webring</p>
</webring-banner>
<script async src="https://xyquadrat.ch/polyring/embed.js" charset="utf-8"></script>
<p></p>

This nice widget you can embed on your own site if you are a part of the ring is a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that only requires a few simple lines of code to be added to the site. On a site load, the widget retrieves the JSON that contains the data about the members of Polyring. It also hooks up the "Previous" and "Next" links accordingly so that the ring truly is a linked list™. 

Given that the JSON file is very slim and the custom `webring-banner` element is also only 5KB this should be very performant even with a bad connection. We're actually working on further cutting down the size of the element through minification, but that's not as easy as it might sound since the inline CSS and HTML markup is confusing most minifiers.

#### Updates / deployment
Interested ETH members can add themselves to the ring by making a Pull Request on GitHub (_insert ramblings about GitHub instead of a truly FOSS platform here_). On merging, a webhook is triggered to inform my trusty little Raspberry Pi that he's got to re-build the site. (Since the Pi is deliberately not accessible via SSH from outside my LAN, deploying with GitHub Actions + SSH wasn't an option. I still use GitHub Actions to check pre-merge that the build succeeds, though.) The handling of the webhook on the Pi is handled by `webhook` (definitely a confident name), [a lightweight Go program](https://github.com/adnanh/webhook) that then calls a simple shell script which updates the repo, builds the site and puts it into the correct folder. As usual with working CD/CI, it feels like magic to push a change via git and have it reflected on the live site within seconds.

#### The widget, revisited

Originally, I had one single light-themed widget and said "just build your own if you don't like it". Well, that caused people to make a fully static widget, which meant that their member count and possibly their links would cease to be correct after a new site joined Polyring. I therefore started offering an alternative dark mode widget. Honestly that's not a fully satisfactory solution; it'd be better to have a single parametrized widget that one could easily adapt to any design with a few simple arguments. Luca (gewlar) is working on this, so maybe it'll become reality within the next few days already!

# Members, anyone?

When I launched the project, it was just me and Oliver Saravanja being part of the (quite empty) ring. Since then, we've grown quite a bit, and have now reached 12 members. All our current members are studying Computer Science at ETH, so we're not quite as diverse as I'd want it to be yet, but at least that means there were less technical problems ;)

If you have any questions or suggestions, send me a mail at [mail@xyquadrat.ch](mailto:mail@xyquadrat.ch).

[^1]: Not Invented Here. Wanting to do everything on your own because "I know how to do this much better".