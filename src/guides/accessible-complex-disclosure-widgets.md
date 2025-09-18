---
title: Accessible complex disclosure widgets
summary: This guide will build slightly more complex disclosusre widgets than
  the basic accessible disclosure widgets guide, we'll explore various trypes of
  navigation drawers or side panels
author: dlee
date: 2025-09-18
toc: true
tags:
  - HTML
  - JavaScript
  - CSS
  - Best practice
isGuide: true
---
## Intro

If you read my older guide on creating "basic" accessible disclosure widgets, then the aim of this guide is to take it up a notch or two, by building variations of a pattern that is a little more complex, the nav drawer. Nav drawers are very common, especially on complex web apps, as there are often multiple navigation features to access the many features these systems have.

As appears to often be the case, this guide has come about to me encountering several nav drawers, whilst testing, over the last couple of months.

So, what is a nav drawer? Put into simple terms, it's just a side navigation that slides out into the visible part of the viewport when a user clicks the trigger control. Technically, nav drawer can also appear from the top or bottom of the viewport, but, we pushed down from the top in the "Basic" article, also, I'm probably over-selling it a little here, by saying that side drawers are "complex", they do come with additional challenges and considerations for us like-minded folks that will put accessibility first in everything we build, but at they're not a "boss level" challenge, like some UI patterns. So, to make my claim of "complex" a little less of an overreach, we'll discuss and build some different variations, just to spice things up a little.

## Types of drawer effect

I don't know if I am using the correct terminology for these, I haven't researched them in any way, but we'll just go with my guessed naming conventions I'll explain what I mean:

1. The standard push to the side drawer, this will either push the whole page content out of the viewport, or at least part of it, that'll likely depend a lot on the viewport size, when a user invokes the control

2. The overlay drawer, this will simply overlay the main page, it will sit on top and not effect it in any way, other than obscuring part of it

3. The fixed icon drawer, this will always show an icon for each link or control within, in a narrow side panel, but should a user click the trigger, then drawer will slide into view and show the icons along with text labels. Honestly, I'm a less keen on these, I think CSS Tricks used this pattern, way back when, sure, it's kinda OK if you're sighted, use a pointing device and have some idea what the icons mean, but, what is the point in hiding just the labels? everything has to still be in the focus order, so expanding/collapsing serves no purpose to blind screen reader users and in reality, the iconography isn't likely to be universally understood, so what the benefit actually is, I have no idea. Still, we'll build one, anyway as I like to thing of my guides as a foundation for further exploration or discussion, as opposed to a "Thou must" thing.
