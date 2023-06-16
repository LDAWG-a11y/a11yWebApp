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

## WCAG compliance

There are a couple of WCAG success criteria we need to be aware of which relates to focus indicators:

* [2.4.7 Focus Visible - Level AA](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
* [1.4.11 Non-text Contrast - Level AA](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)

I've wrote them in that order for a reason, the first Focus Visible essentially means that when an interactive element receives keyboard focus, there is a visible change. It appears the definition of visible is way more flaky that it needs to be, in fact, I don't think it means visible at all. Some folks who have been in this game way longer than me and are by extension way more experienced and knowledgable claim that the visual change would still technically pass, even if it were imperceptible to most humans, it could just be a single pixel, changing to off-white, over a white background. That obviously wasn't the intention when the requirement was written, but I guess there are people out there that will find loopholes in anything.

So, given that somebody found the loophole, in WCAG 2.1, Non-text Contrast was introduced and whilst this particular requirement is not just about focus indicators, it does include focus indicators and it requires that the contrast between the indicator and adjacent (touching) pixels is at least 3:1. This was obviously an improvement, as now the minimum requirement had a minimum more perceivable contrast ratio to meet, but alas, it didn't set a minimum size, so technically a 1px indicator would still pass.

The folks working on WCAG 2.2 did try to put an end to all this confusion by creating a new requirement called 2.4.11 Focus Appearance - Level AA, which required a certain area the indicator must cover for an element. Sadly, this requirement was eventually bumped up to a AAA requirement, which means it likely won't be used that often. I believe it was moved to AAA as there was confusion with the wording and how evaluators interpreted it, still, it's a shame though as this would have been a welcome addition by users who don't use pointing devices.

So, just because 1 pixel that has a minimum 3:1 contrast ratio against any pixel it touches, is supposedly technically permissible, it's obviously not very useful to users, so please don't go for the minimum, we can do better.

### Don't browsers add an indicator by default?

Browsers do add their own focus indicator for interactive elements, which is part of the User Agent Stylesheet. Technically, if you don't modify the focus indicator in any way at all, then this that is enough to pass, but the moment you add just 1 line of CSS to the focus style of an element, you're on the hook to ensure it passes on all browsers and devices etc. Let's not get carried away though, just because it is enough to technically pass, doesn't necessarily mean it's the best.

### Show me the different browser focus styles

I've made a basic Codepen, each has three links and each is on a different coloured background. The link text in each passes has a contrast against its background that is higher than the 4.5:1 minimum for text of the size I used. I have not modified the focus styles in any way and the aim is to view the Codepen in each browser. For the purposes of this, I will just remain on the same device (MacOS) and I will use Safari, Chrome, Firefox and Edge, there are of course other browsers and operating systems that could also help us understand the problem further:

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="css,result" data-slug-hash="dyQMooX" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/dyQMooX">
  Untitled</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

What did we notice there? Just for transparency and as things always change:

* Today's date is Friday 16th June 2023
* I'm using a Mac on MacOS 13.4
* Chrome version is: 114.0.5735.133
* Firefox version: 115.0b3
* Safari version: 16.5 (18615.2.9.11.4)
* Edge version: 114.0.1823.51

#### Firefox comments

* The focus indicator cannot be seen at all in the first (purple) container can it? That's because Firefox uses the colour rebeccapurple (#663399) for the focus indicator, I intentionally used that background, for that reason.
* The second container which has a CSS background called cornflowerblue (#6495ED) does make it easier to see the focus indicator in Firefox, but if we added a single thing to this such as making the focus ring thicker, then we are immediately on the hook and we actually fail, as the contrast between the focus ring and the container's background is only 2.82:1, which is pretty close to the required minimum, but there's no discretion here, it's pass or fail.
* The final container which uses the page's white background is absolutely fine, there's a strong contrast of 8.4:1 here.

Here is a screenshot to visually show the indicators:

![Screenshot of focus indicators in Firefox, visually showing the issues mentioned above.](src/guideImg/dl-ff-focus.png)

#### Chrome comments

Chrome uses a 2 colour ring, the colours of that ring are white (#FFF) and blue (#005FCC), this particular indicator has a greater chance of passing than the Firefox one, as if one colour fails, the other should be visible too. Does it pass on all three of our links, if we don't edit the focus styles at all, then technically, yes. But if we try to improve it by making it thicker, then we still fail.

* We're good on our first link, as the white is the same colour as the text, which has an 8.04:1 contrast against the rebeccapurple background, so we don't need to worry about the blue part of the ring "passing".
* Here's where things get interesting: On the second link, with the cornflowerblue background, blue ring fails against our background with a contrast of 2.01:1 and the white ring fails against our background with a contrast of 2.97:1, which is extremely close, but remember, no discretion here.
* On the third link, with the white background, we can't see the white ring at all, which is OK, as we can see the blue ring against our background, as it has a 5.98:1 contrast, which is of course a good contrast. I'm sure we would be able to get that colour to fail more significantly should we choose a different background colour.

A screenshot of all three links is below:

![Screenshot of focus indicators in Chrome, visually showing the issues mentioned above.](src/guideImg/dl-chrome-focus.png)

#### Edge comments

much like Chrome, Edge uses the 2 colour ring, but the Edge team opted for black and white rings, which is the highest possible contrast 21:1. I think in most instances, it would be difficult to not be able to see one of the rings, but it's definitely not bulletproof. Maybe if we created a button, with a white background and a black box-shadow border, we could get the white part to sit over our button's white background and the black part to sit over our border, but I'm not going to attempt to do that, as the aim of this guide is to understand focus indicators, not put a sheer amount of effort in to blend them in to something. Does it pass against our little demo, if we don't modify it, yes and even if we do modify it, it will also pass using the existing 2 rings as long as the colours aren't changed:

* For the first link, the white ring comfortably passes against the rebeccapurple background.
* For the second ring, the black ring comfortably passes against our cornflowerblue background.
* For the third link, we have maximum contrast between our white background and the black ring.

![Screenshot of focus indicators in Edge, visually showing the issues mentioned above.](src/guideImg/dl-edge-focus.png)

#### Safari comments

Safari uses a blue ring (#0067f4), the ring colour is quite light, so it's immediately clear we're going to run into low contrast issues against our three backgrounds:

* On the first link with the rebeccapurple background the contrast is 1.69:1, which is very low and could easily be missed or difficult to see for some folks.
* On the second link with our cornflowerblue background, the contrast is 1.66:1, which is also very low.
* On the third link with the white background, the contrast is 4.94:1, which is is a strong contrast.

Here's the screenshot of the Safari focus indicators:

![Screenshot of focus indicators in Safari, visually showing the issues mentioned above.](src/guideImg/dl-safari-focus.png)

### Summary of user agent focus indicators

The aim of the experiment above was to demonstrate that the default focus indicator isn't necessarily that great for users. This is because we may have sites that have different backgrounds in places, it may pass comfortably on one component and fall down on another. I didn't even create a test case here with dark mode enabled, which would likely introduce more interesting results.

I know that the default indicator does not fail if it is unmodified, but we just made the assumption we had a basic modification, just to demonstrate where the user agent indicators could fail.

Given the importance of the focus indicator and how some folks rely on it to use our sites I'm of the opinion that we should author our own, highly perceivable indicators. Browsers are smart, but they don't appear to use those smarts to intelligently create perceptible focus indicators, maybe its expensive from a performance viewpoint or maybe it's too complex to achieve? Engineering for browsers is way beyond my skillset, so I don't know the answer to that.

### I want to add focus indicators, but I'm getting pushback

This is sadly a thing, you may work on a team where a colleague with more clout than you hates "ugly focus indicators" and it can be difficult to get any traction if they're likely to die on that hill. 

First things first, try to educate them, explain how actual people need these, users of that site will need them and when they discover they don't exist, they may just go elsewhere.

The second thing I'd try is compromise, we have the `:focus-visible` pseudo class now, which on most elements will only ever be seen by somebody using a keyboard. I believe the hatred for the `:focus` selector stemmed from the fact it momentarily displayed on a mouse click or a tap, so ultimately `:focus-visible` was created to provide that compromise and is supported in all evergreen browsers. [It would need a fallback for older browsers](https://www.tpgi.com/focus-visible-and-backwards-compatibility/), but maybe your team don't care so much for older browsers, so you can just do that?

If none of that works, hopefully some other team poaches you, where your considerations are welcomed.

## Let's create some focus indicators

First, let's have a stab at a global indicator, I'd not necessarily recommend this as a permanent solution, but if you're testing a site and it's immediately clear all focus indicators have been removed and say it's a CMS where you can add some custom CSS, this can certainly improve things pretty quickly, maybe just as a temporary sticking plaster or maybe it will work as a permanent solution, but you'd need to test that yourself.

### Our experiment helps us here

In our experiment, we discovered that the 2 ring indicators typically fared better than the single ring indicators and this would have a greater chance of being true on sites that had sections that had different backgrounds.

We also discovered that by having a very high contrast between the 2 rings, the likelihood of it falling down was significantly reduced, I'm inclined to think in most instances it would pass and you'd have to try to break it to actually break it, but our little experiment was quite basic, so I'm sure a thorough battle test would find some other situations where it isn't effective.

What if we could create an Oreo type indicator, by Oreo I mean 2 dark layers and 1 light layer sandwiched within? We're not going for aesthetics right now, we're just brute-forcing something that may be as close to unbreakable as we can get, but obviously that would require our CSS to be suited to our needs.

Shall we use pseudo-elements? We could use both the `::before` and `::after` along with an `outline` to create an Oreo type ring, I'm not going down this route though, as we're pretending we're just adding this to the Custom CSS file of a Wordpress site (or similar), as a quick fix and on at least on some of the WordPress sites I have looked at, some theme developers use both those pseudo elements in the main navigation, for what appears to be regulating the positioning of elements, yeah my thoughts exactly.

If we get a little clever with a box-shadow and an outline, we can achieve the same effect: