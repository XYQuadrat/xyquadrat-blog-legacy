---
layout: post
title: "How to find zerodivisors in finite commutative rings"
katex: true
tags: eth
---

Given a question similar to "Find all zerodivisors in the ring $\mathbb{Z}_{25}$, how do we solve this task efficiently?

First, we can recall that in a finite commutative all elements are either units or zerodivisors. Now, an element $a$ of the ring is a unit if and only if $\gcd(a,m) = 1$ (in the previously mentioned example, $m$ would be 25).

Therefore all elements $a$ where $\gcd(a,m) \ne 1$ are zerodivisors. Phrased differently, this means that all elements that are **not** relatively prime to $m$ are zerodivisors of $\mathbb{Z}_m$.

Applying this to our example from the start, we want to find all the elements in the ring $\mathbb{Z}_{25}$ that are not relatively prime to $25$. Since $25 = 5 \times 5$, those elements are exactly the multiples of $5$, so $\{ 5, 10, 15, 20 \}$ ($25 = 0$ and $0$ is never a zerodivisor by definition).