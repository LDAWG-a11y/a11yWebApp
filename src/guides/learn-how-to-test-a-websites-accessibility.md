---
title: Learn how to test a website's accessibility
summary: This practical digital accessibility guide will help you learn how to
  test for WCAG failures, using any tools of your choice, as well as manual
  testing. We have created an inaccessible site, to help you along
author: dlee
date: 2024-05-31
toc: false
tags:
  - Testing
  - WCAG 2.2
  - Teaching and learning
isGuide: true
---
## Intro

This guide is going to be a little different than what I would usually do, typically my guides would focus on a singular component or pattern. This time, we're going to be doing an introduction to web accessibility testing.

There will be limited hand-holding here, it's not going to be a case of me finding a website and identifying the issues, to walk you through, we're going for something a little different, a little spicier, even. 

I've built a website for a fictional company and brace yourselves, I have intentionally made it inaccessible. Why would you do that? I hear you say. Well, firstly it's not a new idea, there's quite a few examples around the web, folks make them for various reasons:

* Show the differences between the results of accessibility checkers
* Create an inaccessible site, with a perfect automated checker score
* And, perhaps there are examples out there that will fulfil the same purpose of this one

You'd be right in thinking I feel a little dirty for making it, it goes against everything I have been doing for several years. But it also kinda felt fun, in an odd kind of way, not an evil genius kind of feeling, but more of a "Jeez, people actually get paid to write code like this on actual websites" kind of way.

## So, what it is the purpose?

So at Westminster, we are about to start running some training sessions for a group of colleagues, these colleagues want to learn how to identify WCAG issues, as well as other common accessibility barriers. We could have taken a site that's already in the public domain:

* We'd spend quite some time looking for one that contained enough failures to align with our training plan
* If we found one that we did not have total control over, there is every chance the site could change, which would make this guide age, pretty quickly
* We'd then have to build an accessible version of that site, as an example of how to fix it
* We'd have to be super careful about which site we chose, as we could quite easily get our employer in a spot of legal bother and potentially be disciplined for doing so

A custom-built small website that contains just enough accessibility issues to start folks off identifying issues on a site seemed the safest bet. This site won't change, there will be absolutely no changes to the code, whatsoever. This enables us and potentially you, to have an unchanging platform to conduct this training on, in the hope of getting somewhat consistent results.

There is of course a lot of nuance to accessibility testing, in that it is highly unlikely that two auditors given the same platform, will write up exactly the same issues. This is, in part due to interpretation of various success criteria, two people will interpret some of the more ambiguous aspects differently. It is also in part due to their levels of knowledge, the tools they use, their experience and multiple other factors.

One important distinction that can result in two different people having a slightly different results, is where they align themselves on WCAG purity:

* The folks at the lower end of that scale may just fail everything they believe or know to be an accessibility barrier
* The folks in the middle of that scale will likely know something is not explicitly a failure due to loopholes or wording and still write the issue up. But they will explain that they are aware the wording of the success criterion technically allows this, but the "intent" of the success criterion combined with the obvious accessibility issue does not make this a non-issue and it should be addressed with a suitable level of priority
* The purists, these are folks that typically understand every bit of nuance, every pitfall and every loophole in the WCAG docs. Their reports will typically follow WCAG to the letter, they will likely write up other defects in advisories or similar

When I first started testing websites, I was definitely at the low end of that scale, I was one of those "Which SC can I fail this against" folks. I believe my intent was pure, I wasn't failing things because the website would be better for me, I was failing them to make the website usable to people with disabilities. But, credibility is a thing, as I learned from others in the field, with much more experience, from their comments discussions or posts on various platforms, I began to understand this wasn't actually helping as much as I thought it was. The main concern here was if I just failed something against a SC criterion just because it seemed the closest fit and I was called out on it, by a vendor, the rest of my report and myself could lose all credibility. [Patrick Lauke has this excellent talk from a conference that discusses the pitfalls of over-reaching with WCAG SCs](https://www.youtube.com/watch?v=rBCR66aJZZc).

Nowadays, I find myself just past the middle of that scale. We do have Advisories and even "Weaknesses", but sometimes these can be overlooked, so I explain my rationale, the effects on a user and I state that whilst it does not "technically" fail, it is still an issue and my interpretation of the spirit of the SC and/or user expectation means that the issue should be prioritised, accordingly. This way, I'm not at risk of a vendor calling me a clueless clown (If you are an actual circus clown and I have offended you in some way, sorry) and dismissing the rest of my report.

Anyway, less about me. So the purpose of this test is not so much to determine who interprets what in which way, it's main objective is to simply to provide a decent chunk of accessibility issues, on an unchanging platform to assist with learning or training.

We haven't covered every single possible accessibility failure, because there are an endless of amount of components on the web, but we have provided what we believe to be a good amount.

## Warning

Unfortunately, as the purpose of this site is to be inaccessible, it will not play nicely with all assistive technologies, there are barriers that will be difficult or impossible to overcome with some assistive technologies. We have not included any strobe-effect animations, as we know the effect of these could in some cases be fatal or otherwise harmful. By design, the experience will not be great for some assistive technology users, in some parts. That is not to say that you cannot play along or just read along, but it is only fair that we provide this warning.

## So, let's dive in

Firstly, this isn't a test, as such. You definitely don't need to submit your report to us, we won't be marking and providing feedback on anything. If you find one of our interpretations are wrong, we will of course fix that and provide that information on the guide.

Secondly, there are only two rules, the first being "Thou shalt follow this guide in order" and the second being "There are no other rules". You are free to test with whatever tools, assistive technologies and manual methods you see fit. If you find one tool that finds every single issue, awesome, use that and please do share it with us. I jest, you won't find a single tool to get you through this, that's just wishful thinking.

### Do I need to find all of the issues?

Nope. This isn't a competition, don't put yourself under pressure, find what you can and then when you cannot find anymore, compare your findings, with ours. This is more applicable if you are just starting out, we all have to start somewhere, we mostly all get stuff wrong and sometimes we can go down a rabbit hole learning about something we haven't previously encountered.

### What do I need?

There's quite a bit of flexibility here

* Firstly, and most importantly, a desktop or laptop, I wouldn't advise using a phone or tablet for this
* A keyboard or an alternative input device that uses the keyboard API (Voice input software etc)
* A semi-automated or automated testing tool
* A browser
* A screen reader that works with your chosen browser
* A way to test colour contrast
* The ability to resize your browser window and zoom
* Access to the WCAG 2.2 docs
* A way to record your issues

If you unfamiliar with semi-automated tools, [we have this introduction to semi-automated tools, which should help](https://www.makethingsaccessible.com/guides/semi-automated-accessibility-testing-tools/).

### What are you going to use?

I will obviously test the horrors I have created and record them, so this is what I will be using, I'll also provide alternatives, where possible:

#### Hardware

* My laptop (MacBook)
* An external monitor
* A mouse
* A keyboard

#### Browsers

Primarily, I will be using Chrome, but once I need to fire up a screen reader, I will be using Safari, if you are using Windows you can use [NVDA (free)](https://www.nvaccess.org/download/) and Firefox or [JAWS (Paid or possible free trial)](https://support.freedomscientific.com/Downloads/JAWS) and Chrome. It's important that you get the "pairings" right, so just to be super clear:

* Safari and VoiceOver (MacOS)
* NVDA and Firefox (Windows)
* JAWS and Chrome (Windows)

For the most part, you can use whatever browser you want, as long as it is a current browser, such as Safari, Firefox, Edge, Chrome etc. You shouldn't dust off your Internet Explorer install, because pretty much everything will be broken, in every conceivable way. But once you are using a screen reader, make sure you are using the advised pairings from above. You only need one screen reader, we're not comparing those.

#### Tools

* Axe DevTools
* Chrome DevTools (this is accessed by either pressing F12 on a webpage or right-clicking and selecting "Inspect"), the process is the same for other browsers, however, they may have an slightly different wording in the context menus. I provided install guides in the previously linked guides, if you are unsure.
* [Colour Contrast Analyser,](https://www.tpgi.com/color-contrast-checker/) this is an installable tool, if you cannot install software on your work machine (like me), then you can use either a colour contrast checker extension, from your chosen browser's extensions store or better still, the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), which is web-based

#### Resources

* [WCAG 2.2 Qucikref, I've filtered this to only show Level A and Level AA](https://www.w3.org/WAI/WCAG22/quickref/?currentsidebar=%23col_customize&levels=aaa), that's not because AAA isn't important, it's just that in the trenches you will mostly be fighting against Level AA conformance, because "Minimum legal compliance", yuck. That's not to say that's always the case, but mostly it is
* I'm not using this, but if you are just starting out, you may find the [A11y project's Accessibility Checklist](https://www.a11yproject.com/checklist/) to be useful to know what to test for

### Be comfortable with your choices

It can be overwhelming at first, so many new tools to use all at once and so much to learn. This is why I have reduced the tools I'm going to use down to the bare minimum, so I don't overwhelm you with too much, if you are new to the game. I tend to use more tools than this, more browsers and more devices, but this is what I would consider to be an absolute minimum, for this guide. 

### I don't know how to use a screen reader, or even a keyboard

That's not a problem. We can link you to some handy guides that will show the keyboard strokes for each screen reader. I wouldn't get too wrapped up in all of the shortcuts, at this stage, we will just need the basic navigation commands.

* In all three screen readers and standard keyboard-only navigation the <kbd>Tab</kbd> key will move from one interactive items (links, inputs and buttons, etc), to the next. the "next" item will typically be determined by the DOM order, but can also be manipulated via scripting or even CSS.
* In order to "reverse" back up the page, the <kbd>Shift</kbd> key should be held down and then pressing <kbd>Tab</kbd> will reverse the direction. This also applies to standard keyboard navigation and all three screen readers
* <kbd>Enter</kbd> and <kbd>Space</kbd> will fire the "click" event on an interactive item, a `<button>` will repond to both those keys, a link will only respond to <kbd>Enter</kbd>. Again, this applies to both standard keyboard navigation and all three screen readers
* <kbd>Esc</kbd>, **should**, close items such as modal dialogs and other components that you may encounter, especially those that overlay other content
* Some items may be "composite widgets", a composite widget would typically be a single <kbd>Tab</kbd> stop and then navigation between its sibling controls would require using the cursor (Arrow) keys. Tis also applies for screen reader and keyboard-only navigation

#### Full keyboard controls for each screen reader

Take note of the "modifier" key/key combination, you may need this to navigate some elements or you may need to manually switch "modes" in JAWS or NVDA (VoiceOver does not have a manual "mode" switch).

* [NVDA - Keyboard shortcuts, Deque](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)
* [JAWS - Keyboard shortcuts, Deque](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)
* [VoiceOver - Keyboard shortcuts, Deque](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)

<div class="callout__tip"><span class="callout__icon"><strong class="visually-hidden">Tip: </strong></span><span class="callout__text">For some reason it is necessary to enable "Tab key navigation" on a Mac, so if you haven't already done this, then click the Apple icon > System settings > Keyboard and then toggle "Keyboard navigation" switch, to the On position. If that doesn;t work, your browser may have a control switched Off</span></div>

### So, we good to go?

Pretty much, yeah. just a couple of things to consider:

Consume everything, read it in your usual way and then with a screen reader, always read along with the screen reader. I'm trying desperately not to give the game away, but these are some friendly tips:

* Look and/or listen for unexpected behaviour
* Pay attention to important colours, their contrast, their size (if interactive)
* Test fully with a keyboard only, does everything work?
* Test fully with a screen reader, anything to report?
* Adjust the browser size, adjust the zoom levels. test again when you have adjusted the sizes, does everything act the way you expect?
* Can you complete all actions?
* Use your automated tools, remember they only test a snapshot of how the site is, at the moment you run the scan, they cannot open widgets for you, open them manually and test again
* If you understand HTML and/or ARIA, feel free to examine the DOM, feel free to validate the HTML at [the HTML validator](https://validator.w3.org/), which may highlight some issues
* Don't get too hung up on the tools, they can only get you so far
* Record your notes, just type them up somewhere, for comparison later, don't even worry too much if you don't know which SC to fail something against, just do what you can
* We have tonnes of guides on here now, feel free to consult them, if you find a component that smalls funny, or indeed, any other accessibility-related websites
* You tested an element on one page, it now appears on another, it looks the same, but is is?
* Take your time, it's not a race, it's a learning exercise
* There's a bonus problem, not a WCAG issue, but an issue, nonetheless

### One final word of warning

Be as alert as you can be, explore as deeply as you can. There are several issues on the test site that are intentionally difficult to find, some are quite deceptive, some will intentionally sail through pretty much any checking tool's scans. Remember, it's the gotchas that getcha, muahahaha.

### I'm ready to go, give me the link

Do not proceed beyond this point until you feel you are done, give it your best shot, but don't look at the answers below, find answers elsewhere, by all means, just not from below. Don't cheat, have fun and we'll go over it when in the next section:

HERE'S THE LINK FOR MAKING THIS ACCESSIBLE
