---
layout: post
title: Solving a simple linearizability problem
tags: eth
katex: true
---

Let us tackle the following problem: 

> Give a two-thread history that is sequentially consistent, but not linearizable. Use a single atomic register `r` that initially contains the value zero and supports the operations `read()` and `write()`. (HS20)

To be able to solve this, we must recall what it means for a history to be _sequentially consistent_ and what it means to be _linearizable_. 

1. A history H is _sequentially consistent_ if it can be extended to a history G that is equivalent to a legal sequential history S by 
* appending zero or more responses to pending invocations that took effect and 
* discarding zero or more pending invocations that did not take effect

2. A history H is _linearizable_ if it can be extended to a history G that is equivalent to a legal sequential history S with $\to_G \subset \to_S$ by:
* appending zero or more responses to pending invocations that took effect and 
* discarding zero or more pending invocations that did not take effect   

These two definitions are very similar. The additional constraint that linearizability brings to the table is that $\to_G \subset \to_S$, which means that we cannot reorder operations done by different threads. For sequential consistency, we can reorder operations _by different threads_, but **not** those in the same thread (so program order has to be respected).

Alright. We thus want to find a history where we have to reorder stuff for it to be equivalent to a legal sequential history. This way, we keep sequential consistency, but we don't have linearizability.

A possible solution could be

```
A: r.write(1)
A: void
B: r.write(2)
B: void
A: r.read()
A: 1
```

since we can reorder this to

```
B: r.write(2)
B: void
A: r.write(1)
A: void
A: r.read()
A: 1
```

which is then a legal sequential history. Because we have to reorder invocations across threads to make this work, the history is _not_ linearizable, but it _is_ sequentially consistent, just like the exercise demands.