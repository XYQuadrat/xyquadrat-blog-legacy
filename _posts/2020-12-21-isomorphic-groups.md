---
layout: post
title: "Find easy isomorphic groups"
katex: true
tags: eth
---

Take a look at the following question: 

> Find a group isomorphic to $\langle \mathbb{Z}\_{12}; + \rangle$ other than $\mathbb{Z}\_{12}$. (FS19, 3a)

Let us investigate how we can provide a fast and simple answer here. The important theorem to have in mind here is _"A cyclic group of order n is isomorphic to $\langle \mathbb{Z}\_n; \oplus \rangle$"_ (Theorem 5.7)

In our specific example, this means that we have to find a cyclic group of order $12$. As [WolframAlpha will tell you](https://www.wolframalpha.com/input/?i=groups+of+order+12), there are quite a few such groups, but the easiest type are direct products of smaller groups (so $\mathbb{Z}\_{n} \times \mathbb{Z}\_{m}$). Since $\mathbb{Z}\_n \times \mathbb{Z}\_m$ has order $\text{lcm}(n,m)$, we need to find $n, m$ such that $\text{lcm}(n,m) = 12$ which is the same as $n \cdot m = 12$ if $\gcd(n,m) = 1$. For $12$, this would be $3 \cdot 4 = 12$.

Hence a simple solution to this question would be $\mathbb{Z}\_{3} \times \mathbb{Z}\_{4}$. (If you want to be more formal, also include the associated operation, so $\langle \mathbb{Z}\_{3}; \oplus \rangle \times \langle \mathbb{Z}\_{4}; \oplus \rangle$)

**Practice:** If you understood this, it should now be easy for you find a group isomorphic to $\langle \mathbb{Z}\_{16}; + \rangle$ other than $\mathbb{Z}\_{16}$.