# Atomic Design

Since react docs doesn't suggest you an specific design pattern about how to structure our react applications it's recommendable to use one.

## Atoms

Basic building block of matter, are our HTML tags, such form label or inputs, animatios or buttons. Has many states like a Button, disabled, hover, different sizes, etc.

Tip the atoms shouldn't have position, margins, only molecules and organisms can set the position of atoms.

## Molecules

![molecule search bar](https://paulonteri.com/images/thoughts/atomic-design-react/molecules.png)
Molecules are a group of two or more atoms that bind together to demonstrate new qualities.

A molecule is small and has a responsibility todo a thing and function. 

For instance a searchBar that has an **Input**, **Label**, **Button**.

## Organisms

![organism NavBar](https://paulonteri.com/images/thoughts/atomic-design-react/organisms.png)

Organisms are the combination of Molecules that work together or even with atoms that compose more elaborate interfaces.

They are still ensured to be independent, portable and reusable enough to be reusable in any content.



Example a **NavigationBar** that compound by **Logo** **PrimaryNavigation** and **SearchForm**


## Templates

![template Layout](https://paulonteri.com/images/thoughts/atomic-design-react/templates.png)

The template consist of group of organisms that conforms a complete webpage. For Instance a Layout.

## Pages

![Page](https://paulonteri.com/images/thoughts/atomic-design-react/pages.png)
Pages are instances of templates with their placeholder content filled with real information.
