---
title: Links vs buttons vs other clicky things
summary: Let's take a look at links and buttons and discuss why these two
  interactive elements aren't interchangeable, as well as how they can set user
  expectations
author: dlee
date: 2023-04-13
toc: false
tags:
  - HTML
  - Best practice
isGuide: true
---
## Introduction

For the most part, when we click something on a website, it's usually a link or a button, there are other "clicky things" such as ARIA grid cells, ARIA menu items and other perfectly valid clickable things. There are also endless amounts of custom clicky things that tend to leave folk scratching their heads, such as poorly-implemented custom controls, when I discover these whilst testing a website, I tend to let out a somewhat judgemental sigh, because often what the developer tried and failed to achieve would have been much easier had they just used the correct element to start with.

Now, as I mentioned, I do get frustrated and a bit judgemental when I encounter these, that's not because they affect me, but it's because I know they can affect others and in many instances, they can completely prevent somebody from using a site altogether, which is obviously pretty awful.

## Disambiguation

A link goes somewhere, a button does something. It really is as straightforward as that, it's difficult to understand how the lines between these two elements can become blurry or confuse a developer enough to make them reach for the wrong element in the first place, although sometimes the root of the problem appears to be copy and pasting from CSS framework examples or other code examples across the web. We've all copy and pasted something without reading every line before, we're humans in tech, if we can find find a shortcut, we'll use it, but it's important to know exactly what you are copying and checking it's fit for our purposes.

## What about single page apps?

Have to put this out there, I'm not a fan, so expect a little bias here, but I'll do my best to take a reasoned approach.

There is an argument I sometimes hear about "The URL doesn't change though, it's routing, so this should be a button". Let's forget everything technical we know for a hot second, let's not let our technical knowledge influence how we view what is really happening and let's do a little user persona exercise:

Mavis (66 years young) is a reluctant laptop user, she hates all this fandango technology stuff, in her day she could go to the shops and buy absolutely anything she needed, she knew which shops had the best service, quality or prices and life was easier without these dotcom machines. Only now, most of these shops have either gone, moved completely online, moved to locations further afield or there are way better offers online. Sometimes those shops may have provided services, such as Post Offices or banks and Mavis may have paid her bills there or whatever.

Forced to change her habits by external factors, such as the advent of the internet and all of the convenience of next day deliveries or the fact that somethings simply cannot be done in bricks and mortar stores anymore, Mavis was convinced to get a laptop by one of her grown up kids. After much trial and error, after many calls to her grown up children "This computer isn't working", "Is the battery charged, mum?", "I don't know, how do I do that?" and all of the associated questions somebody that grew up before the digital age may have, when they are genuinely struggling to adapt to this new age, Mavis can just about get by. Mavis' comfort zone is ensuring the laptop has power, turning it on, opening a browser, searching for a site and even buying something online, Mavis has no idea what all the other icons on her screen do, Mavis takes everything that appears on her screen at face value.

I've intentionally not mentioned whether Mavis has a disability here, as whilst disabilities are never unimportant and accessibility is always about disabilities, initially, we'll just focus on a user that doesn't have a great deal of confidence when using websites, someone who is perhaps a reluctant IT user, somebody like Mavis.

We all know a Mavis, if we're in tech and our families or friends have a vague idea of what we do, then we probably know a Mavis. So, ask yourself, if you said to your Mavis, this site is built in Angular, React or Vue, how would your Mavis respond? They would not have a clue what you were on about, would they? To the untrained eye, a website is just a website, a thing that would ordinarily be a link such as an item in a main navigation is just link to them, they have no knowledge of routing, hot-loading or state, do they? So given that Mavis just discovers a navigation area and it contains a collection of items that change the entire page (or the main content and context) why would you confuse Mavis with buttons in this instance? I know what is going on under the hood, but Mavis is blind, Mavis relies on a screen reader and Mavis knows just enough to know a link will typically take her somewhere, whereas a button will typically do something on the current page. Don't build for me, build for Mavis, build consistent interfaces that are both pleasant and intuitive to use for everybody.