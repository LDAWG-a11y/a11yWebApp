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

A custom-built small website that contains just enough accessibility issues to start folks off with identifying issues seemed the safest bet. This site won't change, there will be absolutely no changes to the code, whatsoever. This enables us and potentially you, to have an unchanging platform to conduct this training on, in the hope of getting consistent results.

There is of course a lot of nuance to accessibility testing, in that it is highly unlikely that two auditors given the same platform, will write up exactly the same issues. This is, in part due to interpretation of various success criteria, two people will interpret some of the more ambiguous aspects differently. It is also in part due to their levels of knowledge, the tools they use, their experience and multiple other factors.

One important distinction that can result in two different people having a slightly different results, is where they align themselves on "WCAG purity":

* The folks at the lower end of that scale may just fail everything they believe or know to be an accessibility barrier, irrespective of whether it actually fails a WCAG success criterion (SC)
* The folks in the middle of that scale will likely know something is not explicitly a failure due to loopholes or wording and still write the issue up. But they will explain that they are aware the wording of the success criterion "technically" allows this, but the "intent" of the success criterion combined with the obvious accessibility issue does not make this a non-issue and it should be addressed with a suitable level of priority. There is of course some overlap here, in that sometimes it may appear that something fails due to ambiguous wording and these folks may believe it to be a failure and write it up as such.
* The purists, these are folks that typically understand every bit of nuance, every pitfall and every loophole in the WCAG docs. Their reports will typically follow WCAG to the letter, they will likely write up other defects in advisories or similar

When I first started testing websites, I was definitely at the low end of that scale, I was one of those "Which SC can I fail this against" folks. I believe my intent was pure, I wasn't failing things because the website would be better for me, I was failing them to make the website usable to people with disabilities, or so I believed. But, credibility is a thing, as I learned from highly-experienced others in the field, by reading their comments discussions or posts on various platforms. I began to understand this wasn't actually helping as much as I thought it was. The main concern here was, if I just failed something against a SC criterion just because it seemed the closest fit and I was called out on it, by a vendor, the rest of my report and myself could lose all credibility. [](https://www.youtube.com/watch?v=rBCR66aJZZc)

Nowadays, I find myself in the middle of that scale, I'm by no means as smart as the folk who contribute to WCAG at W3C, but I do often read their lengthy discussions on GitHub, to improve my own knowledge. We do have "Weaknesses" in our reports, where we put non-WCAG issues. I explain my rationale, the effects on a user and/or their AT and I state that whilst it does not "technically" fail WCAG, it is still an accessibility issue. WCAG is not the be all and end all of accessibility, it's a minimum standard for "compliance" in many territories, not some magical standard that that could meet every disabled person's needs. Here, though, we will just be using WCAG, as other stuff would perhaps be at more risk of being subjective.

Anyway, less about me. So the purpose of this platform is not so much to determine who interprets what in which way, it's main objective is to simply to provide a decent chunk of accessibility issues, on an unchanging platform to assist with learning or training.

## A word of warning

Unfortunately, as the purpose of the test site is to be inaccessible, it will not play nicely with all assistive technologies, there are barriers that will be difficult or impossible to overcome with some assistive technologies. We have not included any strobe-effect animations, as we know the effect of these could in some cases be fatal or otherwise physically harmful. By design, the experience will not be great for some assistive technology users, in some parts. That is not to say that you cannot play along or just read along, but it is only fair that we provide this warning.

There are of course some issues on this site that require vision or hearing, there may be sounds or contrast issues and I know that some users will not be able to catch those

## So, let's dive in

Firstly, this isn't a test, as such. Please don't submit your report to us, we won't be marking or providing feedback on anything, as we do not have the time. If you find one of our interpretations are wrong, we will of course fix that and provide that information on the guide.

Secondly, there are only two rules, the first being "Thou shalt follow this guide in order" and the second being "There are no other rules". You are free to test with whatever tools, assistive technologies and manual methods you see fit. If you find one tool that finds every single issue, awesome, use that and please do share it with us. I jest, you won't find a single tool to get you through this, that's just wishful thinking.

### Do I need to find all of the issues?

Nope. This isn't a competition, don't put yourself under pressure, find what you can and then when you cannot find anything else, compare your findings, with ours. This is more applicable if you are just starting out, we all have to start somewhere, we mostly all get stuff wrong and sometimes, we can go down a rabbit hole learning about something we haven't previously encountered.

### What do I need?

There's quite a bit of flexibility here:

* Firstly, and most importantly, a desktop or laptop, I wouldn't advise using just phone or tablet for this, although you can of course use them in addition to an actual computer 
* A keyboard or an alternative input device that uses the keyboard API (Voice input software, switches  etc)
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

* Axe DevTools
* Chrome DevTools (this is accessed by either pressing F12 on a webpage or right-clicking and selecting "Inspect"), the process is the same for other browsers, however, they may have an slightly different wording in the context menus. I provided install guides in the previously linked guides, if you are unsure.
* [Colour Contrast Analyser,](https://www.tpgi.com/color-contrast-checker/) this is an installable tool, if you cannot install software on your work machine (like me), then you can use either a colour contrast checker extension, from your chosen browser's extensions store or better still, the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), which is web-based

I will identify which tools or methods I used to find the issue

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

<div class="callout__tip"><span class="callout__icon"><strong class="visually-hidden">Tip: </strong></span><span class="callout__text">For some reason it is necessary to enable "Tab key navigation" on a Mac, so if you haven't already done this, then click the Apple icon > System settings > Keyboard and then toggle "Keyboard navigation" switch, to the On position. If that doesn't work, your browser may have a control switched Off</span></div>

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
  * Anything in the `<header>` and/or primary `<nav>` (if it appears on more thanone page)
  * Anything in the `<footer>` (if it appears on more than one page)
  * Anything to do with the site structure (if it appears on more than one page)
  * The theme, if a particular colour is used throughout the site and for whatever reason this colour often fails contrast requirements (if it appears on more than one page)
  * Anything that is or should be present on all pages
  * Header
* Pages

  * For each page create a section, that section should be the name of each page and would list all of the issues that are specific to that page. So, if you were to find something between the <head> and <footer> on a given page, record that there, equally, if you find something outside of the <header> and <footer> that is only present on that specific page, also record that there

Please don't get too hung up structuring your findings, if you record something in a different section, that's not necessarily wrong, I'm sure many accessibility professionals record things in different ways, using different structures. The structure isn't as important as finding issues. Sometimes I end up with something recurring across several pages that could have been in the sitewide issues, I try to keep them in our format, but sometimes testing can lead you down rabbit holes and we're all human, sometimes we can forget we had encountered an issue on a previous page, especially when the site has lots of issues and pages, etc.

We use a word document, just because that's our preference. You can write it on paper if you so wish, the only thing you should follow is the structure, just to make comparing a little more logical.

I will include a report that I have written for testing the site, just for you to compare

### One final word of warning

Be as alert as you can be, explore as deeply as you can. There are several issues on the test site that are intentionally difficult to find, some are quite deceptive, some will intentionally sail through pretty much any checking tool's scans. Remember, it's the gotchas that getcha, muahahaha.

### I'm ready to go, give me the link

I have added a toggle switch, which will fix the issues, using JS and/or CSS, don't test this, it's not part of the site, it's there to learn how some things could be resolved. Ideally, you wouldn't use this until you have tested all pages, as some changes are visual changes and may give the game away. When that switch is toggled to the "fixed" position, it will apply across all pages, I have added a modal which will fire on page load, when the switch is toggled to fixed, it simply asks if you want to continue accessing the fixed site, select "no" and the fixes are gone, select "Yes" and everything will be in the fixed state. I felt this was a useful addition, as some folks may wish to check the answers after testing each page or users may simply forget to toggle it back off, I would.

LINK TO MAKING THIS ACCESSIBLE

### I've finished testing, I'm ready to compare

Each accordion below will include the issues in that specific setion, using our format.

## Sitewide issues

<h3 class="accordion">Sitewide answers</h3>
        <div class="accordion__panel">
          <div>

#### There is no secondary navigation present

The only method of navigation is the primary navigation in the site's header, this fails SC 2.4.5 Multiple ways (AA). This is something  I would find on "Visual inspection", I would actively look for a secondary navigation as none of the tools I use help me, here. Perhaps paid solutions do, but I'm happy just looking for a secondary naviagtion

##### Solution

I Added links to all site pages in the footer. Other solutions could be use of a Sitemap, a Search function or links to all pages available in the body of the Home page. I chose the footer approach as it's much easier than creating a whole search function for just a few pages and ordinarily, I'd create a Site Map, too.

#### The focus indicator typically has low contrast

The Focus indicator, which is present sitewide is typically the colour #EE6C4D (orange), against either the #FAFAFA (white), #E0FBFC (light blue) or #98C1D9 (pale blue) backgrounds, which results in a contrast ratio of either 2.92:1 or 2.81:1, and 1.59:1 respectively. The "Minimum" contrast for focus indicators is 3:1, so this fails 1.4.11 Non-text Contrast (AA)

##### Solution

I changed the focus indicator to a mid blue colour (#3F6098), which easily passes against all light backgrounds. Imagine the orange is a brand colour, we may get a bit of push back, here, as "it's our identity", but, sure, use orange, just don't use it to convey information against light backgrounds, as seldom will it pass against light backgrounds

#### Mobile nav button has AccName mismatch

The Hamburger "mobile" viewport button has an accessible name that does not mach the visible label, this fails 2.5.3 Label in Name (A). The control contains an image as the only label with the text "Menu" and the AccName computes to "Site navigation", which creates a visible label & AccName mismatch. Additionally, if you were thinking along the lines of "This is an image of text", I wouldn't fail it against 1.4.5 Images of Text (AA), as there was an image of the hamburger icon in there, which is "significant other visual content", and ubiquitous enough to be universally understood. Additionally, it was a single four character word, inside a button, with said accompanying icon, in the regular place a user would expect to find that control. Had it just been the text, then I would absolutely fail it, but the icon was sufficient visual information to understand the control. I mean, we could have removed the text entirely and it wouldn't have failed anything at all, because the icon is the label and the AccName could have been "Site navigation", but we're not here to find out how to pass something, because that doesn't help people at all

##### Solution

Because I have full control of the source code, I replaced the image of both the text and the icon with just an image of an icon, I then removed the visually-hidden class from the actual text, and used that actual text as the only computable value for the accessible name. So it is now actual text, visible and an exact match for the AccName, which is of course, a best practice.

#### Current page indicator

The current page indicator in the main navigation (thick underline) has colour of `#EE6C4D` and background is `#E0FBFC`, which results in a contrast ratio of 2.81:1, this should be a minimum of 3:1, this fails 1.4.11 Non-text Contrast 

##### Solution

I changed the colour of the current page indicator to 

#### Help button not available at 320px wide viewport

Help button: 1.4.10 Reflow (Help button is not available at 320px screen width), which is a loss of both content and functionality.

##### Solution

I ensured that this "widget" now displays at all viewports, although this success criterion only requires that if it is available at any other viewport size, then it must be available at a viewport size of 320px(W) * 256px(H), which is oddly specific. Another alternative could be Just bin it altogether, which is kind of the nuclear option, but in this instance, one may question what purposes it serves and we could absolutely recommend presenting the contents another way.

#### Instructional text requires sight and colour perception

Within the Useful information" section: There is instructional text that informs a user to "Click the blue button", this fails 1.3.3 Sensory Characteristics, as not all users have vision and not all users that do have vision can perceive colour.

##### Solution

This is a very easy change, it just requires us to rethink about how we provide instructions and avoid using decriptors that are colour, shape, location or indeed any other descriptor that would require a specific sense to identify the element.

I changed thehange to "Click help button, below"

#### Disclaimer text does not resize

The text withing the "Disclaimer" section cannot be resized to 200%, which fails 1.4.4 Resize Text. this is due to the usage of vw unitts in CSS. I made this intentionally difficult to find, in that it nearly doubles in size, but not quite. 

##### Solution

I replaced the `vw` units with `rem` units so now everything will resize correctly



#### Facebook link icon has no contextual AccName

The Facebook link icon: 2.4.4 Link Purpose (In context) (Link does not have programmatically determinable purpose, it contains an icon, but the icon's alt text is ".")















The "H" key was mapped to advance focus to the so-called halp dialog, as "H" was used without requiring a modifier, too, then this fails SC 2.1.4 Character Key Shortcuts (A), this may have been difficult to find, if you had typed a "H" at any point, you probably would have noticed, otherwise, it could have easily been missed. Ordinarily, if a dev team implements shortcuts, then they will at least somewhere mention them in most instances, I have actually found mention of them in comments of the site's HTML, and nowhere else, i have also discovered failures by accident, by typing into form inputs. The issue with this SC is screen readers map use of printable character keys for shortcuts, in this case, "H" would navigate to the next heading

* The solution I opted for was to map the "9" key (commonly used for "Help") with the accesskey attribute, as that requires modifier keys which will depend on operating system and/or browser. Another solution could have just been to do away with the shortcut. What I never did, which I absolutely would in the real world, is tell people that this shortcut exists, otherwise, there's little point in having it, also, that instruction would need to be in visible text, not ARIA, because then it would still exclude the majority of folks
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
