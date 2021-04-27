---
layout: post
title: Optimizing font file size with glyphhanger
tags: web performance
---

A good font choice is essential to a good-looking website. xyquadrat.ch surely wouldn't look even remotely trustworthy if I used Comic Sans, would it?

![Screenshot of xyquadrat.ch with Comic Sans](/assets/img/polyring_comic_sans.png)

It... really doesn't fit.

# Actually, it's pretty easy.

So let's assume that you decided to find a nice font for your website; something that fits your style of content and is well readable. This is luckily no longer that much of a challenge - [Google Fonts](https://fonts.google.com) and similar sites have hundreds of different fonts that look great and are free for you to use. In my case, the font I settled on was [Merriweather](https://fonts.google.com/specimen/Merriweather).  
Google Fonts offers you to include the fonts directly from their CDN, which only requires you to copy-paste the appropriate code into your HTML or CSS (depending on the method you are using). If you do this, then you're done, there's not much to optimize, and you can safely close this tab now.

But maybe that's not what you want to do. At least it was not what I wanted to do; my general credo is: if I can self-host something, I'll self-host it. Also, if you self-host your fonts, you don't need exceptions in your CORS headers. The tidyness of these headers is something (however irrational that may be) I really like.

# Selfhosting it is, then.

To self-host the fonts, you'll first want to download the fonts locally. For some weird reason, the standard format for fonts downloaded from Google Fonts is `.ttf`. TTF might be a fine format for local fonts you'd use in a word processor; it surely [isn't well-suited for the web](https://stackoverflow.com/questions/36105194/are-eot-ttf-and-svg-still-necessary-in-the-font-face-declaration/36110385#36110385) though. You should use WOFF2 (and, if you expect to have IE 9 - 11 traffic, WOFF as a fallback) instead. These are basically the compressed versions of TTF, and they are strictly superior to TTF for the web.

So you'll have to convert the `.ttf` to the appropriate formats. And if you're already at it, you could also get your hands dirty and optimize the size of your font a bit more. (Before optimization, my fonts were usually the biggest chunk of my site, of course especially for text-only posts.) To do this, you can use the awesome tool `glyphhanger`. (You can [install it via `npm`](https://github.com/zachleat/glyphhanger). It's quite heavyweight since it uses `puppeteer`, but it excels at its job.) 

Then, you can easily convert the `.tff` to a `.woff` and `.woff2` file with `glyphhanger --formats=woff,woff2 <input file>`. But that still leaves files that contain quite a lot of unneeded information - namely unnecessary symbols (or more precisely glyphs). For example, the myriad of accents used in Eastern Europe and other weird Unicode ranges that you'll probably never use are still in there. You can easily get rid of those by _subsetting_ your fonts with `glyphhanger`. If you only need "normal" Latin characters, `glyphhanger --LATIN --formats=woff,woff2 --css <input file>` will both subset the fonts appropriately and also generate a `@font-face` CSS declaration that's ready to use. 

Personally, I managed to reduce the data transferred for my fonts from **180KB** to **70KB** - certainly a nice improvement that Google PageSpeed Insights also liked. There is one significant downside with this approach: If you selfhost your fonts, the browser cannot use a cached version of the font. With the very common web fonts such as Lato, Open Sans or Roboto, this might lead to a net increase in bandwith usage. Since few sites use Merriweather as their font, this is much less of a concern for my setup, and thus I'll continue to selfhost my fonts, for better or worse.