---
title: The accessible accessibility advent calendar 2026
summary: I'm jumping on the seasonal advent calendar fun this year, with my take
  on an accessible advent calendar. The challenge is to make a fun experience
  that is accessible to all
author: dlee
date: 2026-11-11
toc: false
tags:
  - Fun
  - Advent
isGuide: true
---
## Intro

Each year many developers create advent calendars for use during December, as a fun way to give the users a link to something interesting during the first 24 or 25 days of December. There are your CSS folk who create the all-singing, all dancing ones and the accessibility folk, who create accessible advent calendars, seldom do these two specialisms converge into one, though.

The accessible advents I have seen are very usable, for sure, but sometimes I find they are over-simplified and I'll touch on this, soon. The CSS ones are visually stunning, but not accessible and that's obviously bad. 

I'm sure there are examples out there I am unaware of, that are both accessible and visually stunning, but I couldn't find any and each year [Adrian Roselli does a round up of advent calendars](https://adrianroselli.com/2025/12/web-design-dev-advent-calendars-for-2025.html), and whilst some of the accessible ones are cool and accessible, I was often left wondering how all-singing and all-dancing one could be, whilst maintaining a very high level of accessibility, so here I am, I guess.

## The accessibility conundrum

Or is it? Sure, we can take an Occam's razor approach to building interfaces, making super simple and easy to use sites that do not have all of the visual aesthetics we would find on a CSS guru's site. I'm by no means a CSS guru, but I do enjoy it, a lot and I do sit firmly in the "Accessible sites don't have to be ugly" camp, because they don't.

When building digital products, we should all absolutely build with accessibility as the core deliverable, and it's fair to say that influences some of our "design" decisions. Not that we should ever do this, but building a site for everyone obviously means we wouldn't be chucking an autoplaying strobe-effect video anywhere on the site, but, so what, autoplaying videoes are naff, anyway and flashing stuff is the absolute worse thing to have autoplaying.

I don't think that accessibility is the limiting factor in fun or nice websites, at all, there's no rule that says accessible sites have to be bland and devoid of emotion. There are tonnes of stunning sites out there where accessibility was obviously a driving force in the project. So, I guess what I am trying to say is we can absolutely still have a little fun when creating things, some disabled folks will enjoy it, some won't, but the same can be said for non-disabled folks, it's personal taste that separates what we like and don't like in design, as long as that design is thoughtful and accessible to start with. An advent calendar is just a bit of fun, but it does need to be inclusive, so it's only natural that fun extends to everybody who uses it.

### The advent of the advent

I'm not the envious type, honest, but, my kid used to get about four advent calendars each year when she was little. I used to get her two, one which had a small chocolate treat for each day and another such as a Frozen or Lego one, but then inevitably, she'd get one or two more from family members. I didn't get envious at all, I would never be jealous of a child, so, I did what any non-envious dad would do and started buying myself one each year, a chocolate one that is, not a Disney Frozen one.

Each year, I now get myself a ~~chocolate~~ palm oil advent calendar and open it when my daughter opens hers, each morning. We have the same one and it'll often be a race to see who finds the correct door, first. A sort of treasure hunt, scanning the 24 or 25 doors, looking for a hard to see number. The contrast is intentionally poor, the labels intentionally difficult to find and, for many people, that's part of the fun, the hunt before the treat.

I've been wanting to do this for a few years, but never had time, I've been stacked out all year and now I've actually had a bit of time to do it.

Some advent calendars have 24 doors, others 25. I went down the 25 door route, for no other reason other than when I but them for my my kid and I, I seek out the 25 door ones, as you usually get a nicer treat on the 25th.

### Let's deconstruct an advent

This is just a generallisation of chocolate store-bought advent calendars:

* 24 or 25 doors
* The door labels are difficult to find (intentionally)
* The doors swing open for those of you who have the patience to open them carefully (unlike me)
* They have a busy, seasonal background and that background diminshes as every door is opened
* They often have a plastic tray that is sort of moulded into the shape of each chocolate
* The doors are in an irregular order, seemingly scattered across the whole thing at random, adding to the treasure hunt

The doors are simple enough, we just choose 24 or 25 and then decide a layout, we could choose 6 x 4 or 5 x 5. If we felt particularly adventurous, we could do a masonry type layout, where the doors are various sizes and both orientations.

This is the web and accessibility has to be the core aspect of this, I know WCAG Compliance isn't "accessible", but I didn't want to make it non-compliant, by using semi-transparent or light text as door labels. I was actually quite happy to be constrained by the various contrast requirements in WCAG, as I knew I could achieve what I set out to do without having to break those guidelines. I knew I could still preserve an element of the hunt, without an automated checker yelling at whoever ran it. I did make the labels intentionally small and whilst the contrast has always passed, I shared a staging link with a colleague who has good vision and they struggled to see the labels on a large screen, so I increased the size and contrast, as it's supposed to be fun, not frustrating.

We can make swinging out door effects with CSS, that's not overly difficult, although, I did have to look a couple of bits up, but that's normal, I guess. What was difficult at first was getting the doors to still contain the image during their opening transition, that was pretty complex, but I did find a guide on how to achieve that effect, which was cool.

A seasonal background, honestly, this was hard, it's an advent, I wanted something that just depicted a festive scene, I found Regent Street, London scene, which had lots of lights hanging from street furniture and buildings. What do we do about the buttons' borders, here? Well, typically, they would be perforated cardboard doors and we'd be able to see the cardboard colour a little, cool, I can sort of recreate that, but what about contrast against that background, I hear you think? As long as the label itself has adequate contrast, we don't need the "hit area" to also have 3:1 contrast against every pixel of the background, that wouldn't actually be possible with a single colour, against the image I chose, due to the vast number of colours in the image.

When the treat is removed, there's a sort of silhouette of the treat, a depression in the plastic, I guess. Well, box shadows and other elements are great for creating the illusion of depth, we can use those and again, I had to look up ways to achieve that.

Irregular order, what do we do here? Some I looked at showed an irregular order, but the keyboard order didn't match, so a keyboard user would just tab sequentially from 1 - 24/25, but that focus order would not visually match the layout. That in itself isn't a failure, but I just felt that is a developer deciding that a keyboard user doesn't want to participate in the hunt, because they have pretty much prevented a screen reader user from tabbing through, listening for the correct door. I have no doubt some screen reader users will appreciate that, but I'm pretty confident not all would. I took this inspiration from searching up Braille advent calendars, they're literally the same as non-Braille ones, in that they have the irregular order, they preserve the fun of the hunt and I didn't want to be a fun-sponge by removing that hunt aspect (keep reading).

### Zero calories, 100% fun

Now, on to the gifts. The primary purpose was just to give a link each day and that link will point to an accessibility related treasure, it could be an article, a video, a course or anything like that. Do I just put my link behind a door? I'd then be required to have two controls, for each door as I wanted the door-opening effect, not immediate navigation. I'd also not be able to add any text of substance inside each door, as it just wouldn't fit. We could of course pull out the "If it's meant to be ambiguous for all users" exception of 2.4.4, but, honestly, I'd rather just let folk know where a link will take them, then they can decide if they want to click it, or not. I find that useful, I'm definitely not alone in that. What, I used was buttons, each opens a dialog (after a delay), which contains a link and the little Christmas icon that was sitting behind the door. Not only that, but because these gifts aren't edible, they can be permanent, they are added to a table below the calendar, for safe keeping, which means you can come back at any time and they will still be there, waiting for you, both icons and links.

### The accessibility challenge

This was the most fun I've had in ages, yeah, I'm kinda boring. So, how do we make this accessible? I considered using an ARIA grid, but quickly dismissed that as the actual rows and columns are meaningless for 25 intentionally jumbled numbers. I could have added arrow key navigation, but they're just regular buttons, in a region and that would be quite unconventional and whilst that may benefit sighted keyboard users, it wouldn't benefit blind users, as unlike a regular calendar it's not going to be obvious what door is in any direction. As an example, being on door 8 could mean pressing down arrow and focus moving to door 2 or something, whereas on a regular calendar we just know to add 7 to 8 and down arrow will advance us to 15.

I considered a list, this appeared a quite popular choice, but then I thought about it and suspected it's potentially just be unwanted noise for a screen reader user. Let's expand on that with what we expect a screen reader to announce when navigating our doors "List 25 items, 1 of 25, 8, locked disabled, 2 of 25, 14, locked, disabled, 3 of 25, 22 locked, disabled" Does that create conflicting number cunfusion? Because the doors have just a number and a "current state" (locked, unlocked, opened). I used a random number generator to jumble up my order and I've just checked, and only four times will the listitem position match the door number. So, 21 times there will be 2 sets of numbers that do not match, it seems confusing because they are numbers and there's a direct conflict there. But, I can totally understand how knowing they are on 25 of 25 is useful, as then they know they have hit the end will exit the advent, but that and the first postion seemed like the only two useful times. Maybe I'm wrong, if I am, tell me, I'll put it right. But saying that, keep reading.

What about doors that are locked? Well, I couldn't make them actually disabled, because then they would not receive keyboard focus, so that would be me deciding that everyone who doesn't use a pointing device can't participlate in the hunt. So, I just used `aria-disabled` and appended the day with "Locked", which does seem a little repetitive, as I guess they would both be understood to mean the same thing, in this context, but I replace that appended text with "unlocked" or "Opened", depending on whether the door is just available or has previously been opened. I also remove the `aria-disabled` property and add an `aria-haspopup` dialog, for unlocked doors. Should a user attempt to open a locked door, a padlock appears for a sighted user and an announcement is made for a screen reader user.

It's still a fair bit of tabbing, especially getting to the bottom row, but (keep reading), in essence, we simply have 25 buttons in a row and I use CSS to display those in a grid, it's linear, there's no finger gymnastics and there are focus rings that I didn't scrimp on (I had to create an Oreo effect ring, as that was the only way I could gurantee one ring had perceivable focus against the background image.

### Preferences for all

I always knew I was going to start from a point that mimicked an actual advent calendar, with that similar hunt behaviour, but I also knew that would just be the default and compliant option. Compliance is never enough, though, so I absolutely factored in some preferences to make this easier to see or navigate for everybody that needs those accommodations. In some respects, this is a game, well the hunt part is and accessible games start out high-fidelity, but have a variety of user options to enable disabled folk to change the appearance, controls or even audio, to make that game accessible to them. So, the default view is a bit of a challenge to find the correct doors, not overly so, but some are a little tricky to spot due to the colours undernath the label background. So what did I do?

* Irregular numbering could well be cumbersome, unexpected or otherwise problematic for some folk. Some days would require a lot of tabbing just to reach that day's door, not everyone wants to participate in the treasure hunt, they just want the treasure, not a problem, there's a toggle for that, it'll shift the buttons into the correct numerical order, so you know which number is next. the first door will be door 1 and the last will be 25 (Thank George for this idea). This also mitigates me opting out of using a list, the door position is now the list position, always
* If you find my intentionally hard-to-see labels far too difficult to perceive, there's a toggle for that, it increases the size of the label, drastically ramps up the contrast and uses a a bright yellow background, so is much more perceivable than before
* Is the image background that forms the doors and bits between them (grid lanes?) too busy or 'in yer face', would you rather be able to see the border to the doors, with less visual noise? I added a filter of sorts, that tones it right done, just click the Dim background toggle and this will further increase visibility
* Animations are jarring? I do animate the doors like real doors opening on a hinge, and then create a little jiggle of the icon within, in my effort to replicate prying out a chocolate treat and finally, a modal scales into view. The whole animation takes 1.5s, none of that will happen if you have `prefers-reduced-motion` set, unless, you got it, you toggle it on, if you don't have it set, you can toggle them off
* Too much tabbing? Yeah, I get that, but I have tried to implement some workarounds for you. there is a Skip to first available door link, which will take you to the first unlocked door on the calendar (if there is one), additionally, I have added a toggle that will Disable opened doors and any future doors that you open, for as long as that toggle remains on. Just a note on this one, I couldn't disable the button immediately after opening, as focus moves to a modal, so I need to send focus back to where it was. Once you tab away, it will disable itself quietly in the background
* A late entry to my options was to make all the treat links open in a new tab, if the user chooses. I was testing on my phone, on a staging branch, with all the doors unlocked and wanted to ensure every link went where I expected and I'd not made any copy and paste errors, I got bored pretty quickly of the long press to open in a new tab, so I added a toggle for that, too. I'm not expecting this to be a cult hit, but I'll assume that it's a given someone will find it in 2027 or beyond and maybe they want to open every link in a new tab, it's a choice, it's there if they want that

Any of those above options can be combined, mix and match them, use them all, don't use any, whatever works for you. As an example, should you normalise the door order and disable opened doors, you'll never have to tab through a locked door, which could reduce the tabbing fatigue and frustration. Maybe the whole visual hunt is problematic for you, as it's difficult or impossible to find the correct doors? Increase label visibility and Dim the background.

I absolutely wanted to level the playing field and hopefully, what we thought of does just that? If there is absolutely anything I could have done better or an accessibility preference that would help, just let me know, I'll definitely include it next year. You also only ever have to set any of those prefs once, your prefs are stored securely in your browser, using the local storage API, no cookies, they're for Santa.

The advent does of course support `forced-colors`, `prefers-reduced-motion` and even `prefers-reduced-transparency` (To change the frosted glass modal backdrop to a solid colour). Naturally, things will look a little different in Forced Colors mode, shadows aren't available and that's because they're not supposed to be, so the illusions of depth aren't there, but everything is fully functional.

With respect to Forced Colors mode, I understand the importance of everything needs to follow a set theme, I did consider whether to auto-select the Dim background option if this mode is enabled, because that image is quite busy, but I didn't end up doing that, as the image forms the calendar itself and some folks will at least want to see it, once, before toggling it to Dim.

## Wrapping up

This has been fun, I did my best to combine two disciplines whilst still trying to preserve the fun aspect of an advent calendar and whilst I know that my difficult to see labels do "technically" pass WCAG, they're still not accessible for many people. That's the nature of a mass-produced advent calendar, the hunt is part of the fun, but this is the web, I can provide options for folk that need them and that's what I have done. I believe I have mitigated all of the things that could make playing along difficult, by making the visuals and interactivity customisable. That's not to say there isn't room for improvement, I'm sure I didn't think of everything, but please do share your suggestions or issues, and I'll be sure to add them in for next year.

[Here's the link to the advent calendar](https://www.makethingsaccessible.com/adventcalendars/2026/).
