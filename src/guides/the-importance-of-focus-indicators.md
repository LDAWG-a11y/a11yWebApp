---
title: The importance of focus indicators
summary: Why are focus indicators important, who needs them, why are some
  designers and devs averse to them and how can we make useful focus indicators?
author: dlee
date: 2023-06-16
toc: true
tags:
  - Focus indicators
  - CSS
  - Best practice
isGuide: true
---
## Focus indicators intro

Once upon a time there was a really clever chap called Tim who created the web so we could all use it for the endless possibilities it brings. When Tim created the web, legend has it that he said "This is for everyone" and when he said everyone, he didn't mean just folks that use a mouse, he meant everyone as in all people.

Back then, the web was quite basic, I believe it was just links and text, links were underlined and I'm guessing here, but there were focus indicators too. I can access the first web page, but I can't access the first browser, so I could be wrong, but that's not really important.

These focus indicators provided a solid visual cue to which link had keyboard focus, so users of keyboards could make decisions based upon what they can actually see, as opposed to pot luck or guesswork.

Some years later, mutinous folks said "eww, the focus indicators look ugly" and many a willing developer across the web typed this little snippet: `*:focus {outline: none !important}` and just like that, the focus indicator became an endangered species, sigh.

### Are they ugly?

Different strokes for different folks, I guess. Some folks will say they are, but you can be pretty sure none of those folks need them. It's basically a case of people who can use a mouse or touchscreen etc, deciding the people that can't use those devices don't really matter, which obviously doesn't say much about the folks that insist they are removed. We'll keep it clean and say no more.

I get aesthetics, some humans are creative and expressive and they want to create "stunning websites", which in itself is not a problem, but what they need to do, is create stunning usable websites, that can be used by everyone. Design a focus indicator that works with your design, one that is perceivable to users, if you don't do this, your design is broken.

There are a number of things in the real world that affect the aesthetic of an object or product that we have just learned to accept, we don't even think of it anymore, here's a few examples:

* The numberplate on a car or motorcycle, the numberplate affects the aesthetics, right? But we all know they are required, so we just got used to them
* The raised camera on your phone, remember when smartphones were flush on both sides, but we all wanted high resolution cameras, instead of potatoes? Yep, the camera part of the back of the phone need to be deeper than the actual phone, as we didn't want a brick in our pockets/hand/bag etc. We got used to that too
* The seatbelt, it creases your clothes and it can make reaching into your pockets more difficult (hopefully we only do this as a passenger), but as most of us don't fancy testing what would win in a fight between our faces and the windscreen or being fined by the local constabulary, we've learned to roll with it

Embrace focus indicators, if we all ensured all of the interactive elements on our websites had focus indicators, we'd soon get used to them, because they would be everywhere and anyway, for the most part, only keyboard users will ever see them, but more on that later.

### I don't need focus indicators

You actually probably do. You probably use them quite often, do you have a games console, a smart TV or external streaming device? chances are you have one of those things and you rely on focus indicators all of the time.

* On a games console, you may use the joysticks or directional pads to navigate through the settings
* On a smart TV or external streaming device, you will likely be using the arrow buttons on the remote control to pick which show you want to watch

Imagine if Netflix, Apple, YouTube, Amazon, Sony etc just decided to not show you which item you had focused on and left you guessing, you'd be fuming, right? I would be, in those situations I need them, I rely upon them. Sure I could probably guess my way around by counting things and then pressing the keys the same number of times in the correct direction, but this would still be infuriating and would be a brittle approach on a website, especially when some developers don't know their `<button>` from their `<div>`, as what you may be counting, may not be focusable at all, even though it should be.

More importantly, it's not those that don't need them, it's about those that do. You want people to complete tasks on your "stunning website", you probably want them to come back, you want them to leave with positive experiences such as:

* The site was intuitive
* The interface was understandable
* I could easily find what I was looking for
* The design made the site easy to understand
* And maybe the site was really fresh looking

Why would we not want people who cannot use a mouse or a touchscreen to leave with those same positives? I mean, some folks that can't use a touchscreen or mouse will have a permanent disability and always need to use a keyboard, some may have a temporary disability and some may just have an Apple mouse that has just died and they can't use just now, as it is plugged in :D.

So, now we have the intro out of the way, which I probably waffled on, let's get to the more technical stuff.

### WCAG compliance

There are a couple of WCAG success criteria we need to be aware of which relates to focus indicators:

* [2.4.7 Focus Visible - Level AA](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
* [1.4.11 Non-text Contrast - Level AA](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)

I've wrote them in that order for a reason, the first Focus Visible essentially means that when an interactive element receives keyboard focus, there is a visible change. It appears the definition of visible is way more flaky that it needs to be, in fact, I don't think it means visible at all. Some folks who have been in this game way longer than me and are by extension way more experienced and knowledgable claim that the visual change would still technically pass, even if it were imperceptible to most humans, it could just be a single pixel, changing to off-white, over a white background. That obviously wasn't the intention when the requirement was written, but I guess there are people out there that will find loopholes in anything.

So, given that somebody found the loophole, in WCAG 2.1, Non-text Contrast was introduced and whilst this particular requirement is not just about focus indicators, it does include focus indicators and it requires that the contrast between the indicator and adjacent (touching) pixels is at least 3:1. This was obviously an improvement, as now the minimum requirement had a minimum more perceivable contrast ratio to meet, but alas, it didn't set a minimum size, so technically a 1px indicator would still pass.

The folks working on WCAG 2.2 did try to put an end to all this confusion by creating a new requirement called 2.4.11 Focus Appearance - Level AA, which required a certain area the indicator must cover for an element. Sadly, this requirement was eventually bumped up to a AAA requirement, which means it likely won't be used that often. I believe it was moved to AAA as there was confusion with the wording and how evaluators interpreted it, still, it's a shame though as this would have been a welcome addition by users who don't use pointing devices.

So, just because 1 pixel that has a minimum 3:1 contrast ratio against any pixel it touches, is supposedly technically permissible, it's obviously not very useful to users, so please don't go for the minimum, we can do better.