---
title: The accessible accessibility advent calendar
summary: I'm jumping on the seasonal advent calendar fun this year, with my take
  on an accessible advent calendar. The challenge is to make a fun experience
  that is accessible to all
author: dlee
date: 2026-11-11
toc: false
tags:
  - Fun
isGuide: true
---
## Intro

Each year many developers create advent calendars for use during December, as a fun way to give the users a link to something interesting during the first 24 or 25 days of December. There are your CSS folk who create the all-singing, all dancing ones and the accessibility folk, who create accessible advent calendars, seldom do these two specialisms converge into one, though.

The accessible advents I have seen are usable, for sure, but sometimes I find they are over-simplified and I'll touch on this, soon. The CSS ones are visually stunning, but not accessible and that's pretty bad. 

I'm sure there are examples out there I am unaware of, that are both accessible and visually stunning, but I couldn't find any and each year [Adrian Roselli does a round up of advent calendars](https://adrianroselli.com/2025/12/web-design-dev-advent-calendars-for-2025.html), and whilst some of the accessible ones are cool and accessible, i just think in some circumstances that they lack the bells and whistles, a little.

## The accessibility conundrum

Or is it? Sure, we can take an Occam's razor approach to building interfaces, making super simple and easy to use sites that do not have all of the visual aesthetics we would find on a CSS guru's site. I'm by no means a CSS guru, but I do enjoy it, a lot and I do sit firmly in the "Accessible sites don't have to be ugly" camp, because they don't.

When building a site, we should all absolutely build for everyone and of course, that influences some of our "design" decisions. Not that we should ever do this, but building a site for everyone obviously means we wouldn't be chucking an autoplaying strobe-effect video anywhere on the site, but, so what, autoplaying videoes are naff, anyway.

We're building sites for everyone, not just disabled people, everyone. Disabled people are absolutely at the core of what I do, but not all disabilities are the same, Bob that uses a wheelchair may appreciate a spash of colour more than Sandra who isn't disabled. A blind user just cares that everything they need works for them, is understandable and they're not excluded by `<div>` soup, with a side of empty `alt` attributes, folk with low vision just want clear controls, labels and text and keyboard users want keyboard behaviour to work as it should, etc.

Design or style is always going to be subjective, some people will appreciate it, others not, those two camps are separtaed by taste, not disabled and non-disabled. As long we don't go building inaccessible interfaces with poor design, there's no reason why we can't add a little eye-candy.

### The advent of the advent

I'm not the envious type, honestly, but, my kid used to get about four advent calendars each year when she was little. I used to get here two, one which had a small chocolate treat for each day and another such as a Frozen or Lego one, but then inevitably, she'd get 1 or two more from family members. I didn't get envious at all, I would never be jealous of a child, so, I did what any non-envious dad would do and started buying myself one, a chocolate one, not a Frozen one.

Each year, I now get myself a ~~chocolate~~ palm oil advent calendar and open it when my daughter opens hers, each morning. Sometimes we have the same one and it'll often be a race to see who finds the correct door, first. A sort of treasure hunt, scanning the 24 or 25 doors, looking for a hard to see number. The contrast is intentionally poor, the labels intentionally difficult to find and, for many people, that's part of the fun, the hunt before the treat.

I've been wanting to do this for a few years, but never had time, I've been stacked out all year and now I actually have a bit of time to do it.

Some advent calendars have 24 doors, others 25. I went down the 25 door route, as a 5 x 5 grid fits well on a small 320px wide viewport and the doors are each in excess of 50px, with a small gap between them.

### Let's deconstruct an advent

this is just a genralisation of chocolate store-bought advent calendars:

* 24 or 25 doors
* The door labels are difficult to find (intentionally)
* The doors swing open for those of you who have the patience to open them carefully (unlike me)
* They have a busy or seeasonal background and that background diminshes as every door is opened
* They often have a plastic tray that is sort of moulded into the shape of each chocolate
* The doors are in an irregular order, seemingly scattered across the whole thing at random

The doors are simple enough, we just choose 24 or 25 and then decide a layout, we could choose 6 x4 or 5 x 5. We could, if we felt particularly adventurous, do a masonry type layout, where the doors are various sizes and both orientations.

This is the web and accessibility has to feature in this, I'm not normally one for just scraping the minimum, in fact, I find that a bit icky, but on this occasion, I have done exactly that. I created small light blue labels with a grey text that just has 4.53:1 contrast ratio (please keep reading), I made these quite small, there is no WCAG violation for small text, that's left to common sense, and on this occasion, this is for fun

We can make swinging out door effects with CSS, that's not overly difficult, although, i did have to look a couple of bits up, but that's normal, I guess. What was difficult at first was getting the doors to still contain the image during their opening transition, that was pretty complex, at least for me

A seasonal background, honestly, this was hard, it's an advent, I wanted something that just depected a festive scene that did not contain any religious stuff, as such, I just found a London street scene. What do we do about the buttons' borders, here? Well, typically, they would be perforated cardboard doors and we'd be able to see the cardboard colour a little, cool, I can sort of recreate that, but what about contrast against that background, I hear you think? Yeah, that would be a challenge, but, it's an advent calendar, it's for fun, so, I can use a low contrast dashed border, because there is nothing in WCAG that requires me to do so. As long as that hard-to-see text label passes against its blue background, I'm compliant 

When the treat is removed, there's a sort of silhouette of the treat, a depression in the plastic, I guess. Well, box shadows and other elements are geat for creating the illusion of depth, we can use those

Irregular order, what do we do here? Some I looked at showed an irregular order, but the keyboard order didn't match, so a keyboard user would just tab sequentially from 1 - 24/25. If I used a keyboard, I'd know how many times to press the <kbd>Tab</kbd> key and the fun of the hunt would have been taken away from me. I appreciate that this won't apply to ever keyboard user, some will absolutely appreciate that, but definitely not all and I didn't want to be a fun-sponge, so I didn't create a visual order and focus order mismatch (keep reading)

### Zero calories, 100% fun

Now, on to the gifts. The primary purpose was just to give a link each day and that link will point to an accessibility related treasure, it could be an articale, a video, a course or anything like that. Do I just put my link behind a door? Meh, that's gonna be quite naff on mobile, as there's little room to put any text and I didn't want to make links that were ambiguous. So, I used buttons, each opens a dialog, which contains a link, along with the little Christmas icon that was sitting behind the door. Not only that, but because these gifts aren't edible, they can be permanent, they are added to a table below the calendar, for safe keeping, which means you can come back at any time and they will still be there, waiting for you, icons and links.

### The accessibility challenge

this was the most fun I've had in ages, yeah, i'm kinda boring. So, how do we make this accessible? I considered using an ARIA grid, but quickly dismissed that as the actual rows and columns are meaningless in 25 intentionally jumbled numbers.I could have added arrow key navigation, but they're just regular buttons, in a group and that would be quite unconventional.

I considered a list, this appeared a quite popular choice, but then I thought about it and decided it's probably just unwanted noise for a screen reader user. Let's expand on that with what we expect a screen reader to announce when navigating our doors "List 25 items, 1 of 25, disabled, 6, locked. 1 of 25, 4 locked, disabled" What sense does that actually make? Is it useful to know your position in the grid, when pressing <kbd>Tab</kbd> will just advance focus to another seemingly random number? Maybe I'm wrong, if I am, tell me, I'll put it right.

What about doors that are locked? Well, I couldn't make them actually disabled, because then they would not receive keyboard focus, so that would be me deciding that everyone who doesn't use a pointing device can't participlate in the hunt. So, I just used aria-disabled and appended the day with "Locked", which does seem a little repetitive, as I guess they would both be understood to mean the same thing, in this context, but I replace that appended text with "unlocked" or "Open", depending on whether the door is just available or has previously been opened. I also remove the aria-disabled property and add an aria-haspopup dialog, but only when the door is not locked. Additionally I fire an alert, should a user attempt to open a locked door, a padlock appears for a sighted user.

It's still a fair bit of tabbing, especially getting to the later row, but (keep reading), in essence, we simply have 25 buttons in a row and I use CSS to display those in a grid, it's linear, there's no finger gymnastics and there are focus rings that I didn't scrimp on, those are highly visible, even against my busy background.

Obviously I scarped WCAG compliance in places, because this is supposed to replicate the "fun" aspect of an actual advent calendar, but I didn't stop there:

### Preferences for all

I always knew I was going to start from a point that mimicked an actual advent, with that similar hunt behaviour, but I also knew that would just be the default and compliant option. Compliance is never enough, though, so I absolutely factored in some stuff to make this easier to see or navigate for everybody that needs those accommodations. Sure, ordinarily something more "accessible" than my default would be the default, but this an advent calendar and it's supposed to be a bit like what I have. So what did I do?

* Irregular numbering could well be cumbersome, unexpected or otherwise problematic for some folk, not a problem, there's a toggle for that, it'll shift the buttons into the correct numerical order, so you know which number is next (Thank George for this one)
* If you find my intentionally hard to see labels impossible to perceive, I got you, there's a toggle for that, it increases the size of the label, drastically ramps up the contrast and uses a a bright yellow background
* Is the image background that forms the doors and bits between them too busy or 'in yer face', would you rather be able to see the border to the doors, with less viual noise? Dim the background with the toggle that tones it down
* Animations are jarring? I do animate the doors like real doors opening on a hinge, and then create a little jiggle of the icon within, in my effort to replicate prying out a chocolate treat and finally, a modal scales into view. The whole animation takes 1.5s, none of that will happen if you have prefers reduced-motion set, unless, you got it, you toggle it on, if you don't have it set, you can toggle them off
* Too much tabbing? Yeah, I get that, but I have tried to implement some workarounds for you. there is a Skip to first available link, which will take you to the first door you have missed (if you have) or today's door (if participating in December 2026), additionally, I have added a toggle that will disable all doors that have already been opened and any future doors that you open, for as long as that toggle remains on. This obviously removes them from the focus order and you may find it beneficial. All of your gifts from opened doors are added to a table, which will be just below the calendar once you have opened at least one door
* Any of those above options can be combined, mix and match, use them all, whatever works for you. As an example, should you normalise the order and disable opened doors, you'll nver have to tab through a locked door, which could reduce the fatigue. maybe the whole visual hunt is not working, dim the background, increase label visibility

I absolutely wanted to level the playing field and hopefully, what we thought of does just that. If there is absolutely anything I could have done better or an accessibility preference that would help, just let me know, I'll definitely include it next year, although depending on complexity and my availability, I'll try to squeeze it in straight away. You also only ever have to set any of those prefs once, your prefs are stored securely in your browser, using the local storage API, no cookies, they're for Santa.

## Wrapping up

This has been fun, I did my best to combine two disciplines whilst still trying to preserve the fun aspect of an advent calendar and whilst I perhaps seem a little hypocritical about scraping some conformance thresholds, as I always say "don't do that", it was done in good faith and every "just scrapes the minimum" thing I did, I mitigated with an option to make it significantly more accessible.

the advent does of course support prefers-forced-colors, perfers-reduced-motion and even prefers-reduced-transparency (To change the frosted glass modal backdrop to a solid colour). Naturally, things will look a little different inforced colours mode, shadows aren't available and that's by design, so the illusions of depth aren't there, but everything is fully functional.

If you celebrate Christmas, Merry Christmas, if you don't, then Happy New Year.

Here's the link to the advent calendar.
