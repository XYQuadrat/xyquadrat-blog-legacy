---
layout: post
title: "Change of basis and coordinate transforms"
katex: true
tags: eth
---

At the beginning, there was a point in space.

![Point in space](/assets/img/change_of_basis1.png)

And the point was lonely, since there was no way to describe its position, making it impossible for friends to find him. He wasn't far away from the origin that was universally defined as the place that you'd get to if you scaled any vector by 0.
Then, Ana came along. She invented (or rather, defined) two basis vectors $\mathbf{u_1}, \mathbf{u_2}$. Now, the place of the point could be described as $$(\mathbf{u_1}, \mathbf{u_2}) \begin{pmatrix} 1 \\ 2 \end{pmatrix}$$, which means to walk $1$ time the first of Ana's basis vector $\mathbf{u_1}$ and then $2$ times $\mathbf{u_2}$.

![Ana's basis vectors and point](/assets/img/change_of_basis2.png)

And everyone was happy, since now the position of the point could be described easily. That was, until Olga came along. Olga was from far away, and didn't understand the language of Ana and her basis vectors. So, she defined her own ones instead, namely $\mathbf{v_1}$ and $\mathbf{v_2}$. It was also possible to denote the position of the point in Olga's basis vectors, namely $$(\mathbf{v_1}, \mathbf{v_2}) \begin{pmatrix} 1 \\ -1 \end{pmatrix}$$. 

![Olga's basis vectors and point](/assets/img/change_of_basis3.png)

Eventually, people wanted to be able to express positions originally in Ana's language / basis vectors in Olga's language and vice versa. You're called in as an expert in linear algebra. What do you do?

Being a native speaker of Ana's language, you first set out to describe Olga's language in your own. Using your own base vectors $\mathbf{u_1}, \mathbf{u_2}$, you manage to describe  

$$\mathbf{v_1} = (\mathbf{u_1}, \mathbf{u_2})\begin{pmatrix} 0 \\ 2 \end{pmatrix}$$ 

$$ \mathbf{v_2} = (\mathbf{u_1}, \mathbf{u_2})\begin{pmatrix} -1 \\ 0 \end{pmatrix}$$

Written differently, that means 

$$ (\mathbf{v_1}, \mathbf{v_2}) = (\mathbf{u_1}, \mathbf{u_2}) \begin{pmatrix} 0 & -1 \\ 2 & 0 \end{pmatrix}$$  

$$\tag{1} (\mathbf{v_1}, \mathbf{v_2}) = (\mathbf{u_1}, \mathbf{u_2}) (\mathbf{u} \to \mathbf{v})$$

So you have now found a way to express Olga's base vectors in your own. (Notice that $(u \to v)$ is in the ETH script denoted as $T$.)

But that's not enough, obviously. We'd like to be able to translate _any_ vectors back and forth between the two systems.
Therefore you go and look at a specific, but undetermined vector $\mathbf{x}$. We can now, just as with our lonely point from the beginning, write this as

$$\mathbf{x} = (\mathbf{u_1}, \mathbf{u_2}) \begin{pmatrix} x_1^U \\ x_2^U \end{pmatrix}$$

$$ \mathbf{x} = (\mathbf{v_1}, \mathbf{v_2}) \begin{pmatrix} x_1^V \\ x_2^V \end{pmatrix}$$

Hmm. With the help of equation $(1)$ we should be able to equate the right sides of those expressions:

$$ (\mathbf{u_1}, \mathbf{u_2}) \begin{pmatrix} x_1^U \\ x_2^U \end{pmatrix} = (\mathbf{u_1}, \mathbf{u_2}) (\mathbf{u} \to \mathbf{v}) \begin{pmatrix} x_1^V \\ x_2^V \end{pmatrix}$$

Since we are now operating with the same base, we could remove the $(\mathbf{u_1}, \mathbf{u_2})$:

$$ \tag{2} \mathbf{x}^U = (\mathbf{u} \to \mathbf{v}) \mathbf{x}^V$$

And this step combined with the in my opinion badly chosen notation by the ETH script is probably what causes a lot of confusion: 

$(u \to v)$ is the change of basis matrix $T$ from the old basis by Ana, $(\mathbf{u_1}, \mathbf{u_2})$, to $(\mathbf{v_1}, \mathbf{v_2})$, the new one by Olga. But this matrix $T$ then allows us to express coordinates from the _new_ basis in the _old_ basis, as seen in $(2)$, so $\mathbf{x}^U = T \mathbf{x}^V$.

The usual notation that I at least have seen much more often in high school and other places on the internet reverses this. We express the basis vectors of the old basis in the basis vectors of the new basis, giving us $(\mathbf{u_1}, \mathbf{u_2}) = (\mathbf{v} \to \mathbf{u}) (\mathbf{v_1}, \mathbf{v_2})$. If we then define this $(\mathbf{v} \to \mathbf{u})$ as $T$, then (in my opinion more sensibly) we can say $T \mathbf{x}^U = \mathbf{x}^V$ and vice-versa $\mathbf{x^U} = T^{-1} \mathbf{x}^V$. This (for me) makes the thing that you actually do often, namely translating vectors between bases, more intuitive.

But there is no reason to get upset here. One must accept the other notation, for now, and get used to it. 