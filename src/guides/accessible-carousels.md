---
title: Accessible carousels
summary: Let's look at how we can build accessible carousels, to be as usable as
  possible, using the correct ARIA and HTML, whilst also baking in additional
  usability features
author: dlee
date: 2026-09-30
toc: true
tags:
  - HTML
  - JavaScript
  - HTML
isGuide: true
---
## Intro

I was recently tasked with creating a guide that offered a solution to a small inaccessible carousel. The carousel in question was a small slider, each of the three slides presented a single statistic about a degree course. This widget was created by the Office for Students and it must be displayed on course pages for all higher education degree courses. As it wasn't accessible, that means that hundreds of academic institutions are hosting the widget embed across thousands of courses. In fact, it is said that there are around 750,000 HE applicants each year, in the UK. That's a lot of interactions, especially as some courses may have variations and a widget has to be displayed for each variation, and then it's likely students will not just look at one course, they will look at many, so the true number of times these widgets are encountered could easily be several million. It can be quite disheartening when you work in a sector that legally has to have accessible websites and apps, etc, more so when you're lucky enough to work for an employer that actually cares more about the needs of students and colleagues than the laws themselves, then you're also legally obliged to display the inaccessible content a governmental department created.

Whilst I was writing the aforementioned guide and building out the very basic implementation of a carousel, I thought it would be useful to finally delve deeper into building a fully fledged carousel and exploring a couple of options. This is something I've been meaning to do for a while, but never managed to get around to it. Part of the reason why I never got around to it is carousels are almost universally hated in the accessibility community and in many parts of the UX community, too. Whilst a lot of that discourse is warranted, a lot of it appears to stem from inaccessible carousels, overuse of carousels and of course misuse of carousels:

* Most carousels are inaccessible, let's face it, we're always going be up against that, but the same can be true of any other component, it's just that carousels are more complex than nav menus, etc
* Often carousels are carousels can be overused, they're used in multiple places on the same page or site where it may make accessing the info they contain become a laborious chore, a frustrating treasure hunt for snippets of info and that frustration is exacerbated if the carousel was inaccessible in the first place
* Carousel misuse, oftentimes I encounter a carousel that didn't really need to be a carousel, it didn't warrant the finicky mechanics to stack just a few snippets of info or imagery into such a widget and an alternative component could have been used to display that info front and centre, especially when that content is vital for understanding something

But the above being said, carousels have a place when done correctly, if we were to bring up a property search website to look for a new home to rent or buy, we'd almost  certainly encounter a carousel, as it's a convenient way of stacking a bunch of images into the same discrete component. They are related to the home, showing 20, 30 or more images on a single page may be overwhelming for some, especially if they just want to find the property details, before they waste time deciding where they're going to be put their TV in a house they'll never live in, as there may be something in the particulars that makes it unsuitable for them.

So, I'm just going to build a few carousel types, we will have an auto-rotating type, but I'll intentionally make that a slower transition, I'll also provide ways to pause, stop or hide that carousel and well start with progressive enhancement and also we'll add in a couple of other features to increase the usability for as many people as we can, so let's get stuck in:

## Our accessible base

As always, we'll just start from some base HTML, which will be a bunch of images and a heading, which we'll then style it a little, so it's available if for whatever reason, JS isn't available.

Once we have done that, we'll wraggle the DOM with JS to add in the carousel functionality and any associated behaviours and options.

I'm just going to use five images, for no other reason other than five kind of seems to be the minimum number of things that would warrant the legwork of making a carousel, but that's just my own personal opinion.
