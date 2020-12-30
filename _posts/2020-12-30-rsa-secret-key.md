---
layout: post
title: "Computing the RSA private key for small inputs"
katex: true
tags: eth
---

Whilst RSA is considered secure if we use sufficiently large primes as an input, for very small primes, it is trivial to reverse the process and finde the private key if we are only given the public one. Let's consider the example:

> The RSA key of Alice is $(n,e) = (55, 3)$. Compute her secret key $d$ . (HS18, 2d, adapted)

Normally, $n$ would be very big (hundreds-of-digits-big) making it very difficult to find the factors $n = p \cdot q$. In this case though, $n = 55$ means that we can easily find $p, q$. Without much effort, you should be able to see that $p = 5, q = 11$ is the solution (or $p = 11, q = 5$ of course).

Now, $d$ is defined as $ed \equiv_{(p-1)(q-1)} 1$. Filling in the values we now know, that results in $3 \cdot d \equiv_{40} 1$. (This is the same as finding the inverse of $e$ in $\mathbb{Z}^*_{(p-1)(q-1)}$). We can solve that by looking at multiples of $40$ plus $1$. If one of these is a multiple of $3$, we have found $d$. With a bit of trial & error, you should get $(2 \cdot 40) + 1 = 3 \cdot \mathbf{27}$. Thus, $27$ is a solution for the equation, so $d = 27$.

And that's how you crack RSA in 3 easy steps. /s

(You could now also try the original exercise from HS18 where $(n,e) = (77,7)$).