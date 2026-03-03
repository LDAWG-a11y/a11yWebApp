---
title: Accessibility testing training tool guide
summary: This practical digital accessibility guide will help you learn how to
  test for WCAG failures, using any tools of your choice, as well as manual
  testing. We have created an inaccessible site, to help you along
author: dlee
date: 2026-02-06
toc: false
tags:
  - Testing
  - WCAG 2.2
  - Teaching and learning
isGuide: true
---
## Intro

This guide is going to be a little different than what I would usually do, typically my guides would focus on a singular component or pattern. This time, it's a broken site we'll be looking at and I'll be showing how to report the issues and/or fix them. Initially, I was going to call this "Learn how to Test a Website's Accessibility", which sort of makes sense, but also indicates I would be the teacher. I'm not going to be teaching anything, I will provide some clues, but I guess the objective is to find what you can and then compare with my findings.

I've built a website for a fictional company and brace yourselves, I have intentionally made it inaccessible. Why would you do that? I hear you say. Well, firstly it's not a new idea, there's quite a few examples around the web, folks make them for various reasons:

* Show the differences between the results of accessibility checkers
* Create an inaccessible site, with a perfect automated checker score
* And, finally there are examples out there that fulfil the same purpose of this one

You'd be right in thinking this exercise probably felt wrong, it goes against everything I have been doing for several years. But it also kinda felt fun, in an odd kind of way, not an evil genius kind of feeling, but more of a "Jeez, people actually get paid to write code like this on actual websites" kind of way. Yeah, that was a thinly veiled dig at devs that do not care, come at me.

I honestly found it really difficult to create the site, it messed with my mind a little, in that I spent a heap of time scratching my head wondering why folk go to all the effort to make something wrong, when often HTML alone will just make it right in a much easier way.

## So, what it is the purpose?

So at Westminster, we are about to start running some training sessions for a group of colleagues, these colleagues want to learn how to identify WCAG issues, as well as other common accessibility barriers. We could have taken a site that's already in the public domain:

* We'd spend quite some time looking for one that contained enough failures to align with our training plan
* If we found a site in the wild, obviously we'd have no control over it, there is every chance the site would change, which would make this guide age, pretty quickly
* We'd then likely have to build an accessible version of that site, as an example of how it should be when "fixed", because we would encourage participants in the training to take note of the difference with AT, etc
* We'd have to be super careful about which site we chose, as we could quite easily get our employer in a spot of legal bother and potentially be disciplined for doing so and that's not a risk we're willing to take

A custom-built small website that contains just enough accessibility issues to start folks off with identifying issues seemed the safest bet. This site won't change (after a period of Beat testing), there will be absolutely no changes to the code, whatsoever. This enables us and potentially you, to have an unchanging platform to conduct this training on, in the hope of getting consistent results.

There is of course a lot of nuance to accessibility testing, in that it is highly unlikely that two auditors given the same platform, will write up exactly the same issues. This is, in part due to interpretation of various success criteria, two people will interpret some of the more ambiguous aspects differently. It is also in part due to their levels of knowledge, the tools they use, their experience and multiple other factors.

One important distinction that can result in two different people having a slightly different results, is where they align themselves on "WCAG purity":

* The folks at the lower end of that scale may just fail everything they believe or know to be an accessibility barrier, irrespective of whether it actually fails a WCAG success criterion (SC)
* The folks in the middle of that scale will likely know something is not explicitly a failure due to loopholes or wording and still write the issue up. But they will explain that they are aware the wording of the success criterion "technically" allows this, but the "intent" of the success criterion combined with the obvious accessibility issue does not make this a non-issue and it should be addressed with a suitable level of priority. There is of course some overlap here, in that sometimes it may appear that something fails due to ambiguous wording and these folks may believe it to be a failure and write it up as such.
* The purists, these are folks that typically understand every bit of nuance, every pitfall and every loophole in the WCAG docs. Their reports will typically follow WCAG to the letter, they will likely write up other defects in advisories or similar

When I first started testing websites, I was definitely at the lower end of that scale, I was one of those "Which SC can I fail this against" folks. I believe my intent was pure, I wasn't failing things because the website would be better for me, I was failing them to make the website usable to people with disabilities, or so I believed. But, credibility is a thing, as I learned from highly-experienced others in the field, by reading their comments discussions or posts on various platforms. I began to understand this wasn't actually helping as much as I thought it was. The main concern here was, if I just failed something against a SC criterion just because it seemed the closest fit and I was called out on it, by a vendor, the rest of my report and myself could lose all credibility and the risk would be that nothing gets fixed, which is more harmful.

Nowadays, I find myself somewhere in the middle of that scale, I'm by no means as smart as the folk who contribute to WCAG at W3C, but I do often read their lengthy discussions on GitHub, to improve my own knowledge. We do have "Weaknesses" in our reports, where we put non-WCAG issues. I explain my rationale, the effects on a user and/or their AT and I state that whilst it does not "technically" fail WCAG, it is still an accessibility issue. WCAG is not the be all and end all of accessibility, it's a minimum standard for "compliance" in many territories, not some magical standard that that could meet every disabled person's needs. Here, though, we will just be using WCAG, as other stuff would perhaps be at more risk of being subjective.

Anyway, less about me. So the purpose of this platform is not so much to determine who interprets what in which way, it's main objective is to simply to provide a decent chunk of accessibility issues, on an unchanging platform to assist with learning or training.

## A word of warning

Unfortunately, as the purpose of the test site is to be inaccessible, it will not play nicely with all assistive technologies, there are barriers that will be difficult or impossible to overcome with some assistive technologies. we have not included any strobe-effect animations, as we know the effect of these could in some cases be fatal or otherwise physically harmful. By design, the experience will not be great for some assistive technology users, in some parts. That is not to say that you cannot play along or just read along, but it is only fair that we provide this warning.

There are of course some issues on this site that require use of senses that not all users will have, there may be sounds, contrast issues or instances that require touch and I know that some users will not be able to catch those. I can only apologise for that, I genuinely feel uncomfortable putting something out there that isn't inclusive for all, but the only way we can do this is by having actual issues and because they are are issues, by their very definition, they're going to be problematic to some folk.

## So, let's dive in

Firstly, this isn't a test, as such. Please don't submit your report to us, we won't be marking or providing feedback on anything, as we do not have the time.

Secondly, there are only two rules, the first being "Thou shalt follow this guide in order" and the second being "There are no other rules". You are free to test with whatever tools, assistive technologies and manual methods you see fit. If you find one tool that finds every single issue, awesome, use that and please do share it with us. I jest, you won't find a single tool to get you through this, that's just wishful thinking. 

### Do I need to find all of the issues?

Nope. This isn't a competition, don't put yourself under pressure, find what you can and then when you cannot find anything else, compare your findings, with ours. This is more applicable if you are just starting out, we all have to start somewhere, we mostly all get stuff wrong and sometimes, we can go down a rabbit hole learning about something we haven't previously encountered.

### What do I need?

There's quite a bit of flexibility here:

* Firstly, and most importantly, a desktop or laptop, I wouldn't advise using just phone or tablet for this, although you can of course use them in addition to an actual desktop or laptop 
* A keyboard or an alternative input device that uses the keyboard API (Voice input software, switches, etc)
* A semi-automated or automated testing tool can help
* A browser
* A screen reader that works best with your chosen browser
* A way to test colour contrast
* The ability to resize your browser window and zoom
* Access to the [WCAG 2.2 docs](https://www.w3.org/TR/WCAG22/)
* A way to record your issues (we use Word)

If you unfamiliar with semi-automated tools, [we have this introduction to semi-automated tools, which should help](https://www.makethingsaccessible.com/guides/semi-automated-accessibility-testing-tools/).

### What are you going to use?

I will obviously test the horrors I have created and record them, so this is what I will be using, I'll also provide alternatives, where possible:

#### Hardware

* My laptop (MacBook)
* An external monitor
* A mouse
* A keyboard

#### Browsers

Primarily, I will be using Chrome, but once I need to fire up a screen reader, I will be using Safari, if you are using Windows you can use [NVDA (free)](https://www.nvaccess.org/download/) and Chrome (This can change due to the results of the annual WebAIM Survey, so please do check that is still the recommended pairing, (if you are accessing in 2026 and beyond) or [JAWS (Paid or possible free trial)](https://support.freedomscientific.com/Downloads/JAWS) and Chrome. It's important that you get the "pairings" right, so just to be super clear:

* Safari and VoiceOver (MacOS)
* NVDA and Chrome (Windows) (may change again, in the future)
* JAWS and Chrome (Windows)

For the most part, you can use whatever browser you want, as long as it is a current browser, such as Safari, Firefox, Edge, Chrome etc. You shouldn't dust off your Internet Explorer install, because pretty much everything will be broken, in every conceivable way. But once you are using a screen reader, make sure you are using the advised pairings from above. You only need one screen reader, we're not comparing those.

#### Tools

* Axe DevTools (browser extension)
* Microsoft Accessibility Insights (browser extension)
* Chrome DevTools (this is accessed by either pressing F12 on a webpage or right-clicking and selecting "Inspect"), the process is the same for other browsers, however, they may have slightly different wording in the context menus. I provided install guides in the previously linked guides, if you are unsure.
* [Colour Contrast Analyser,](https://www.tpgi.com/color-contrast-checker/) this is an installable tool, if you cannot install software on your work machine (like me), then you can use either a colour contrast checker extension, from your chosen browser's extensions store or better still, the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), which is web-based

I will identify which tools or methods I used to find the issue. I will at times use bookmarklets, which are just small scripts that mostly serve a single purpose. To install these, you simply drag (or use the context menu) them into your bookmarks bar and when you want to use them, you just click them. I'll provide a link to each that I use, when I use it the first time.

#### Resources

* [WCAG 2.2 Qucikref, I've filtered this to only show Level A and Level AA](https://www.w3.org/WAI/WCAG22/quickref/?currentsidebar=%23col_customize&levels=aaa), that's not because AAA isn't important, it's just that in the trenches you will mostly be fighting against Level AA enemy combatants (AKA legal conformance), the AAA stuff is usually snipers in  we don't encounter (sad, but true)
* I'm not using this, but if you are just starting out, you may find the [A11y project's Accessibility Checklist](https://www.a11yproject.com/checklist/) to be useful to know what to test for

### Be comfortable with your choices

It can be overwhelming at first, so many new tools to use all at once and so much to learn. This is why I have reduced the tools I'm going to use down to the bare minimum, so I don't overwhelm you with too much, if you are new to the game. I tend to use more tools than this, more browsers and more devices, but this is what I would consider to be an absolute minimum, for this guide. 

### I don't know how to use a screen reader, or even a keyboard

That's not a problem. We can link you to some handy guides that will show the keyboard strokes for each screen reader. I wouldn't get too wrapped up in all of the shortcuts, at this stage, we will just need the basic navigation commands.

* In all three screen readers and standard keyboard-only navigation the <kbd>Tab</kbd> key will move from one interactive items (links, inputs and buttons, etc), to the next. the "next" item will typically be determined by the DOM order, but can also be manipulated via scripting or even CSS.
* In order to "reverse" back up the page, the <kbd>Shift</kbd> key should be held down and then pressing <kbd>Tab</kbd> will reverse the direction. This also applies to standard keyboard navigation and all three screen readers
* <kbd>Enter</kbd> and <kbd>Space</kbd> will fire the "click" event on some interactive itema, a `<button>` will respond to both those keys, a link will only respond to <kbd>Enter</kbd>. Again, this applies to both standard keyboard navigation and all three screen readers
* <kbd>Esc</kbd>, **should**, close items such as modal dialogs and other components that you may encounter, especially those that overlay other content

#### Full keyboard controls for each screen reader

Take note of the "modifier" key combination, you will need this to, read non-interactive elements, navigate some elements or you may need to switch "modes" in JAWS or NVDA (VoiceOver does not have a manual "mode" switch).

* [NVDA - Keyboard shortcuts, Deque](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)
* [JAWS - Keyboard shortcuts, Deque](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)
* [VoiceOver - Keyboard shortcuts, Deque](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)

<div class="callout__tip"><span class="callout__icon"><strong class="visually-hidden">Tip: </strong></span><span class="callout__text">For some reason it is necessary to enable "Tab key navigation" on a Mac, so if you haven't already done this, then click the Apple icon > System settings > Keyboard and then toggle "Keyboard navigation" switch, to the On position. If that doesn't work, your browser may have a control switched Off, so enter the Settings for that browser and locate the toggle switch that will have a name similar to "Press tab to highlight an element in a webpage", that is available in Settings > Advanced in Safari</span></div>

### So, we good to go?

Pretty much, yeah. just a couple of things to consider:

Consume everything, read it in your usual way and then with a screen reader, always read along with the screen reader. I'm trying desperately not to give the game away, but here are some friendly tips, which should be especially useful for those of you that are newer to the field:

* Look and/or listen for unexpected behaviour
* Pay attention to colours and their contrast
* Test fully with a keyboard only, does everything work, can you see where you are and does anything odd happen?
* Test fully with a screen reader, anything to report?
* Adjust the browser size, adjust the zoom levels, test again when you have adjusted the sizes (320px width & 256px height is an absolute must), does everything act the way you expect?
* Can you complete all actions?
* Use your automated tools, remember they only test a snapshot of how the site is at the moment you run the scan, they cannot open widgets for you, open them manually and test again
* If you understand HTML and/or ARIA, feel free to examine the DOM, feel free to validate the HTML at [the HTML validator](https://validator.w3.org/), which may help highlight some issues
* Don't get too hung up on the tools, they can only get you so far and honestly, they won't get you far at all, here
* Record your notes, just type them up somewhere, for comparison later, don't even worry too much if you don't know which SC to fail something against, just do what you can
* We have tonnes of guides on here now, feel free to consult them or indeed, any other accessibility-related websites, if you find a anything that smells funny
* You tested an element on one page, it now appears on another, it looks the same, but is is?
* Take your time, it's not a race, it's a learning exercise

### How should I structure my findings?

There are a multitude of formats that accessibility professionals use to write a report, some may write a brief description in a spreadsheet, some may write a lengthier one, others may use word processing software such as MS Word or Google Docs, etc, but just use whatever you have access to, or a comfortable with. As I am going to provide the answers in a particular structure, it would likely be most useful if you did the same, here's the structure I'll use:

* Site wide

  * Anything that is in the <head> section that appears on more than one page (I say this, as there's a clue in there, somewhere)
  * Anything in the `<header>` and/or primary `<nav>` (if it appears on more than one page)
  * Anything in the `<footer>` (if it appears on more than one page)
  * Anything to do with the site structure (if it appears on more than one page)
  * The theme, if a particular colour is used throughout the site and for whatever reason this colour often fails contrast requirements (if it appears on more than one page)
  * Anything that is or should be present on all pages
  * Header
* Pages

  * For each page create a section, that section should be the name of each page and would list all of the issues that are specific to that page. So, if you were to find something between the `<head>` and `<footer>` on a given page, record that there, equally, if you find something outside of the `<header>` and <footer> that is only present on that specific page, also record that there

Please don't get too hung up structuring your findings, if you record something in a different section, that's not wrong, I'm sure many accessibility professionals record things in different ways, using different structures. The structure isn't as important as finding issues. Sometimes I end up with something recurring across several pages that could have been in the sitewide issues, I try to keep them in our format, but sometimes testing can lead you down rabbit holes and we're all human, sometimes we can forget we had encountered an issue on a previous page, especially when the site has lots of issues and pages, etc.

We use a Word document, just because that's our preference. You can write it on paper if you so wish, the only thing you should follow is the structure, just to make comparing a little more logical.

### One final word of warning

Be as alert as you can be, explore as deeply as you can. There are several issues on the test site that are intentionally difficult to find, some are quite deceptive, some will intentionally sail through pretty much any checking tool's scans. Remember, it's the gotchas that getcha, muahahaha.

### I'm ready to go, give me the link

I have added a toggle switch, which will fix the issues, using JS and/or CSS, don't test this, it's not part of the site (it's not inaccessible, anyway), it's there to learn how some things could be resolved. Ideally, you wouldn't use this until you have tested all pages, as some changes are visual changes and may give the game away. When that switch is toggled to the "fixed" position, it will apply across all pages, I have added a modal which will fire on page load, when the switch is toggled to fixed, it simply asks if you want to continue accessing the fixed site, select "no" and the fixes are gone, select "Yes" and everything will be in the fixed state. I felt this was a useful addition, as some folks may wish to check the answers after testing each page or users may simply forget to toggle it back off, I would.

LINK TO MAKING THIS ACCESSIBLE

### I've finished testing, I'm ready to compare

Each accordion below will include the issues in that specific setion, using our format.

## Sitewide issues

<h3 class="accordion">Sitewide answers</h3>
        <div class="accordion__panel">
          <div>

#### There is no secondary navigation present

The only method of navigation is the primary navigation in the site's header, this fails SC 2.4.5 Multiple ways (AA). 

##### How to find

This is something  I would find on "Visual inspection", I would actively look for a secondary navigation as none of the tools I use help me, here. Perhaps paid solutions do, but I'm happy just looking for a secondary naviagtion.

##### Solution

I Added links to all site pages in the footer. Other solutions could be use of a Sitemap, a Search function or links to all pages available in the body of the Home page. I chose the footer approach as it's much easier than creating a whole search function for just a few pages and ordinarily, I'd create a Site Map, too.

#### The focus indicator typically has low contrast

The Focus indicator, which is present sitewide is typically the colour #EE6C4D (orange), against either the #FAFAFA (white), #E0FBFC (light blue) or #98C1D9 (pale blue) backgrounds, which results in a contrast ratio of either 2.92:1 or 2.81:1, and 1.59:1 respectively. The "Minimum" contrast for focus indicators is 3:1, so this fails 1.4.11 Non-text Contrast (AA)

##### How to find

I use a combination of visual inspection, the DevTools and a contrast checker. If focus indicators are very dark on a very light background I know they are fine, but seldom is this the case. I will Inspect Element and then in Chrome in the `:hov` tab within the Styles panel, I will force the element to have `:focus-visible` and `:focus`, I will then use Color Contrast Analyser's eyedropper tool to get the background of the element and or its adjacent colours and also the focus indicator's colour itself. The tool will then give me the calculation. Sometimes, the DevTools will display the contrast calculation against the background.

##### Solution

I changed the focus indicator to a mid blue colour (#3F6098), which easily passes against all light backgrounds. Imagine the orange is a brand colour, we may get a bit of push back, here, as "it's our identity", but, sure, use orange, just don't use it to convey information against light backgrounds, as seldom will it pass against light backgrounds

#### Mobile nav button has AccName mismatch

The Hamburger "mobile" viewport button has an accessible name that does not mach the visible label, this fails 2.5.3 Label in Name (A). The control contains an image as the only label with the text "Menu" and the AccName computes to "Site navigation", which creates a visible label & AccName mismatch. Additionally, if you were thinking along the lines of "This is an image of text", I wouldn't fail it against 1.4.5 Images of Text (AA), as there was an image of the hamburger icon in there, which is "significant other visual content", and ubiquitous enough to be universally understood. Additionally, it was a single four character word, inside a button, with said accompanying icon, in the regular place a user would expect to find that control. Had it just been the text, then I would absolutely fail it, but the icon was sufficient visual information to understand the control. I mean, we could have removed the text entirely and it wouldn't have failed anything at all, because the icon is the label and the AccName could have been "Site navigation", but we're not here to find out how to pass something, because that doesn't help people at all

##### How to find

I use the Accessibility pane, in the DevTools, the Element Inspector (also in the DevTools), read the HTML or use a screen reader to identify mismatches. I have to use visual inspection with each of these, as I need to be able to read what is visually presented and then determine what is actually computed to find a mismatch. An alternative could be Accessibility Insights, in the Ad Hoc tools panel and choose the "Accessible Names" option, which will display the AccName next to all interactive elements. Just remember, you're going to need to shrink the screen down or zoom enough to trigger the "Mobile" breakpoint, to have this displayed.

##### Solution

Because I have full control of the source code, I replaced the image of both the text and the icon with just an image of an icon, I then removed the visually-hidden class from the actual text, and used that actual text as the only computable value for the accessible name. So it is now actual text, visible and an exact match for the AccName, which is of course, a best practice.

#### Current page indicator

The current page indicator in the main navigation (thick underline) has colour of `#EE6C4D` and background is `#E0FBFC`, which results in a contrast ratio of 2.81:1, this should be a minimum of 3:1, this fails 1.4.11 Non-text Contrast 

##### How to find

I would typicall use Color Contrast Analyser to get both the background and foreground colours of the indicator, very similar to how I would get the contrast of the focus indicator, but obviously I wouldn't have to force a state on the element as the indicator would be persistent.

##### Solution

I changed the colour of the current page indicator to 

#### Help button not available at 320px wide viewport

Help button: 1.4.10 Reflow (Help button is not available at 320px screen width), which is a loss of both content and functionality.

##### How to find

This one is visual inspection only, as far as I know. It does require shrinking the screen down or accessing on a smaller device and comparing. If something is present on a larger display, but then missing on the 320px display, I would need to see that difference, as none of my tools help me with that.

##### Solution

I ensured that this "widget" now displays at all viewports, although this success criterion only requires that if it is available at any other viewport size, then it must be available at a viewport size of 320px(W) * 256px(H), which is oddly specific. Another alternative could be Just bin it altogether, which is kind of the nuclear option, but in this instance, one may question what purposes it serves and we could absolutely recommend presenting the contents another way.

#### Instructional text requires sight and colour perception

Within the Useful information" section: There is instructional text that informs a user to "Click the blue button", this fails 1.3.3 Sensory Characteristics, as not all users have vision and not all users that do have vision can perceive colour.

##### How to find

Reading the entire page content or listening with a screen reader is necessary for this one. Anything that provides some form of instruction, that requires vision or hearing to locate or otherwise understand for the operation of the site is what I would be looking out for.

##### Solution

This is a very easy change, it just requires us to rethink about how we provide instructions and avoid using decriptors that are colour, shape, location or indeed any other descriptor that would require a specific sense to identify the element. I changed thehange to "Click help button, below". Does "below" require sight? No, it doesn't and that is because we have a right to left and top to bottom language. In the contexts of the web, the HTML document is structured in such a way that "below" typically just means after and "above" just means before. I wouldn't advocate use of "left" and "right" for adjacent elements, as it's worth shrinking the screen down, at that point, to see if the adjacent element is still adjacent on the horizontal axis, as more often than not, it will be positioned above or below on the vertical axis, to make use of the reduced viewport width. I wouldn't fail an image that said "from left to right" and then listed the names of everyone in the image, as that is a reasonable way to explain an image. If it were controls or other elements, then of course, we need to write that up. I don't have a great deal of experience with internationalisation, if you're working on a multi-national site, that has lots of languages, then using "above" or "below" probably wouldn't be the best call, as some languages read from bottom right to top left, so bear that in mind.

#### Disclaimer text does not resize

The text within the "Disclaimer" section cannot be resized to 200%, which fails 1.4.4 Resize Text. this is due to the usage of vw units in CSS. I made this intentionally difficult to find, in that it nearly doubles in size, but not quite.

##### How to find

I tend to zoom the page in way beyond the required 200% and then look for things that have not scaled correctly with the other content. Should I find something that stops scaling at a certain point, I then inspect the CSS whilst resizing or altering the zoom level, to find the correct style for that breakpoint. I then determine if our item of interest fails, by reviewing the CSS and checking wether the styles prevent scaling lower than 200%. This one applies at any viewport, so if the element does not resize to at least 200% at any given viewport, then that is an failure.

##### Solution

I replaced the `vw` units with `rem` units so now everything will resize correctly

#### Facebook link icon has no contextual AccName

The Facebook link icon, which is in the footer has no useful accessible name, which fails 2.4.4 Link Purpose (In context) (Link does not have programmatically determinable purpose, it contains an icon, but the icon's alt text is "."). I intentionally put the full stop in the alt text's value, as having a link with no AccName would trigger an error with semi-automated tools, but having any old value in there, sadly sails through

##### How to find

ordinarily, Axe or whatever would flag an issue with a link having no AccName, however, as there is a single character in the alt's value (full stop), this actually fools Axe into ignoring the issue. I'd likely pick this up on a screen reader, unless I was looking at the HTML for something else close by and spotted it.

##### Solution

Nice easy one here, simply replace the full stop (or period) with the text "Facebook" and now it will make sense to users that cannot see the icon

#### Facebook and Twitter icons have a small click area

Facebook icon & X/Twitter icon: 2.5.8 Target Size (Minimum) (Target size is 22px, there is no target offset between these sibling elements, the TikTok icon is also 22px, but has a left margin of 2px, which passes) .

##### How to find

There are several ways to find this one. One way I often use is to look at things I "think" are small, I will then Inspect the element and look at the box sizing model, in the CSS pane. Once I have established the size of the element, I'll check for any margins or gaps, etc.

Another way is to use [Adrian Roselli's 24x24 pixel cursor bookmarklet](https://adrianroselli.com/2022/05/24x24-pixel-cursor-bookmarklet.html), which is super nifty. I do use it myself, but sometimes I forget and do it the manual way. I highly recommend reading Adrian's article, which also tells you how to install it, if you are unfamiliar with bookmarklets.

##### Solution

I changed the size of each icon to 1.5rem, which is equivalent to the 24px minimum (which I feel is still a bit small) and I also added a right margin of .125rem (2px) to each link to create an offset (both size and offset are not required, only one is). This is one of those cases where it's enough to pass, but could be a lot better. This is where looking at 2.5.5 Target Size (Enhanced) should be our first port of call, it would require a minimum click/tap area of 44px, this is what we did on this site. ibelieve Apple, Microsoft and Google have developer guidelines for user interface components and they all recommend values that are around about the 44px size, give or take. so in this case, yes, i have made it pass, but no, it's not great and we should do better.

#### Accessibility link in footer becomes obscured

Within the footer, in the "Useful information" and section on a larger screen, the Accessibility link is wholly obscured by the pointless popup widget, so this fails 2.4.11 Focus not Obscured.

##### How to find

There are a few ways to catch this, perhaps the easiest is to simply <kbd>Tab</kbd> through the page, when focus seemingly disappears and my Spidey-senses start to tingle, I will then expolore further. My preferred method is to then Inspect element on the pop up and find its outermost container in the HTML. I will then right click that line of HTML and select "Delete element" from the context menu and then I can visually identify what is underneath. If there is anything interactive underneath, then we fail it against this (if, the item is "wholly" obscured).

##### Solution

I changed the element static, in the CSS, so now it cannot obscure other elements and the accessibility link is fully visible    

#### Accessibility link has no focus indicator

The same Accessibility link that we have just made visible, from the previous issue doesn't have a focus indicator, perhaps that's why they hid it? Ooops, that was me, wasn't it?

##### How to find

Visual inspection is likely the only way to find this, although we could also force the :focus and :focus-visible states on the element and inspect the CSS. We would then find a an outline is set to the :focus-visible pseudo selector and notice that it has an outline, with a four character hex code. That fourth character is the alpha channel and zero means transparent. So, technically it has a focus indicator, but it's just invisible and this requirement requires that indicator to be visible. Visible to who is a whole other debate, as vision differs from person to person.

##### Solution

I actually moved the element into the list of links close by (as that's where it actually should have been, before I started my skullduggery making things horrible) i added a class the same as its sibling links, to ensure styles match and now the focus indicator is applied. Super useful things for keyboard users they are, imagine how much usable a system is when folk can actually be sure where their focus is before pressing a button to activate the control.

#### Chatbot's heading does not describe the topic or purpose

The chatbot isn't a chatbot at all, is it? It's just a bunch of FAQs and we can't ask it anything, so the heading is misleading, isn't it? This fails 2.4.6 Headings and Labels, because it's just wrong. Sure, to many it will be a minor annoyance, but to others it could be hugely frustrating. I have to say, I do not know if this SC had this particular scenario in mind, but let's take a blind screen reader user: They open the popup and discover the heading says there is a chatbot, only they cannot find a chatbot, do they realise that it's just a rubbish heading, or do they think they are being excluded from using it, as it is completely inaccessible? Could they spend lots of time searching for something that isn't actually there?

##### How to find

Open it up, read the heading, determine what the contents are and make a judgement call. I say make a judgement call as there will be instances where the heading may be a little vague or not the best choice of words, that will likely require your discretion as to how misleading that is. In this case, it's not ambiguous, there is no chatbot. Pretty much every clickbait daily rag (newspaper) would fail this SC, as the headline barely ever accurately summarises what actually happened, but gotta keep that ad revenue coming in, I guess.

##### Solution

I changed the text content of the heading to "our FAQs", which is what it is. I would still request this be binned off, though, as FAQs could live on a page of their own, there is no need to add complexity with modals for something like this

#### Character key shortcut present

The "h" key was mapped to advance focus to the so-called halp dialog, as "h" was used without requiring a modifier, too, then this fails SC 2.1.4 Character Key Shortcuts (A), this may have been difficult to find, if you had typed a "h" at any point, you probably would have noticed, otherwise, it could have easily been missed. Ordinarily, if a dev team implements shortcuts, then they will at least somewhere mention them in most instances, I have actually found mention of them in comments of the site's HTML, and nowhere else, I have also discovered failures by accident, by typing into form inputs. The issue with this SC is some to minimise activation of functionality by accidentally pressing or commanding (voice input) "printable" characters into a web page. Without knowingabout that bookmarklet, maybe you missed it because you never used "h" in the form or maybe you got really angry because you did use "h"?

##### How to find

Honestly, this one is hard and I have my doubts that any single method of testing would be robust enough to test comprehensively. I use a bookmarklet for this, which does run a script that simulates every "printable" character. Every single symbol, letter and all of its variations, every number and each of the "spacing" elements are "printable". This makes it difficult to test, comprehensively, as in reality, we'd need to manually enter every single printable key on every single page. Not only that, but what if certain regions of the page have key events tied to them?

The best I have got is [this bookmarklet](http://3needs.org/en/testing/code/kb-shortcuts.html), which I run on each page, but I do have my doubts.

##### Solution

The solution I opted for was to map the "9" key (commonly used for "Help") with the `accesskey` attribute, as that requires defined modifier keys which will depend on operating system and/or browser. Another solution could have just been to do away with the shortcut. What I never did, which I absolutely would in the real world, is tell people that this shortcut exists, otherwise, there's little point in having it, also, that instruction would need to be in visible text, not ARIA, because then it would still exclude the majority of folks.

</div>

</div>

<h3 class="accordion">Home page issues</h3>
        <div class="accordion__panel">
          <div>

#### Image lacks alt attribute or alternative

The circular image on the home page (which is just some rubbish blue graphic with some laptops in the circle, looking kinda techy) lacks an `alt` attribute, so fails  1.1.1 Text Alternatives.

##### How to find

Axe actually finds this one, for us. Using a screen reader would also give us a decent clue and the HTML validator is still useful for this, as the `alt` attribute is required on an image, even if it is a null value. I use the [Web Developer extension in Chrome](https://chromewebstore.google.com/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm), to quickly send a page to the validator as it finds many HTML violations, some of which are accessibility failures.

##### Solution

There is no doubt about it, this image is decorative, it serves on informative purpose, so I have added a null `alt` attribute `alt=""`. We could of course have also used `aria-hidden="true"`, but I like to stick to using `alt` on images. Irrespective of whether an image is decorative or informational, we should make sure it is exposed correctly or not at all, as some screen readers will just read out the filename, and often filenames mean nothing, especially after being ran through various processing steps where an image may end up being called "jggasd763737bdjwjy6u9.png"

#### Heading becomes cropped at 200% zoom

The primary heading escapes the viewport when the viewport is zoomed to 200% and becomes cropped. This fails 1.4.4 Resize Text and occurs when the viewport is between `35em` and `55em`. The text is "cropped" because the CSS `overflow-x` property is set to `hidden`. This particular SC does not care that the text spills out of the viewport, as long as a user can horizontally scroll the viewport. In our case, the horizontal overflow is hidden, so part of the content is lost.

##### How to find

Manual checks are the best way I know of to find this. I set browser zoom to 200% and then slowly decrease the size of the viewport, looking for any text that becomes truncated, cropped, or is otherwise rendered unreadable as it overlays other text elements, etc. Not all browsers let you shrink the window down all of the way, so it is necessary to use the Responsive viewer, to shrink the viewport down further than resizing the window will allow

##### Solution

I reduced the `font-size` at the `35em` to `55em` breakpoint and removed the `overflow-x` property, in the CSS, which is a nice easy win. Just removing the overflow property would have been suffice, but

#### About us link uses colour alone to communicate information

The About us link in the "What we do" section uses colour alone to communivcate something, and that something is that it is a link, so it fails 1.4.1 Use of Color. As there is no underline or any other distinguishing feature, other that a subtle change in hue (`#110054`) from the surrounding body text (`#1A1A1A`), this of course would be difficult to identify by some users, especially those with vision disabilities. The contrast between body text and this link is just 1.04:1

##### How to find

Axe has kindly flagged this one for us, which hopefully you may have spotted. Alternative ways are <kbd>Tab</kbd>ing around, discovering a link that didn't look like a link and then testing the contrast of that text and the surrounding body text, if it is below 3:1, then it fails, assuming there are no other distinguishable features. Obviously an underline would pass this SC, so can things like italic, bold, a different font or indeed other stylistic features. Just a note on bold and italic, I feel this one can resquire a little discretion. If for examply in that passage of text there are multiple instances of bold and/or italic, then the problem moves from "surrounding body text" to close by text that is visually identical. If on a page the only use of bold and/or italic is used to indicate something is a link, then this passes, if those same styles have been used to add emphasis to other words that are not links then this probably fails as how would a user know which are links and which are not? There is a gotcha with this, too, if the colour is identical to surrounding text and there are no other distinguishing features, then it cannot fail this, as colour isn't being used to communicate anything. It's dire, but it is what it is, definitely still push for it.

Finally, don't be tempted to fail a bunch of links in a site nav when they don't have underlines, as these are typically "self-contained", their position, layout and even their names typically makes them easy to understand as a site nav. This can of course apply to other similar widgets such as breadcrumbs and some lists, etc.

##### Solution

I added an underline to the link, as that seems the best way to indicate a link within some text is actually a link? Maybe that will catch on, one day, huh? I also changed the colour, slightly, although this would not be strictly necessary, as Use of color cannot apply if there is something other than colour, and our underline. Whilst I do have artistic license here, I could easily have made the link significantly more perceivable, but I'm trying to pretend I'm working with clients that will push back on Best Practices, the links on this site have a number of visual identifiers, including higher contrast, bold text and a thicker, brighter underline, which will certainly help most users identify them

#### Visual heading "How we Excel" not marked up as a heading

The heading "How we excel"  is not marked up with a heading tag, it uses a paragraph <code><p></code> tag, instead, so this fails 1.3.1 Info and Relationships. Just a point, this SC doesn't require the heading to be the correct level, however, when we write it up for not using a heading tag, we can absolutely tell them what it should be.

##### How to find

Accessibility Insights is useful for this, if you click the extension's icon, a small pop out menu appears, it's the "Ad Hoc Tools" option we'r e interested in, here. Click that and toggle the Headings switch and each heading will have a box drawn around it, with the heading level. The "How we excel" heading has no box and is therefore, not a proper heading. Alternatively, I also right click > Inspect Element and look at the HTML to determine wether it's an actual heading or the Web developer extension has a similar function.

##### Solution

I changed the paragraph element to `<h2>` element, as that would be the correct heading level in this situation.          

#### Visual list not programmatically determinible

The visual list, in the "What tech do we use" section is visually formatted as a list, but is not programmatically a list. This fails 1.3.1 info and Relationships.

##### How to find

Listening to the page with a screen reader or inpecting the HTML. I don't have a tool I use for this, although I'm sure I once had something that did outline lists.

##### Solution

I changed to the `<div>` tags to an outer `<ul>` and each item to a `<li>` element. A screen reader user now navigating by lists would be able to find that, also when a screen reader user is navigating with their virtual cursor, it will be announced as a list and emumerated, so "List, 5 items...".

#### Primary heading contains inadequate contrast

The site name "Problematically" uses two colours for stylistic purposes, the last four characters "a11y" (the numeronym for accessibility is orange `#EE6C4D` and that orange has a contrast of 2.92:1 against the page background `#FAFAFA`. This qualifies as large text, as it is both bold and greater than 18.66px or is larger than 24px, so the contrast only needs to be 3:1 to meet this SC. Just a note, here, when I was making the test site, I considered intentionally making the font not meet the bold and/or size requirements on "mobile", as sometimes we may find a "large" font that passes on a large viewport, against the 3:1 requirement, but then we shrink the viewport and suddenly it fails against the now required 4.5:1, as the font is smaller than required. This is something to bear in mind when testing, if something passes the 3:1 on a "desktop" does it also pass on "mobile"?

##### How to find

The tools I use don't appear to help, here. I don't regularly use WAVE, I have it installed but I barely use it. It often catches contrast issues, but this time, it hasn't, nor have any of the other semi-automated tools. Manual checking with a colour contrast analyser is required to catch this. i discussed this process, earlier.

##### Solution

For this, it's as simple as making the orange colour darker. I went with `#ec5b36`, which gives us a "conforming" contrast of 3.28:1, but remember, contrast values aren't the goal, they're a minimum conforming level and it will help more people if we made it even darker. Just a note, throughout this site I used CSS custom properties (variables), so I'm not actually changing every single thing, I often make a change to the variable's value and it fixes many things

#### List bullets lack adequate contrast

Another contrast issue, here. the little bullets for the list lack a minimum contrast of 3:1. I could imagine a world where somebody argued they don't matter, other factors make it clearly a list. Sure, indentation, spacing, short sentences without full stops and on new lines are a good indicator, but HTML's default bullets were accessible to start with, they exist for a reason, both in printed media and digital media, so, if they are in some way visible, then they need to have adequte contrast, which is 3:1. This of course does not apply for lists that have the bullets removed completely, such as nav menus, etc, as this SC can only apply if the contrast is too low, not if something isn't there.

##### How to find

Manual checking, again, using a contrast analyser will give ius the answer we need.

##### Solution

As with all these other contrast issues, we simply increase the contrast to something more perceivable, I used the same colour `#ec5b36` as I did previously for the "A11y" part of the Problematically page title, as this was a variable I had used.

</div>

</div>

<h3 class="accordion">Services page answers</h3>
        <div class="accordion__panel">
          <div>



#### The page language is not set to English

The content of the page is English, yet the value of the `lang` attribute is set to `es` (Spanish), so does not accurately inform assistive tech of the correct language. This can cause some screen readers to use the wrong accents or language packs, etc. this fails SC 3.1.1 Language of Page (A). This is not something I recall ever encountering, I have found instances where some pages omit the lang attrivute, altogether, but given we all make typos, it is possible to find a stray page with a typo in the value.

##### Solution

A nice easy fix, here. We just change the value of the lang attribute to en, which is of course, English. 

#### Help modal not consistenly identified

The modal's trigger is called "help" on other pages, however, here it is called "just holla at us" and is therefore not consistently identifable, despite serving the exact same purpose. this fails SC 3.2.4 Consistent identification (AA). Consistency is key to help users build an understanding of how to operate sites, what to expect when they interact with controls and also to help them locate information or functionality, easily. Mixing names for controls that do the exact same thing could cause confusion and increase the cognitive load for users.

##### How to find

Visual identification. Honestly, don't worry about this too much, it's not like you need to rememeber every element on every page to find this. Sometimes I do quick click thoughs, focussing on a section of the page (header, as an example) and quickly flick through all of the pages to determine wether anything is off and then repeat for other repeated sections. I don't have the best memory, so I just scan chunks that work for me, yours may be smaller or larger, whatvever works best for you.

#### Solution

Simply change the text label to match what it is on other pages. This is where it can be useful to revist our earlier notes, as we don't want to say "Change the accessible name to 'help' so it matches other pages", as earlier, we recommended that is be changed to "Our FAQs", so naturally, we want to recommend this is also changed to "Our FAQs".

#### The voucher code is an image of text

There is no reason this image cannot be text, it's a regular font and something that a user would potentially want to copy to their clipboard. This fails SC 1.4.5 Images of text (AA).

Manaual checking by Inspect Element and when the HTML opens up and we determine it's an image, we make a call on wether it needs to be an image. Obviously it doesn't, as the font is just a regular font off my system. The Web Developer extension does have a suite of useful tools, in this case, in the Images tab, you could outline or remove all images on a page, etc. I seldom do that, i mostly read the code or pick it up with a screen reader, although, don't rely on a screen reader as that will only help if the item has a role that indicates it's an image, it could be a CSS image or some other skullduggery.

##### Solution

I just changed this to a regular text node, I used a `<span>`, but it could be any other node that holds text.

#### Voucher code has low contrast

Another instance of low contrast, here. The voucher code has a contrast of 2.92:1 and as with most of the contrast issues, here, I'm solving it by simply changing a variable. This SC does also apply to images of text, there is of course nuance, in that it obviously doesn't apply to images of text that are photos of text the developers, etc, have no control over, but in this instance, it applies, because somebody made this image for this site.

##### How to find

Again, I use Color Contrast Analyser for this.

##### Solution

This text is "large" text and when I changed the variable, I ended up with 3.28:1, which passes, but remember, that's not the goal, the goal is to make it usable for as many folk as possible, so having more contrast will be better.

#### Note

Some of you may have been tempted to fail the incredibly small text, in the disclaimer section, you'd be right in saying it's inaccessible to many, but it doesn't actually fail anything. This is where we tend to use a Weakness or Advisory to communicate to the devs and designers that this is problematic and some users will struggle to read it, whilst others may not be able to make it out at all.

</div>

</div>

<h3 class="accordion">About page answers</h3>
  <div class="accordion__panel">
    <div>



#### Incorrect alt text for Brad and Chad

The alt text is mixed up for both Brad and Chad, or the images are. We don't really have any way of knowing for sure which one is actually Brad and which is Chad. What we do know is that in the container about Brad, the image has an alt attribute with a value of "Chad", so something is wrong, Either the image is wrong or the alt is, in which case it fails 1.1.1 Non-text Content (A) or could it be that the image and alt are actually correct but the whole thing is just in the wrong container? If that were the case, it wouldn't "technically" fail 1.1.1, as the image and alt would be correct, so what would it fail? I'd fail it on 1.1.1 regardless, but I would say I do not know who is who, so to me as an auditor, the alt and/or the image is wrong. If both are wrong, then 1.3.2 Meaningful Sequence (A) would apply, as visually, we have a distinct container for each "bro", their names are in the containers and a bit about them, so if we have an image of Chad (with correct alt) in Brad's container, then sequentially, it doesn't belong there. I honestly wouldn't go to that effort of justifying why it would fail 1.3.2, as in all probability, the image would be correct, but the alt would be wrong, so 1.1.1 would almost certainly be the correct call.

#### How to find

As these have alt text, visual inspection of the code or listening with a screen reader would be my usual options. You could display all alt text with the Web Developer extension. Each of these only work because there is alt, if there was a decorative image of Brad and one of Chad, only mixed up, how would we know, unless we had previously seen them?

##### Solution

It was just incorrect alt, so I swapped the alt values around. How do I know? Well, I had to email Brad for clarification, sometimes it's easier to ask than to go down rabbit holes.

#### The heading in each container has inadequate contrast

We have again encountered the orange that fails colour contrast every time we encounter it. Each "bros" name appears in that orange colour and is text of a "large" size, so must have a minimum contrast of 3:1.

##### How to find

Another instance of Color Contrast Analyser or similar for this

##### Solution

A darker colour is required, I just increased my variable's value to get "compliant" contrast.

#### The dialog does not trap focus

It's the same dialog that has been used on other pages, I know and I also know that it would be pretty rare for it to be a non-modal dialog on one page and modal on most or all of the others. Eventually your state of surprise is replaced by internal screams and audible sighs, as in reality, this would not even feature in the top billion oddest accessibility issues. As focus isn't trapped here, this fails SC 2.4.3 Focus Order (A), as a user can tab out of the dialog and their focus becomes lost under the the blurred dialog backdrop.

##### How to find

Manual testing by pressing <kbd>Tab</kbd> to advance focus through the entirety of each page. I tend to do this with keyboard alone, first and then do it with a screen reader, close to the end, and I do so on every page I test.

##### Solution

In layman's terms the solution is to simply trap focus within and make this dialog modal. As I was the one responsible for this monstrosity, I simply used the inbuilt JS method `showModal()`, which automatically makes the HTML `<dialog>` element a modal.

#### Closing dialog doesn't return focus to invoking element

Another issue with that pesky dialog. This time closing it with a keyboard does not send focus back to the button that opened it, which is a failure of SC 2.4.3 Focus Order (A). Again, this is something that impacts keyboard and screen reader users, as in a typical site with many links, it may take a lot of effort to get back to where they wanted their focus to be, now they would have to <kbd>Tab</kbd> all the way back to where they wanted to pick up from where they left off.

##### How to find

Manual testing by pressing closing disclosure widgets with a keyboard and then determinig where focus moves to. It's not always clear where focus has gone to, as if it is placed on the body element, it's unlikely a focus indicator would be present. A nifty little method is setting a Watch Target in Chrome's DevTools. To do this, open up the DevTools, click the Console tab and there is an eye icon, it's accessible name is "Create live expression". An input then appears in the panel and has the AccName "Expression", simply type or paste the following code snippet into that input `document.activeElement`. Now, each time you have the console open and you Tab around a page, that value will tell you which element has focus, which I find useful for those times it's not obvious where it is.

##### Solution

Solving this depends on how the dialog was implemented, if it is the HTML `<dialog>` element, then what has happened is somebody has intentionally or accidentally broken the default behaviour, as that stuff comes for free. If it was a hand rolled dialog, then they have forgot to send focus back to the trigger button. Ours is a native `<dialog>` and I broke that behaviour on purpose, so I just removed the JS that butchered it and focus now handles as expected.

#### Dialog close button lacks AccName

There are two close buttons on the dialog, one at the top and the other at the bottom, the top one lacks an accessible name, on this page, meh. This of course fails SC 4.1.2 Name, Role, Value (A) as all user interface components must have an accessible name, as it tends to provide a nice clue to screen reader users about what the thing does. It also benefits voice input users, in that those users can instruct their software to "Click, \[name of button]", as opposed to forcing them to faff around with grids and numbers, etc. This is less of an issue for voice users, here, as there are two buttons that serve the same purpose, which would both have the same AccName. A screen reader user may well be confused about what that button could do and if they were to chance it, it would close, and that could well be not what they wanted. 

##### How to find

I have previously discussed the tools I use that are available in the console or indeed using a screen reader. Those are great ways of catching these things. In this instance, Axe can help us out, the reason I want to discuss this is because this element is in a dialog. When the dialog is hidden, it is properly hidden, it is not exposed to the accessibility tree, at all. So, the way Axe and others works is they take a snapshot of the page in its current state only. If any widgets are currently not exposed, then Axe does not snoop inside their code. I did mention this in my intro, but as this is the first time I can demonstrate it, I thought we'd go over that, again. So, for comparison's sake, scan the page with the dialog closed, then open the dialog and scan the page again. On this occasion, we have an issue that was not present before we opened the dialog. this same logic really does apply to any changes on the page. Axe, etc will find issues with things that are only visually hidden, but not programmatically hidden. As an example, if we just nudged our  dialog off the screen, shrank it down and called it good, the tools would find any issues within, as `hidden` (HTML attribute), `visibility: visible;` `aria-hidden="true"` or `display: none;` were not used.

##### Solution

As this is an icon button (no text), we simply add the text "Close" to a `visually-hidden` node, I'd actually left that node in, but empty and I did so on purpose.

#### Dialog close button activates on down event

This one can be hard to find and as far as I know can only be found by manual methods, no tool I know of will find this. So when we click the bottom Close button, as soon as the `mousedown` event fires, the dialog closes and that should only happen on the `mouseup` event. This fails SC 2.5.2 Pointer Cancellation (A). Why does this matter? Well users that have motility issues could click it by accident and giving them an escape hatch of pulling the cursor away from the control allows them to cancel the activation of that control. Users with cognitive disabilities may suddenly remember they need to do one more thing before pressing the button, moving the cursor away from the control before releasing the mouse button would ordinarily allow them to do that.

##### How to find

This one would be exceptionally difficult or cumbersome to test without using a pointing device and having the ability to click and then move the pointer away from the underlying target interactive element that said, it's not impossible. What I do, is find `clicky things`, I then click them in my normal way, but keep the mouse button depressed and move away before releasing the mouse button. If this works, then there is no issue, as clicking the target control by using only the down event didn't actiavate the control. If the event fired before you had chance to start moving the cursor away, then it was the down event that fired it - not good.

To test this without the ability of using a pointing device, Firefox is pretty handy. If you can locate all interactive controls in Firefox's DevTools, then you will be able to locate the element's "Event" badge, in the HTML, this will tell you which events are tied to that control. if there is a `mousedown` event, then it's a failure, `mouseup` and `click` would be fine. There is obviously more nuance, as there are many events in JS and some others would be OK, whereas others would not It is keyboard operable, I used <kbd>Cmd</kbd>, <kbd>Opt</kbd> and <kbd>C</kbd> to open the DevTools, I then had to traverse the whole page to find that element using arrow keys, once I did, I could <kbd>Tab</kbd> to the "Event" button. I can use a keyboard, to an extent, but I'm by no means a power user, I do not know every single shortcut, hopefully there is a way to look at the code that opens it up on the exact element you were looking at? I couldn't find a way, but I did not Google too deeply. If you are using Windows the the shortcut is <kbd>Ctrl</kbd>, <kbd>Shift</kbd> and <kbd>C</kbd>, but again, hopefully there's an easier way.

##### Solution

This is another instance of me breaking something by using less "conventional" code. For a button when we target it with JS, it's much more practical to use the `click` event, as this handles mouse clicks on the up event and also the correct keyboard presses, typically <kbd>Enter</kbd> and <kbd>Space</kbd> for `<button>` elements. I used `mousedown` on the broken page, when elsewhere I used the `click` event. To fix it, I simply used the `click` event across all pages

</div>
        </div>

<h3 class="accordion">Contact page answers</h3>
        <div class="accordion__panel">
          <div>



#### Skip link does not bypass repeated content

Did you notice the Skip Link is not functioning as it is supposed to, here? It advances focus to the first link in the navigation, which is of course naff. So, in this instance, a user has to press two keys to get to the first link, whereas if the Skip link weren't present, it would only take one keypress, so this Skip Link actually creates more effort for our users. That's kind of moot, anyway, as the repeated block of links cannot be skipped, so this fails 2.4.1 Bypass Blocks (A).

##### How to find

Test the Skip Link does what it is supposed to do, on each page. Sometimes the Skip Link's functionality remains unchanged, but on a different page the authors may have used a different `id` on the target element or it may not exist on that specific page. So, just to be sure, click the Skip Link on each page that has repeated content that should be skippable and if something is broken and the Skip Link seemingly does not function as intended, then to investigate the issue, check the Skip Link's `href` value and then find a corresponding element id. If that corresponding id does not exist or it appears before the block of repeated content, then you can explain why it fails on this page.

##### Solution

Like on the other pages we have looked at, the solution is simply direct the Skip Link's `href` to be the value of the main container's id, which of course will bypass all of the stuff in the header and actually save our users from having to tab through repeated elements.

#### Fields lack autocomplete values

None of the fields that collect personal information have an autocomplete attribute with a vaiid value



\    </div>
        </div>



* The colour of the focus indicator fails contrast requirements on all pages. This colour was selected as it is close to the 3:1 minimum, but close is not a pass and the threshold requires a contrast of at least 3:1 in order to pass 1.4.11 Non-text Contrast (AA). I would find this by using a combination of visual inspection and a tool to validate my suspicions, such as Color Contrast Analyzer. I would test the colour against every background it featured on
* Mobile button: 2.5.3 Label in Name (contains image with text “Menu”, accessible name calculates to “Site navigation"

  * o   Changed text to “Menu” to match AccName (You would have a strong argument to get the developer to change the image of text to actual text, under 1.4.5 Images of Text, as it does not need to be an image
  * Current page indicator: 1.4.11 Non-text Contrast (Indicator has colour of #EE6C4D and background is #E0FBFC, which results in a contrast ratio of 2.81:1, should be 3:1min)

    o   Changed to blue
  * Help button: 1.4.10 Reflow (Help
    button is not available at 320px screen width)

    o   Popup thing shows at all
    viewports
  * \    </div>
          </div>
