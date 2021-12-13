---
layout: post
title: Running an appropriately sophisticated Minecraft server in 2021
tags: minecraft
---

Even more than a decade after its release, Minecraft continues to be popular and receives regular updates.
A healthy modding community (if we conveniently ignore debates about Forge versus Fabric) produces a steady stream of huge modpacks that use Minecraft merely as a game engine to build their own experiences on top. But sometimes, all you want is to play good old Vanilla Minecraft, go farm some diamonds and be happy if you manage to build a house that looks better than a dirt block.

From the perspective of a server admin, things have changed in the last years, though much of the improvements that have been made have never reached a large 
number of servers. I want to give a concise overview of what the best options (in my view) for various aspects of running a server in 2021 are.

![](/assets/img/minecraft_screenshot.png)

# Hardware

No hardware, no server. Realistically speaking, you'll want to have something with the at very least 1GB of RAM. Even that will not be a very pleasant experience if you have more than 2-3 players. At 4GB+ we're starting to get into the reasonable territory, with about 8GB being a good choice for up to about 20 players and a modest set of plugins. More than that doesn't hurt, of course. In terms of CPU power, single threaded performance matters more than additional cores, but as a rule of thumb: anything that can run Minecraft decently as a client can also run it as a server.

# Operating System

Just use some flavor of Linux. Ubuntu Server Edition or Debian are solid choices. I would not recommend using graphical desktop environments (unnecessary loss of performance) or Windows / MacOS - these really aren't meant to be server operating systems, and their server variants are on life support at best.

# Server implementation

{: .center}
![](/assets/img/paper-logo.svg)

Originally, you would be using the offically provided server binary from Mojang, but these days are long gone. Spigot with their extensive plugin support was a great choice for a long time, but by now most new setups have moved on to **[Paper](https://papermc.io/)**, a fork with better performance and plugin compatibility. [There](https://velocitypowered.com/) [are](https://github.com/PatinaMC/Patina) [numerous](https://github.com/pufferfish-gg/Pufferfish) [other](https://airplane.gg/) [forks](https://github.com/YatopiaMC/Yatopia), in fact there are so many of them that [someone created a Forkception image listing only a select few of them](https://forks.smhsmh.club/img.png#v=1) to show how messy the landscape is. Really the only other significant fork/project I'd consider apart from Paper is [Purpur](https://purpurmc.org/) which has a million config tweaks (including some that make every mob rideable...) - but given that I personally don't need those, I stick with Paper. Most forks either have a tiny community, include patches that break plugins / expected behavior or have a questionable code quality.

# Plugins

In principle, just running a Paper server without anything is already enough, and some will be happy with such a setup. But most server populations demand _some_ amount of plugins, for example because ~~they aren't good enough at the game to survive a night on Hard~~ they don't want to require everyone to sleep to skip the night, or because they want permissions to `/tp` but you'd (rightfully) prefer not to give everyone OP rights. Personally, I like to roll with these four plugins:

* [EssentialsX](https://essentialsx.net/) has a nice selection of "a bit of everything", including warps and convenience features such as `/otp` that teleports you to offline players.
* [LuckPerms](https://luckperms.net/) is the permissions plugin of my choice. Maybe make a `trusted` group that has access to teleporting and then some `moderators` that can change their gamemode? Whatever permissions you want to hand out, LuckPerms probably covers them. (Tip: You can find the EssentialsX permission list [on this handy site](https://essinfo.xeya.me/permissions.html).)
* [sleep-most](https://github.com/mrgeneralq/sleep-most) is a simple but very customizable sleep skipping plugin. It does one thing, and it does it well.
* [Vault](https://www.spigotmc.org/resources/vault.34315/) is just an API for Permissions / Chat / Economy, but some features of EssentialsX need it.

# Tweaking performance

Just Paper on a reasonably fast server should already provide a good experience for your players. But there are lots of improvements you can make to enhance performance. There's an [excellent extensive guide on optimization](https://github.com/YouHaveTrouble/minecraft-optimization) by YouHaveTrouble. To save you some reading, here are the 3 most important things to change:

* Use the Java startup flags by Aikar ([here's a handy generator](https://blog.airplane.gg/aikar-flags/)). Quite a bit of testing has went into these flags, and they are widely accepted to be the gold standard (until ZGC, a comparatively new garbage collector, becomes mature enough).
* Pregenerate your chunks. [Chunky](https://github.com/pop4959/Chunky) makes this very easy. This helps a ton in my experience, especially when there are multiple players exploring the world.
* If you run a redstone-heavy server, you'll benefit a lot by setting `use-faster-eigencraft-redstone: true` in your `paper.yml` which enables an alternative implementation of the redstone logic that is much more performant.

# Miscellaneous things

* `tmux` is helpful because otherwise the server will stop when disconnecting over SSH.
* Consider using a whitelist or WorldGuard to protect your server against griefing.
* Ask your players what they want. Unless you're a dictator.

# Backups

See, it's kind of a mistake to put this at the very bottom. Backups are important. When your server crashes and the world save is corrupted, your players won't like hearing that the life-sized recreation of Atlantis that they've been working on for weeks is irrevocably lost. There is a myriad of options for backing up stuff, from simple Bash scripts that make a `.zip` file to enterprise-grade redundant systems. I personally really like [`borgmatic`](https://torsion.org/borgmatic/), which is a friendly interface to `borgbackup`. Throw their systemd unit file in the right folder, set the timer to once per day when everyone is sleeping, and you're good to go.

# Future areas of work

Two big things are missing here:
* Autorestarting your server after a crash or power outage
* Monitoring and alerting (preferably selfhosted)

I'll be back with another blog post once I got those set up the way I like it.