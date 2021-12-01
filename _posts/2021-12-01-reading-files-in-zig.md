---
layout: post
title: Reading files in Zig for Advent of Code
---

[Zig](https://ziglang.org) is a lovely low-level language I've recently learned about, and what better way is there to learn a new language than to use it to solve [Advent of Code](https://adventofcode.com) problems. Alas, I set out on solving the technically very easy first task, managing to complete it in less than 15 minutes.

Or so I thought. Whilst I did have a rough idea of Zig's syntax, and I had no problem writing loops or functions, I conveniently overlooked the issue of getting the input into my program. For reference, Day 1 had a list of integers as input; nothing difficult to parse per se. But my unfamiliarity with Zig led to serious problems when I tried to read said list of integers into an array.

I've tried various solutions, some of which seem deprecated whilst others should in theory work but I must have made mistakes whilst implementing them (I got lots of type mismatch errors), because it took me 45 minutes of trying before a helpful tip from a colleague that also decided to do AoC in Zig finally got me to a working snippet of code. (Once I had the input parsed, the two tasks were indeed easy and I managed to solve both of them within a few minutes.) To possibly spare someone else this frustrating process, the actual working code is as follows:

```zig
const std = @import("std");
const data = @embedFile("/path/to/file");

pub fn main() !void {
    var lines = std.mem.tokenize(u8, data, "\n");

    while(lines.next()) |line| {
        var x : i64 = try std.fmt.parseInt(i64, line, 10);
        // do something with x, e.g. append to an ArrayList
    }
}
```

Remark: This solution embeds the contents of the file into the actual binary. This is not an issue at all for Advent of Code, but may very well not be the desired behavior for general file I/O.