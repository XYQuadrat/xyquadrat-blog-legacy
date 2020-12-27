---
layout: post
title: "Calculate terms modulo a polynomial in algebras more efficiently"
katex: true
tags: eth
---

If we have an algebra that is modulo some polynomial, say $\mathbb{Z}\_5 [x]\_{x^2 + 1}$, it often is the case that we perform some operation in this algebra and afterwards have to take our result modulo said polynomial, so modulo $x^2 + 1$ for example.

In this case, a simple trick can be very helpful. Remember that by the definition of modulo, 

$$x^2 + 1 \equiv 0 \mod x^2 + 1$$

(Of course you'd adapt the polynomial accordingly to the one you are given.) Then, we can simply say

$$x^2 \equiv -1 \mod x^2 + 1$$

Now, in our example, $-1 = 4$ since we are working in $\mathbb{Z}_5$. Thus

$$x^2 \equiv 4 \mod x^2 + 1$$

And that's it already. Now we can reap the benefits of this simple transformation: If we have a polynomial like $2x^2 + 3x + 1$ that you want to take modulo $x^2 + 1$, you can simply substitute $x^2$ with $4$, turning this into $2 \cdot 4 + 3x + 1 = 3x + 9 = 3x + 4$. Especially if you have to do such modulo operations a few times, that's much quicker and needs less notation than using long division.