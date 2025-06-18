---
title: Accessible content warnings
summary: Let's consider unsettling, triggering, flashing, animated or graphic
  content, how do we accessibly hide it, until a user wants to see it? let's
  build one
author: dlee
date: 2025-06-18
toc: true
tags:
  - HTML
  - JavaScript
  - CSS
  - Best practice
isGuide: true
---
## Intro

It's fair to say that on the web we sometimes may need to show imagery or moving images that some users do not want to see, for a multitude of reasons. The types of imagery some people do not wish to see is perhaps as vast as the reasons they do not want to see them. I do not profess to know all of the things, but I certainly know of a good few examples, so I'll list some of those, so we all know where this guide is going:

* Flashing content, this to me is the one that concerns me the most, as it can physically harm folk by causing seizures associated with photosensitive epilepsy and other neurological conditions and in some cases, people have actually died as a direct result of strobing content or accidents related that occur as a direct result of having a seizure
* Animated content, this one may cause some users to feel nausea, dizziness, migraines, distractions or a plethora of other significant and physically uncomfortable conditions
* Phobia-inducing content, some folks have phobias and these phobias can cause fear, panic, stress, anxiety and other unsettling emotional responses that have can significantly imapct our users
* Nudity or sexual content, some of our users may not wish to see such imagery or it is inappropriate for them to have it displayed on their screen at this time. Its purpose may be completely inoccuous, as it could be art, but they may have their child shoulder-surfing, they may be at work, or they just may not want to see it at all
* Violence and gore, we often encounter these types of imagery in online news articles and social media posts, they can at times be very explicit in nature, the aftermaths of natural disasters or accidents, crime scenes, the effects of war or other types of conflict, animal cruelty, medical procedures and many other types of imagery that may contain blood, death, severe injuries and many other types of gory content that could unsettle some users
* Emotional imagary, some images are published to ellicit an emotional response from users, perhaps the intention of the publisher is well-meaning, maybe they are trying to raise awareness of something, or encourage people to donate to the cause to help people, but some users may have lived through similar trauma or experiences and just seeing this type of imagery could trigger psychological episodes, cause them to relive or remember certain experiences, or cause other significantly traumatic feelings

That's just some of the things that may cause a variety of adverse effects to our users, there are likely more. The purpose of this guide isn't to say "Thou cannot show these things on the web", because that is never the purpose, most images have their place on the web and whilst some users may not want to see them, some users do and accessibility is about choice and options, it's about allowing people to access content and sites in a way that works for them. Well, you should definitely not autoplay flashing content, because that can be dangerous.
