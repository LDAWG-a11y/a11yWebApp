---
title: How we built our user preference settings
summary: "The user preference settings we developed aim to give granular control
  to our site's presentation for disabled and abled users alike. The aim was to
  provide users with controls that can adjust the presentation, usability and
  accessibility of the site, so it is presented in a way that works for them. "
author: dlee
date: 2024-04-23
toc: false
tags:
  - Case study
  - JavaScript
  - CSS
  - Adapting websites
isGuide: true
---
## Intro

For those of you that have visited our site before, you may have noticed it has undergone a complete redesign, we added some new features, restyled the presentation, made further enhancements to the accessibility and usability of the site and also increased page performance a little.

Why did we do this? Well, MTA has grown a little since we first developed it a couple of years ago, we have collaborations with some awesome organisations, we now have quite a lot of content that was perhaps getting difficult to find and last, but certainly not least we are always keen to improve the accessibility of this site and as accessibility can never be "done", it was a good opportunity to discover where improvements could be made.

One particular feature that we're going to focus on is our users preferences, these can be accessed by activating the Settings button in the site header (visually identified as a cog). Upon activating said button a modal overlay appears (No, not that type of overlay), with several groups of controls that change multiple aspects of the site's visual presentation. I do have to concede here that they at this stage, they are primarily controls for visual changes, perhaps there is some scope for changes that may help users with motility or cognitive issues, which I would be super keen to implement if I anybody could think of anything that would make a useful impact for our users. If you think of anything, please do feel free to contact us, using the email in the site's footer.

## Disambiguation time

It's likely a given that if you are here, reading this, you are in some way involved or connected to digital accessibility? So, making the assumption encourages me to make one more, we all know hat overlays are, right? I'm just gonna generalise a bit, as I don't fancy getting involved in any litigation.

So an overlay is generally something magic, when I say magic, I of course mean deceptive and a bit of trickery that doesn't really trick those in the know, so to speak.

These overlays do offer quite a bit of customisation for users, you can change various aspects of presentation, have content read aloud, modify colours and text, all sorts really. Some users may find some of these controls useful, others may actually be adversely affected by them, one thing that is for sure is they don't actually make an inaccessible site "accessible", muck like sticking a Lamborghini badge on Lada doesn't make it a supercar.

You may have noticed that there are some limited similarities to our preferences, in that something "overlays" the screen and you can modify several aspects of the presentation of our site. This is where I want to disambiguate the differences:

I built this site with an accessibility first approach, it was absolutely the most important consideration all the way through the initial build and the new redesign. I tested, I researched and tested again. I constantly had to review design elements, as I could not get them to quite meet the accessibility criteria I aimed for. An example being, all text on this site actually meets SC 1.4.6 Contrast Enhanced (AAA), that actually limited me quite a bit, design wise. It became a challenge at times, but challenging in a fun way, trying to make the site look pretty good whilst maintaining a high contrast ratio was a fun task for somebody who isn't a designer. I am not saying the accessibility of the site is perfect, but I did squeeze in as many AAA criteria as I reasonably could.

Some of the AAA criteria actually recommend providing ways for users to adapt certain aspects of the presentation, we already did this for the site themes, so it was just an extension of that really. I definitely didn't take any inspiration from overlays, it was AAA and AA criteria, some things that we as a team thought may be useful and some inspiration was taken from some cool sites across the web. 

These settings are by no means our sticking plaster, the site was built using an accessibility-first approach, the settings are nothing more than preferences, a user can choose to use them, or choose not to, they do not affect anything else, we cannot track their usage and we don't want to track them. they're just an option that some folks may find useful and others may not care for. So just to clarify, this is not an overlay, it's completely custom and was built to complement a site that aims to be as accessible as possible.

## Can't we just use the browser settings for most of this?

Sure, some of the features are actually available in browsers, but is everybody "tech savvy" enough to know where to find those options? What about users using a mobile or tablet on a browser that does not allow extensions (Chrome?) how do they increase the text-spacing on a mobile? It's easy enough to do on a desktop/laptop browser, assuming the user knows what an extension is, how to find it, install it and use it, but Google don't let us install extensions on mobile, so perhaps there is some use for our users there?

I'm knocking on a little bit now, my vision is not as good as it once was. When I wake up in the morning, I tend to doomscroll on my phone, to see how close to the next mass extinction event we really are, I'm not a doom-monger as such, I'm just trying to establish whether it's worth buying a new kettle and it's probably wouldn't be worth it if all the bees die out tomorrow, the sun implodes or there's a barrage of nukes on the way. The trouble I face at the moment is limited to reading from my phone, especially in the mornings, it's often a little blurry, sure, I know how to change the font size on my phone's browsers, but usually after a few coffees, it's a little more manageable, also, some sites have text that is of a reasonable size already and I don't want to make that bigger, but also, my memory isn't the best, if I changed the font size in the browser, it would apply to all sites and when it comes to testing a site on my phone, I'd definitely forget to put it back to default. So, I will definitely use the font-size adjustments when reading articles from other contributors, whilst on my phone. I guess it's a bit like the Twitter web app, I actually have the font size slightly increased in there on my phone. Why don't I just get glasses, you ask? I did before and I couldn't get on with them, my solution to that was to just get a bigger phone when it came to getting a new one, I'm pretty much at the limit of how big phones actually get, an iPad won't fit in my pockets and I'm not cool enough to pull off a man-bag (fortunately), so I will bite the bullet one day, assuming the bees are still about and the bright object in the sky is the sun, of course.

## Okay, you're not actually funny, how do we make it?

Okay, so the mind set here was to develop these preferences using JavaScript and LocalStorage, pretty standard fare, really. But, for many of us know that oftentimes we want to add new features to something, perhaps a user may request something that helps them a little, perhaps there is something obvious I have missed, perhaps WCAG will introduce new ideas when version 3.0 starts to take its final form?

So, the idea was to create a reusable function, that will search for any and all usages of our preferences on a user's browser. It will set the correct state of the buttons in the modal, it will apply the correct preferences on repeat visits and most crucially (from a development perspective), it should be super straightforward to add more, if necessary.

### My approach

I wanted this reusable function to be fire-and-forget, I didn't want to be tampering with it should I need to add a new preference, at a later date. I just wanted to have to change the CSS to accommodate any future additions to the preferences. Which in my mind at least, made perfect sense, as at the basic level, all we really do is add a data-attribute or class to the `<html>` or `<body>` element in most cases.

So, I thought a good way to do that will be to simply check LocalStorage like we would for a theme, add any necessary data-attributes, add the correct state to the modal's buttons and then let CSS handle the presentation. In order to achieve this, I simply need to ensure that any new group of controls follows the same naming convention as the existing ones.

I'm not saying this is the best way, there are loads of folks out there that know more about JS than I ever will, but it is the best way I could think of for this use case.
