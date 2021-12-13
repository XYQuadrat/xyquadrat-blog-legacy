---
draft: true
layout: post
title: Running an appropriately sophisticated Minecraft server in 2021
tags: minecraft
---
Even more than a decade after its release, Minecraft continues to be popular and receive updates.
A healthy modding community (if we conveniently ignore debates about Forge versus Fabric) produces a steady stream of huge modpacks that use Minecraft merely as a game engine to build their own experiences on top. But sometimes, all you want is to play good old Vanilla Minecraft, go farm some diamonds and be happy if you manage to build a house that looks better than a dirt block.

From the perspective of a server admin, things have changed in the last years, though much of the improvements that have been made have never reached a large number of servers. I want to give a concise overview of what the best options (in my view) for various aspects of running a server are.

# Hardware

No hardware, no server. Realistically speaking, you'll want to have something with the at very least 1GB of RAM. Even that will not be a very pleasant experience if you have more than 2-3 players. At 4GB+ we're starting to get into the reasonable territory, with about 8GB being a good choice for up to about 20 players and a modest set of plugins. More than that doesn't hurt, of course. In terms of CPU power, single threaded performance matters more than additional cores, but as a rule of thumb: anything that can run Minecraft decently as a client can also run it as a server.

# Operating System

Just use some flavor of Linux. Ubuntu Server Edition or Debian are solid choices. I would not recommend using graphical desktop environments (unnecessary loss of performance) or Windows / MacOS - these really aren't meant to be server operating systems, and their server variants are on life support at best.

# Server implementation

Originally, you would be using the offically provided server binary from Mojang, but these days are long gone. Spigot with their extensive plugin support was a great choice for a long time, but by now most new setups have moved on to **[Paper](https://papermc.io/)**, a fork with better performance and plugin compatibility. [There](https://velocitypowered.com/) [are](https://github.com/PatinaMC/Patina) [numerous](https://github.com/pufferfish-gg/Pufferfish) [other](https://airplane.gg/) [forks](https://github.com/YatopiaMC/Yatopia), in fact there are so many of them that [someone created a Forkception image listing only a select few of them](https://forks.smhsmh.club/img.png#v=1) to show how messy the landscape is. Really the only other significant fork/project I'd consider apart from Paper is [Purpur](https://purpurmc.org/) which has a million config tweaks (including some that make every mob rideable...) - but given that I personally don't need those, I stick with Paper. Most forks either have a tiny community, include patches that break plugins / expected behavior or have a questionable code quality.

#