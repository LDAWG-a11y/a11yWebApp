---
title: Show More or Read More accessible disclosure widget
summary: Show or read More widgets typically display a small teaser and a
  button, they disclose additional content, should that button be clicked. Let's
  build one, accessibly
author: dlee
date: 2024-08-07
toc: false
tags:
  - HTML
  - CSS
  - JavaScript
isGuide: true
---
## Intro

Much like their cousins the accordions a Show/Read More widget is just a disclosure widget under the hood. It's a relatively simple construct, in that it is comprised of a button which will toggle the visibility of some previously hidden content.

There are of course some significant differences, which mean we have additional considerations, let us just list a few, before we proceed:

* The teaser part of the widget wouldn't be interactive, like an accordion, it would typically be static content, usually this would text, enough to perhaps entice a user into reading or consuming the hidden content
* The button would either say Show More or Read More and follow the teaser text, there could of course be multiple of these widgets on a page and unlike accordions, their buttons would all have the same accessible name
* Focus management requires a little bit of extra consideration, as we need to manage that logically. With an accordion, we'd typically leave it in situ, on the button element, but with a Read/Show more that may not be very helpful, depending on the button's position after we disclose that new content

I'm quite satisfied those are the main differences, sure we'll likely encounter some nuance, along the way, but as long as we understand basic disclosure widgets and are aware of these extra considerations, we'll figure any unforeseen stuff out, along the way. I'm just gonna throw it out there that I have never actually built one of these before, I've tested them and yup, they were 'Meh' and I've told folks how to fix them, but I didn't actually build one. Not to worry though, I understand the concept and I know enough to be able to consider all users inn my approach, so we'll be golden.
